import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Employee } from '../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly api: string='http://localhost:3000';
  private pathurl: string = 'db.json';
  constructor(private http: HttpClient) {
    // this.api = `${environment.apiURL}`;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.api+'/employees')
      .pipe(retry(1), catchError(this.handleError));
  }
  

  getEmployee(id): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.api}/employees/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.api + '/employees',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Update an employee
   * @param id the ID of employee I want to update
   * @param employee the object of that employee
   */
  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(
        `${this.api}/employees/${id}`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteEmployee(id) {
    return this.http
      .delete<Employee>(`${this.api}/employees/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
