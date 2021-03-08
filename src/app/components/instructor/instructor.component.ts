import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  extraProjects: number = Math.floor(Math.random() * 20) + 1;
  extraStudents: number = Math.floor(Math.random() * 40) + 1;

  @Input() instructor: Instructor;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
