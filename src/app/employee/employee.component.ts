import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() candidate: number;

  employee;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCandidate(this.candidate).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
    });
  }
}
