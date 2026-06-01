import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("https://dummyjson.com/users?limit=30");
      const data = await res.json();
      const mapped = data.users.map((u) => ({
        id:         u.id,
        name:       `${u.firstName} ${u.lastName}`,
        email:      u.email,
        phone:      u.phone,
        department: u.company?.department || "General",
        role:       u.company?.title || "Employee",
        avatar:     null,
        isLocal:    false,
      }));
      setEmployees(mapped);
    } catch (e) {
      setError("Failed to load employees. Check your internet.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const addEmployee = (emp) => {
    const newEmp = {
      ...emp,
      id:      Date.now(),
      avatar:  null,
      isLocal: true,
    };
    setEmployees((prev) => [newEmp, ...prev]);
    return newEmp;
  };

  const updateEmployee = (id, updates) =>
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));

  const deleteEmployee = (id) =>
    setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, addEmployee, updateEmployee, deleteEmployee, refetch: fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
