import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //url to connect to API
  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //GET candidates param to API
  public get() {
    return this.httpClient.get(this.SERVER_URL + '/candidates');
  }

  deleteCandidate(id) {
    return this.httpClient.delete(`${this.SERVER_URL}/candidates/${id}`);
  }

  createCandidate(data) {
    return this.httpClient.post(`${this.SERVER_URL}/candidates/`, data);
  }

  updateCandidate(id, data) {
    return this.httpClient.put(`${this.SERVER_URL}/candidates/${id}`, data);
  }

  //GET param to API
  public getPosts() {
    return this.httpClient.get(this.SERVER_URL + '/posts');
  }

  //GET Unique post param to API
  public getPostId(id) {
    return this.httpClient.get(`${this.SERVER_URL}/posts/${id}`);
  }

  createPost(data) {
    return this.httpClient.post(`${this.SERVER_URL}/posts/`, data);
  }

  updatePost(id, data) {
    return this.httpClient.put(`${this.SERVER_URL}/posts/${id}`, data);
  }

  deletePost(id) {
    return this.httpClient.delete(`${this.SERVER_URL}/posts/${id}`);
  }
}
