import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from "../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('orders') orders;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  selectedOrder: Order;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.modal = MaterialService.modalWindow(this.modalRef);
  }
  ngOnDestroy() {
    this.modal.destroy();
  }
  showModal(order) {
    this.selectedOrder = order;
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }

  getSum(order: Order) {
    return order.list.reduce((total, item) => {
      return total += item.cost * item.quanitity;
    }, 0)
  }
}
