import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-instructor-view',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.css']
})
export class InstructorViewComponent implements OnInit {

  instructor: Instructor;
  constructor(private route: ActivatedRoute,
              private dbs: DatabaseService,
              private titleService: Title) {
    this.route.params.subscribe( params => {
      this.dbs.getInstructors()
        .subscribe((instructors: Instructor[]) => {
          if(instructors.length > 0){
            let _instructor: Instructor | undefined = instructors.find( x => x.id == +params['id']);
            if (_instructor)
              this.instructor = _instructor;
              this.titleService.setTitle(`${this.instructor.name} | Minty Mint`);
          }
        });
    });
  }

  ngOnInit(): void {
  }

}
