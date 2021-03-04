import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  loading: boolean = true;

  constructor(private dbs: DatabaseService) { 
    this.dbs.getSubjects()
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      })
  }

  ngOnInit(): void {
  }

}
