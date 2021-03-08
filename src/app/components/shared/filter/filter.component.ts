import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() container: string;
  
  constructor() {
    
  }

  setPlaceholder() {
    return `${this.container} search`;
  }

  evaluateFilter(filterCategory: string){
    switch(filterCategory){
      case 'experience':
        return this.container == 'instructor';
        break;
      case 'time':
        return this.container == 'event';
        break;
      case 'subject':
        return true;
        break;
      case 'status':
        return this.container == 'instructor' || this.container == 'subject';
        break;
    }
  }

  ngOnInit(): void {
  }

}
