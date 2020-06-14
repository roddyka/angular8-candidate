import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  candidates = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);

      this.candidates = data;
    });
  }
}
