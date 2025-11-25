import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import { LogOut, FileUp, Users, BarChart3, AlertCircle } from 'lucide-react';

interface Import {
  id: string;
  fileName: string;
  status: string;
  totalRecords: number;
  validRecords: number;
  createdAt: string;
}

interface Lead {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

interface DashboardStats {
  totalImports: number;
  totalLeads: number;
  totalUsers: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalImports: 0,
    totalLeads: 0,
    totalUsers: 0,
  });
  const [imports, setImports] = useState<Import[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadDashboard = async () => {
      try {
        const [importsData, leadsData, usersData] = await Promise.all([
          apiClient.getImports(token),
          apiClient.getLeads(token),
          apiClient.getUsers(token),
        ]);

        setImports(importsData.slice(0, 5));
        setLeads(leadsData.leads || []);
        setStats({
          totalImports: importsData.length,
          totalLeads: leadsData.pagination?.total || 0,
          totalUsers: usersData.length,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Imports</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalImports}</p>
              </div>
              <FileUp className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Team Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white">Recent Imports</h2>
            </div>
            <div className="divide-y">
              {imports.length > 0 ? (
                imports.map((imp) => (
                  <div key={imp.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{imp.fileName}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>Records: {imp.totalRecords}</span>
                          <span>Valid: {imp.validRecords}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          imp.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : imp.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {imp.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No imports yet</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white">Recent Leads</h2>
            </div>
            <div className="divide-y">
              {leads.length > 0 ? (
                leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="p-4 hover:bg-gray-50 transition">
                    <p className="font-semibold text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </p>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                      {lead.email && <span>📧 {lead.email}</span>}
                      {lead.phone && <span>📱 {lead.phone}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No leads yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-gray-900 font-medium mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Role</p>
              <p className="text-gray-900 font-medium mt-1 capitalize">{user?.role}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Tenant ID</p>
              <p className="text-gray-900 font-medium mt-1 font-mono text-xs">{user?.tenantId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">User ID</p>
              <p className="text-gray-900 font-medium mt-1 font-mono text-xs">{user?.id}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
