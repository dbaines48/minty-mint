import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  instructors: Instructor[] = [];
  subjects: Subject[] = [];

  constructor(private http: HttpClient) { }

  getInstructors() {
    var time = Date.now();
    return this.http.get(`assets/files/instructors.json?v=${time}`);
  }

  getSubjects() {
    var time = Date.now();
    return this.http.get(`assets/files/subjects.json?v=${time}`);
  }
}
