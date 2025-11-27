export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:7285/api/student';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> { return this.http.get<Student[]>(this.baseUrl); }
  getById(id: number): Observable<Student> { return this.http.get<Student>(`${this.baseUrl}/${id}`); }
  create(student: Student): Observable<Student> { return this.http.post<Student>(this.baseUrl, student); }
  update(id: number, student: Student): Observable<Student> { return this.http.put<Student>(`${this.baseUrl}/${id}`, student); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/${id}`); }
}
