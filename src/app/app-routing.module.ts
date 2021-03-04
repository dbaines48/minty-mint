import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorsComponent } from 'src/app/components/instructors/instructors.component'
import { CalendarComponent } from './components/calendar/calendar.component';
import { InstructorViewComponent } from './components/instructor-view/instructor-view.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectViewComponent } from './components/subject-view/subject-view.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructors/:id', component: InstructorViewComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'subjects/:id', component: SubjectViewComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'students', component: StudentsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'instructors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
