import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Students | Minty Mint');
  }

  ngOnInit(): void {
  }

}
