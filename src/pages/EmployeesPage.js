import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";

const PAGE_SIZE = 9;

export default function EmployeesPage() {
  const { employees, loading, error, deleteEmployee, refetch } = useEmployees();
  const { addToast } = useToast();

  const [search, setSearch]     = useState("");
  const [dept, setDept]         = useState("All");
  const [page, setPage]         = useState(1);
  const [deleting, setDeleting] = useState(null);

  const departments = useMemo(() => ["All", ...new Set(employees.map((e) => e.department))], [employees]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter((e) =>
      (dept === "All" || e.department === dept) &&
      (e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.phone.includes(q))
    );
  }, [employees, search, dept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (emp) => {
    setDeleting(emp.id);
    setTimeout(() => {
      deleteEmployee(emp.id);
      addToast(`${emp.name} removed`, "success");
      setDeleting(null);
      if (paginated.length === 1 && page > 1) setPage((p) => p - 1);
    }, 400);
  };

  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleDept   = (v) => { setDept(v);   setPage(1); };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Employees</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{filtered.length} record{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <Link to="/add-employee"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md shadow-brand-500/20">
          ➕ Add Employee
        </Link>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email or phone…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => handleDept(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm outline-none focus:border-brand-500 dark:focus:border-brand-400 transition-colors"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <button onClick={refetch} title="Refresh"
          className="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          🔄
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🤷</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No employees match your search.</p>
          <button onClick={() => { setSearch(""); setDept("All"); }}
            className="mt-3 text-brand-600 dark:text-brand-400 text-sm font-semibold hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginated.map((emp) => (
              <div
                key={emp.id}
                className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-all duration-200 ${deleting === emp.id ? "opacity-50 scale-95" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar name={emp.name} src={emp.avatar} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{emp.name}</h3>
                      {emp.isLocal && (
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">New</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{emp.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{emp.phone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                      {emp.department}
                    </span>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{emp.role}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(emp)}
                    disabled={deleting === emp.id}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors text-sm"
                    title="Remove employee"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "…" ? (
                    <span key={`e${idx}`} className="px-2 text-gray-400">…</span>
                  ) : (
                    <button key={item} onClick={() => setPage(item)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors
                        ${item === page ? "bg-brand-600 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                      {item}
                    </button>
                  )
                )}
              <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
