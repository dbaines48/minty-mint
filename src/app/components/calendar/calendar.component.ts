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

  loading: boolean = true;
  subjects: Subject[] = [];
  instructors: Instructor[] = [];
  startDate: Date = new Date();

  constructor(private titleService: Title,
    private dbs: DatabaseService) {
    this.startDate.setDate(this.startDate.getDate() - 3);
    this.titleService.setTitle('Calendar | Minty Mint');
    this.dbs.getSubjects().subscribe((subs: Subject[]) => {
      if (subs.length > 0)
        this.subjects = subs;
      this.dbs.getInstructors().subscribe((ins: Instructor[]) => {
        this.instructors = ins;
        this.loading = false;
        google.charts.load('current', { 'packages': ['gantt'] });
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
      });
    });

    // google.charts.setOnLoadCallback(this.drawChart);
    // this.drawChart();
  }

  diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

  }

  getClassPercentage(startDate: Date, duration: number) {
    let now = new Date();
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);
    if (now <= startDate) {
      return 0;
    } else if (now >= endDate) {
      return 100;
    } else {
      return this.diff_minutes(now, startDate) * 100 / duration;
    }
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
            this.getClassPercentage(date, evt.duration),
            null
          ]
        ]);
      })
    });

    // otherData.addRows([
    //   ['train1', 'Walk to train stop', 'res1', null, null, 10000, 100, null],
    //   ['train2', 'Wait for train', 'res1', null, null, 600000, 100, 'train1'],
    //   ['music', 'Listen to music', 'music', null, null, 700000, 100, null],
    //   ['train', 'Train ride', 'train', null, null, 610000, 75, null],
    //   ['toWork', 'Walk to work', 'walk', null, null, 450000, 0, null],
    //   ['work', 'Sit down at desk', null, null, null, 630000, 0, null],

    // ]);

    var options = {
      height: 441,
      colors: ['#556fb5','#4698a7','#9b55b5','#b59b55','#e4508f'],
      gantt: {
        defaultStartDateMillis: new Date(),
        labelStyle: {
          fontName: 'Arial',
          fontSize: 14,
          color: '#58b092'
        },
        sortTasks: false,
        palette: [
          {
            color: '#556fb5',
            dark: '#4c63a2',
            light: '#99a8d2'
          }, {
            color: '#4698a7',
            dark: '#3f8896',
            light: '#90c1ca'
          }, {
            color: '#9b55b5',
            dark: '#8b4ca2',
            light: '#c399d2'
          }, {
            color: '#b59b55',
            dark: '#a28b4c',
            light: '#d2c399'
          }, {
            color: '#e4508f',
            dark: '#cd4880',
            light: '#ee96bb'
          }
        ]
      }
    };

    var chart = new google.visualization.Gantt(document.getElementById('gantt-placeholder'));

    chart.draw(otherData, options);
  }

  getSequence(n: number): Array<number> {
    return Array(n);
  }

  getNextDate(days: number) {
    let newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  isItToday(days: number): boolean {
    const today = new Date();
    let compareDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    compareDate.setDate(compareDate.getDate() + days);
    return compareDate.getDate() == today.getDate() &&
      compareDate.getMonth() == today.getMonth() &&
      compareDate.getFullYear() == today.getFullYear()
  }

  ngOnInit(): void {

  }

}
