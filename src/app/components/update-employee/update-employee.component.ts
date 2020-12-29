import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  updateForm: FormGroup;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.updateForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      date: new FormControl(),
      number: new FormControl(),
      skills: new FormControl()
    });
  }

  ngOnInit() {
    this.service.getEmployee(this.id).subscribe(employee => {
      this.updateForm.controls['name'].setValue(employee.name);
      this.updateForm.controls['email'].setValue(employee.email);
      this.updateForm.controls['date'].setValue(employee.date);
      this.updateForm.controls['number'].setValue(employee.number);
      this.updateForm.controls['skills'].setValue(employee.skills);
    });
  }

  updateEmployee() {
    this.service
      .updateEmployee(this.id, this.updateForm.value)
      .subscribe(data => {
        this.router.navigate(['/employee-list']);
      });
  }
}
