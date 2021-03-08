import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  @Input() subject: Subject;

  constructor(private router: Router) { }

  viewSubject() {
    this.router.navigate(['/subjects', this.subject.id]);
  }

  ngOnInit(): void {
  }

}
