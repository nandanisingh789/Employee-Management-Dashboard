import React from "react";
import { Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
        {sub && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}>{icon}</div>
    </div>
  </div>
);

export default function DashboardHome() {
  const { employees, loading } = useEmployees();
  const { user } = useAuth();

  const departments = [...new Set(employees.map((e) => e.department))].length;
  const localCount  = employees.filter((e) => e.isLocal).length;
  const recent      = employees.slice(0, 6);
  const fullName    = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="flex items-center gap-4">
          <Avatar name={fullName} src={null} size="xl" className="ring-white/50" />
          <div>
            <h2 className="text-2xl font-extrabold">Good day, {user?.firstName}! 👋</h2>
            <p className="text-brand-100 mt-1 text-sm">{user?.email}</p>
          </div>
        </div>
        <Link to="/employees"
          className="inline-block mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors">
          View All Employees →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Employees"  value={loading ? "…" : employees.length} sub="From API + local"  color="bg-blue-50 dark:bg-blue-900/20" />
        <StatCard icon="🏢" label="Departments"      value={loading ? "…" : departments}       sub="Unique departments" color="bg-purple-50 dark:bg-purple-900/20" />
        <StatCard icon="✨" label="Recently Added"   value={loading ? "…" : localCount}        sub="Added locally"     color="bg-emerald-50 dark:bg-emerald-900/20" />
        <StatCard icon="📈" label="Active Today"     value={loading ? "…" : Math.floor(employees.length * 0.75)} sub="Est. online" color="bg-amber-50 dark:bg-amber-900/20" />
      </div>

      {/* Recent employees */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Employees</h3>
          <Link to="/employees" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">See all</Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recent.map((emp) => (
              <div key={emp.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <Avatar name={emp.name} src={emp.avatar} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{emp.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{emp.email}</p>
                </div>
                <div className="hidden sm:block">
                  <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                    {emp.department}
                  </span>
                </div>
                {emp.isLocal && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">New</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
