import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //url to connect to API
  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
}
