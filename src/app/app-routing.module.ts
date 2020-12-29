import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateEmployeeComponent } from "./components/create-employee/create-employee.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { UpdateEmployeeComponent } from "./components/update-employee/update-employee.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "employee-list" },
  { path: "create-employee", component: CreateEmployeeComponent },
  { path: "update-employee/:id", component: UpdateEmployeeComponent },
  { path: "employee-list", component: EmployeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
