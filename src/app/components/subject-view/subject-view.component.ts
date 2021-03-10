import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { Subject } from 'src/app/models/subject';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.css']
})
export class SubjectViewComponent implements OnInit {

  subject: Subject;
  subjectInstructor: Instructor;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dbs: DatabaseService,
              private titleService: Title) {
    this.route.params.subscribe( params => {
      this.dbs.getSubjects()
        .subscribe((subjects: Subject[]) => {
          if(subjects.length > 0) {
            let _subject: Subject | undefined = subjects.find(x => x.id == +params['id']);
            if(_subject){
              this.subject = _subject;
              this.titleService.setTitle(`${this.subject.name} | Minty Mint`);
              this.dbs.getInstructors()
                .subscribe((instructors: Instructor[]) => {
                  this.subjectInstructor = instructors.find(x => x.id == this.subject.instructorId);
                  console.log(this.subjectInstructor);
                });
            }
          }
        });
    });
  }

  ngOnInit(): void {
  }

  navigateToInstructor() {
    this.router.navigate(['/instructors', this.subjectInstructor.id]);
  }

}
