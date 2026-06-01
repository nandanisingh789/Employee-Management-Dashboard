import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { useToast } from "../context/ToastContext";

const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations", "Legal", "Product"];
const ROLES = ["Software Engineer", "Product Manager", "Designer", "Analyst", "Manager", "Director", "Intern", "Consultant", "Lead", "Coordinator"];

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
  </div>
);

const inputCls = (err) =>
  `w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all text-sm
  ${err ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-brand-500 dark:focus:border-brand-400"}`;

const EMPTY = { name: "", email: "", phone: "", department: "", role: "" };

export default function AddEmployeePage() {
  const { addEmployee } = useEmployees();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name       = "Full name is required";
    else if (form.name.trim().length < 3) e.name = "Name must be at least 3 characters";

    if (!form.email.trim())      e.email      = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";

    if (!form.phone.trim())      e.phone      = "Phone number is required";
    else if (!/^[\d\s\-()+]{7,15}$/.test(form.phone))        e.phone = "Enter a valid phone number";

    if (!form.department)        e.department = "Please select a department";
    if (!form.role)              e.role       = "Please select a role";
    return e;
  };

  const set = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setTimeout(() => {
      addEmployee(form);
      addToast(`${form.name} added successfully! 🎉`, "success");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/employees"), 1800);
    }, 700);
  };

  const handleReset = () => { setForm(EMPTY); setErrors({}); };

  if (success) return (
    <div className="flex flex-col items-center justify-center py-24 animate-bounce-in">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Employee Added!</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">Redirecting to employee list…</p>
      <div className="mt-6 w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Add New Employee</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details below to add a new team member.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 lg:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <Field label="Full Name *" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. John Doe"
              className={inputCls(errors.name)}
            />
          </Field>

          {/* Email */}
          <Field label="Email Address *" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="john.doe@company.com"
              className={inputCls(errors.email)}
            />
          </Field>

          {/* Phone */}
          <Field label="Phone Number *" error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="+91 9876543210"
              className={inputCls(errors.phone)}
            />
          </Field>

          {/* Department & Role side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Department *" error={errors.department}>
              <select
                value={form.department}
                onChange={set("department")}
                className={inputCls(errors.department)}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>

            <Field label="Role *" error={errors.role}>
              <select
                value={form.role}
                onChange={set("role")}
                className={inputCls(errors.role)}
              >
                <option value="">Select role</option>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>

          {/* Preview card */}
          {form.name && (
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 animate-slide-in">
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2">Preview</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {form.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{form.name || "—"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{form.email || "—"} · {form.phone || "—"}</p>
                  {form.department && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 text-xs font-medium">
                      {form.department} · {form.role}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding…
                </>
              ) : "✓ Add Employee"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
