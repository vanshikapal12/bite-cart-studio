import { useState, useEffect, useMemo } from "react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joinDate: string;
  status: "Active" | "Inactive";
}

const STORAGE_KEY = "employees";

const defaultEmployees: Employee[] = [
  { id: "1", name: "Alice Johnson", email: "alice@company.com", phone: "555-0101", department: "Engineering", designation: "Senior Developer", salary: 95000, joinDate: "2022-03-15", status: "Active" },
  { id: "2", name: "Bob Smith", email: "bob@company.com", phone: "555-0102", department: "Marketing", designation: "Marketing Lead", salary: 78000, joinDate: "2021-07-20", status: "Active" },
  { id: "3", name: "Carol Davis", email: "carol@company.com", phone: "555-0103", department: "HR", designation: "HR Manager", salary: 82000, joinDate: "2020-01-10", status: "Active" },
  { id: "4", name: "David Wilson", email: "david@company.com", phone: "555-0104", department: "Engineering", designation: "Junior Developer", salary: 62000, joinDate: "2023-06-01", status: "Active" },
  { id: "5", name: "Eva Martinez", email: "eva@company.com", phone: "555-0105", department: "Finance", designation: "Accountant", salary: 71000, joinDate: "2022-11-08", status: "Inactive" },
  { id: "6", name: "Frank Lee", email: "frank@company.com", phone: "555-0106", department: "Engineering", designation: "Tech Lead", salary: 110000, joinDate: "2019-05-22", status: "Active" },
  { id: "7", name: "Grace Kim", email: "grace@company.com", phone: "555-0107", department: "Design", designation: "UI/UX Designer", salary: 85000, joinDate: "2021-09-14", status: "Active" },
  { id: "8", name: "Henry Brown", email: "henry@company.com", phone: "555-0108", department: "Marketing", designation: "Content Writer", salary: 55000, joinDate: "2023-02-28", status: "Inactive" },
];

function loadEmployees(): Employee[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultEmployees;
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(loadEmployees);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ["All", ...Array.from(set).sort()];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase()) ||
        e.designation.toLowerCase().includes(search.toLowerCase());
      const matchDept = departmentFilter === "All" || e.department === departmentFilter;
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const stats = useMemo(() => {
    const active = employees.filter((e) => e.status === "Active").length;
    const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
    const deptCounts: Record<string, number> = {};
    employees.forEach((e) => {
      deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
    });
    return {
      total: employees.length,
      active,
      inactive: employees.length - active,
      avgSalary: employees.length ? Math.round(totalSalary / employees.length) : 0,
      departments: Object.keys(deptCounts).length,
      deptCounts,
    };
  }, [employees]);

  const addEmployee = (emp: Omit<Employee, "id">) => {
    const id = Date.now().toString();
    setEmployees((prev) => [...prev, { ...emp, id }]);
  };

  const updateEmployee = (id: string, data: Omit<Employee, "id">) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    employees: filtered,
    allEmployees: employees,
    search,
    setSearch,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    stats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
}
