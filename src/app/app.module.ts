import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { StudentsComponent } from './components/students/students.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { SubjectComponent } from './components/subject/subject.component';
import { InstructorViewComponent } from './components/instructor-view/instructor-view.component';
import { SubjectViewComponent } from './components/subject-view/subject-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InstructorsComponent,
    SubjectsComponent,
    CalendarComponent,
    StudentsComponent,
    InstructorComponent,
    SubjectComponent,
    InstructorViewComponent,
    SubjectViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
