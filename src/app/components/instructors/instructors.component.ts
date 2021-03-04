import { Component, OnInit } from '@angular/core';
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

  constructor(private dbs: DatabaseService) { 
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

  toggleView() {
    this.currentView = this.currentView == 'columns' ? 'grid' : 'columns';
  }

  ngOnInit(): void {
  }

}
