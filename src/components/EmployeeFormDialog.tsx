import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Employee } from "@/hooks/useEmployees";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, "id">) => void;
  employee?: Employee | null;
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joinDate: "",
  status: "Active" as const,
};

const DEPARTMENTS = ["Engineering", "Marketing", "HR", "Finance", "Design", "Operations", "Sales"];

const EmployeeFormDialog = ({ open, onClose, onSubmit, employee }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary.toString(),
        joinDate: employee.joinDate,
        status: employee.status,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [employee, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.department) errs.department = "Department is required";
    if (!form.designation.trim()) errs.designation = "Designation is required";
    if (!form.salary || isNaN(Number(form.salary)) || Number(form.salary) <= 0) errs.salary = "Valid salary required";
    if (!form.joinDate) errs.joinDate = "Join date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      department: form.department,
      designation: form.designation.trim(),
      salary: Number(form.salary),
      joinDate: form.joinDate,
      status: form.status,
    });
    onClose();
  };

  const set = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Doe" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@company.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="555-0100" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="department">Department</Label>
              <Select value={form.department} onValueChange={(v) => set("department", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" value={form.designation} onChange={(e) => set("designation", e.target.value)} placeholder="Software Engineer" />
              {errors.designation && <p className="text-xs text-destructive">{errors.designation}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salary">Salary ($)</Label>
              <Input id="salary" type="number" value={form.salary} onChange={(e) => set("salary", e.target.value)} placeholder="75000" />
              {errors.salary && <p className="text-xs text-destructive">{errors.salary}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input id="joinDate" type="date" value={form.joinDate} onChange={(e) => set("joinDate", e.target.value)} />
              {errors.joinDate && <p className="text-xs text-destructive">{errors.joinDate}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{employee ? "Update" : "Add Employee"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
