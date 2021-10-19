import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  private url = environment.resource;
  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get(this.url+'students');
  }
  delete(studentId: number) {
    return this.http.delete(this.url+'student/deleted/'+studentId);
  }
}
