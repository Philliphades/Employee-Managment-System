import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(
    public service: EmployeeService, 
    public router: Router,
    private drawerService: NzDrawerService,
    // public modal: NgbModal
    ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.service.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  editEmployee(id) {
    this.router.navigate(['/update-employee', id]);
  }
  
  add()  {
    const drawerRef = this.drawerService.create<CreateEmployeeComponent>({
      nzTitle: 'Create new Employee',
      nzWidth:'480px',
      nzContent: CreateEmployeeComponent,      
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
      // nzContentParams: {
        
      // }
    });
    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      // this.router.navigate(['/employee-list']);
    });
  }
  // update(id) {
  //   const drawerRef = this.drawerService.create<UpdateEmployeeComponent>({
  //     nzTitle: 'Create new Employee',
  //     nzWidth:'480px',
  //     nzContent: UpdateEmployeeComponent,      
  //   });
  //   drawerRef.afterOpen.subscribe(() => {
  //     console.log('Drawer(Component) open');
     
  //   });
  //   drawerRef.afterClose.subscribe(data => {
  //     console.log(data);
      
  //   });
  // }
  deleteEmployee(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }
}
