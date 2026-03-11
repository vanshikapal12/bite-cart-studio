import { useState } from "react";
import { Users, UserCheck, UserX, DollarSign, Building2, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useEmployees, type Employee } from "@/hooks/useEmployees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import CartSidebar from "@/components/CartSidebar";
import EmployeeFormDialog from "@/components/EmployeeFormDialog";

const statCards = [
  { key: "total" as const, label: "Total Employees", icon: Users, color: "bg-primary/10 text-primary" },
  { key: "active" as const, label: "Active", icon: UserCheck, color: "bg-green-500/10 text-green-600" },
  { key: "inactive" as const, label: "Inactive", icon: UserX, color: "bg-destructive/10 text-destructive" },
  { key: "avgSalary" as const, label: "Avg Salary", icon: DollarSign, color: "bg-blue-500/10 text-blue-600" },
  { key: "departments" as const, label: "Departments", icon: Building2, color: "bg-purple-500/10 text-purple-600" },
];

const EmployeeDashboard = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const {
    employees, search, setSearch, departmentFilter, setDepartmentFilter,
    statusFilter, setStatusFilter, departments, stats, addEmployee, updateEmployee, deleteEmployee,
  } = useEmployees();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (emp: Employee) => { setEditing(emp); setFormOpen(true); };

  const handleSubmit = (data: Omit<Employee, "id">) => {
    if (editing) {
      updateEmployee(editing.id, data);
      toast.success("Employee updated successfully");
    } else {
      addEmployee(data);
      toast.success("Employee added successfully");
    }
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteEmployee(deleteTarget.id);
      toast.success("Employee deleted");
      setDeleteTarget(null);
    }
  };

  const formatSalary = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} items={cart.items} totalPrice={cart.totalPrice} onRemove={cart.removeItem} onUpdateQuantity={cart.updateQuantity} />

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Employee Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Manage your team members and track workforce metrics.</p>
          </div>
          <Button onClick={openAdd} className="gap-2 self-start">
            <Plus className="h-4 w-4" /> Add Employee
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {statCards.map((s) => (
            <Card key={s.key} className="border-none shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold">
                    {s.key === "avgSalary" ? formatSalary(stats[s.key]) : stats[s.key]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6 border-none shadow-sm">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, department…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d} value={d}>{d === "All" ? "All Departments" : d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden lg:table-cell">Designation</TableHead>
                  <TableHead className="hidden sm:table-cell">Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                      No employees found.
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((emp) => (
                    <TableRow key={emp.id} className="group">
                      <TableCell>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{emp.department}</TableCell>
                      <TableCell className="hidden lg:table-cell">{emp.designation}</TableCell>
                      <TableCell className="hidden sm:table-cell">{formatSalary(emp.salary)}</TableCell>
                      <TableCell>
                        <Badge variant={emp.status === "Active" ? "default" : "secondary"} className={emp.status === "Active" ? "bg-green-500/15 text-green-700 hover:bg-green-500/25" : ""}>
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openEdit(emp)} className="h-8 w-8">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(emp)} className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {employees.length} employee{employees.length !== 1 ? "s" : ""}
        </p>
      </main>

      <Footer />

      {/* Form dialog */}
      <EmployeeFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} employee={editing} />

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDashboard;
