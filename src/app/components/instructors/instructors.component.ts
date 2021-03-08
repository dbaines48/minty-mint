import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  instructors: Instructor[] = [];
  loading:boolean = true;
  currentView = 'columns';

  constructor(private dbs: DatabaseService, 
              private titleService: Title,
              private router: Router) {
    this.titleService.setTitle('Instructors | Minty Mint'); 
    this.dbs.getInstructors()
      .subscribe((instructors: Instructor[]) => {
        this.instructors = instructors;
        console.log(this.instructors);
        this.loading = false;
      }, 
      (error: any) => {
        this.loading = false;
      });
  }

  viewInstructor(id: number){
    this.router.navigate(['/instructors', id]);
  }

  toggleView() {
    this.currentView = this.currentView == 'columns' ? 'grid' : 'columns';
  }

  ngOnInit(): void {
  }

}
