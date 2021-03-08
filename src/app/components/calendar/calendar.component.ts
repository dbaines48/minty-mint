import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Event } from 'src/app/models/event';
import { Instructor } from 'src/app/models/instructor';
import { Subject } from 'src/app/models/subject';
import { DatabaseService } from 'src/app/services/database.service';


declare var google: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  subjects: Subject[] = [];
  instructors: Instructor[] = [];
  constructor(private titleService: Title,
    private dbs: DatabaseService) {
    this.titleService.setTitle('Calendar | Minty Mint');
    this.dbs.getSubjects().subscribe((subs: Subject[]) => {
      if (subs.length > 0)
        this.subjects = subs;
      this.dbs.getInstructors().subscribe((ins: Instructor[]) => {
        this.instructors = ins;
        google.charts.load('current', { 'packages': ['gantt'] });
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
      });
    });

    // google.charts.setOnLoadCallback(this.drawChart);
    // this.drawChart();
  }

  drawChart() {

    var otherData = new google.visualization.DataTable();
    otherData.addColumn('string', 'Task ID');
    otherData.addColumn('string', 'Task Name');
    otherData.addColumn('string', 'Resource');
    otherData.addColumn('date', 'Start');
    otherData.addColumn('date', 'End');
    otherData.addColumn('number', 'Duration');
    otherData.addColumn('number', 'Percent Complete');
    otherData.addColumn('string', 'Dependencies');

    this.subjects.forEach((subject: Subject) => {
      subject.schedule.forEach((evt: Event) => {
        let date = new Date();
        date.setHours(evt.startTime, 0, 0);
        otherData.addRows([
          [
            `${subject.id}${evt.id}`,
            subject.name,
            this.instructors.find(x => x.id == subject.instructorId).name,
            date,
            null,
            evt.duration * 60000,
            100,
            null
          ]
        ]);
      })
    });
    console.log(otherData);

    // otherData.addRows([
    //   ['train1', 'Walk to train stop', 'res1', null, null, 10000, 100, null],
    //   ['train2', 'Wait for train', 'res1', null, null, 600000, 100, 'train1'],
    //   ['music', 'Listen to music', 'music', null, null, 700000, 100, null],
    //   ['train', 'Train ride', 'train', null, null, 610000, 75, null],
    //   ['toWork', 'Walk to work', 'walk', null, null, 450000, 0, null],
    //   ['work', 'Sit down at desk', null, null, null, 630000, 0, null],

    // ]);

    var options = {
      height: 471,
      gantt: {
        defaultStartDateMillis: new Date()
      }
    };

    var chart = new google.visualization.Gantt(document.getElementById('gantt-placeholder'));

    chart.draw(otherData, options);
  }

  ngOnInit(): void {

  }

}
