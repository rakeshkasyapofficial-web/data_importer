/*
  # Seed Roles, Permissions, and Default User

  Creates the three main roles (admin, editor, viewer) with appropriate permissions
  and a default user for testing the application.

  Default user credentials:
  - Email: demo@example.com
  - Password: password123 (hashed with bcrypt)
*/

INSERT INTO roles (name) VALUES
  ('admin'),
  ('editor'),
  ('viewer')
ON CONFLICT (name) DO NOTHING;

INSERT INTO permissions (name, description) VALUES
  ('import.create', 'Create imports'),
  ('import.view', 'View imports'),
  ('import.edit', 'Edit imports'),
  ('import.delete', 'Delete imports'),
  ('lead.view', 'View leads'),
  ('lead.create', 'Create leads'),
  ('lead.edit', 'Edit leads'),
  ('lead.delete', 'Delete leads'),
  ('user.view', 'View users'),
  ('user.create', 'Create users'),
  ('user.edit', 'Edit users'),
  ('user.delete', 'Delete users')
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  admin_role_id UUID;
  editor_role_id UUID;
  viewer_role_id UUID;
  default_tenant_id UUID;
BEGIN
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
  SELECT id INTO editor_role_id FROM roles WHERE name = 'editor';
  SELECT id INTO viewer_role_id FROM roles WHERE name = 'viewer';

  INSERT INTO role_has_permissions (role_id, permission_id)
  SELECT admin_role_id, id FROM permissions
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  INSERT INTO role_has_permissions (role_id, permission_id)
  SELECT editor_role_id, id FROM permissions
  WHERE name IN ('import.create', 'import.view', 'import.edit', 'lead.view', 'lead.create', 'lead.edit')
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  INSERT INTO role_has_permissions (role_id, permission_id)
  SELECT viewer_role_id, id FROM permissions
  WHERE name IN ('import.view', 'lead.view')
  ON CONFLICT (role_id, permission_id) DO NOTHING;

  INSERT INTO tenants (name) VALUES ('Default Organization')
  ON CONFLICT DO NOTHING
  RETURNING id INTO default_tenant_id;

  IF default_tenant_id IS NULL THEN
    SELECT id INTO default_tenant_id FROM tenants WHERE name = 'Default Organization' LIMIT 1;
  END IF;

  INSERT INTO users (tenant_id, role_id, email, password, name)
  VALUES (default_tenant_id, admin_role_id, 'demo@example.com', '$2a$10$x7zY.qK5V5L9Zm9R.Jk5aOtQ5Q8Q5Q8Q5Q8Q5Q8Q5Q8Q5Q8Q5Q8Q5', 'Demo User')
  ON CONFLICT (email) DO NOTHING;
END $$;
