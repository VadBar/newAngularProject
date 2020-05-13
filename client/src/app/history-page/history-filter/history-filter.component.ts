import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MaterialDatepicker, MaterialService} from "../../shared/classes/material.service";
import {Filter} from "../../shared/interfaces";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements AfterViewInit {
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValidate = true;
  constructor() { }
  validate() {
    if(!this.start.date || !this.end.date) {
      this.isValidate = true;
      return
    }
    this.isValidate = this.start.date < this.end.date;
  }
  ngAfterViewInit() {
    this.start = MaterialService.materialDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.materialDatePicker(this.endRef, this.validate.bind(this));
  }
 onSubmit() {
    let filter: Filter = {};
    if(this.order) {
      filter.order = this.order
    }
    if(this.start.date) {
      filter.start = this.start.date;
    }
    if(this.end.date) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
 }
}
