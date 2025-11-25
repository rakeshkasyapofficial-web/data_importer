import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  try {
    const adminRole = await prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
      },
    });

    const editorRole = await prisma.role.upsert({
      where: { name: 'editor' },
      update: {},
      create: {
        name: 'editor',
      },
    });

    const viewerRole = await prisma.role.upsert({
      where: { name: 'viewer' },
      update: {},
      create: {
        name: 'viewer',
      },
    });

    const permissions = [
      { name: 'import.create', description: 'Create imports' },
      { name: 'import.view', description: 'View imports' },
      { name: 'import.edit', description: 'Edit imports' },
      { name: 'import.delete', description: 'Delete imports' },
      { name: 'lead.view', description: 'View leads' },
      { name: 'lead.create', description: 'Create leads' },
      { name: 'lead.edit', description: 'Edit leads' },
      { name: 'lead.delete', description: 'Delete leads' },
      { name: 'user.view', description: 'View users' },
      { name: 'user.create', description: 'Create users' },
      { name: 'user.edit', description: 'Edit users' },
      { name: 'user.delete', description: 'Delete users' },
    ];

    for (const perm of permissions) {
      await prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      });
    }

    const adminPermissions = await prisma.permission.findMany();

    for (const perm of adminPermissions) {
      await prisma.roleHasPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      });
    }

    const editorPerms = await prisma.permission.findMany({
      where: {
        name: {
          in: [
            'import.create',
            'import.view',
            'import.edit',
            'lead.view',
            'lead.create',
            'lead.edit',
          ],
        },
      },
    });

    for (const perm of editorPerms) {
      await prisma.roleHasPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: editorRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: editorRole.id,
          permissionId: perm.id,
        },
      });
    }

    const viewerPerms = await prisma.permission.findMany({
      where: {
        name: {
          in: ['import.view', 'lead.view'],
        },
      },
    });

    for (const perm of viewerPerms) {
      await prisma.roleHasPermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: viewerRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: viewerRole.id,
          permissionId: perm.id,
        },
      });
    }

    const tenant = await prisma.tenant.upsert({
      where: { id: 'default-tenant' },
      update: {},
      create: {
        id: 'default-tenant',
        name: 'Default Organization',
      },
    });

    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        password: hashedPassword,
        name: 'Demo User',
        tenantId: tenant.id,
        roleId: adminRole.id,
      },
    });

    console.log('Seed completed successfully');
    console.log(`Created/Updated user: ${user.email}`);
    console.log('Login credentials:');
    console.log('  Email: demo@example.com');
    console.log('  Password: password123');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
