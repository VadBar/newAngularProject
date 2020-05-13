import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "./order.service";
import {NavigationEnd, Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Order, Position} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router: Router, public orderSer: OrderService, private ordersServ: OrdersService, private title: Title) {
    title.setTitle('Добавить заказ');
  }
  root: boolean = true;
  @ViewChild('modal') modal: ElementRef;
  mod: MaterialInstance;
  pending: boolean = false;
  sub: Subscription;
  ngOnInit() {
    this.sub = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.root = this.router.url === '/order'
      }
    })
  }
  closeModal() {
    this.mod.close();
  }
  ngOnDestroy() {
    this.mod.destroy();
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  deletePos(position: Position) {
    this.orderSer.remove(position);
    MaterialService.toast('Позиция удалена!');
  }
  showModal() {
     this.mod.open();
  }
  saveOrder() {
    this.pending = true;
    let order: Order = {
      list: this.orderSer.list.map(p => {
        delete p._id;
        return p;
      })
    };
    this.ordersServ.create(order).subscribe(newOrder => {
      MaterialService.toast('Заказ добавлен!');
      this.orderSer.clear();
    },
    error => MaterialService.toast(error.error.message),
      () => {
        this.closeModal();
        this.pending = false;
      }
    )
  }
  ngAfterViewInit() {
    this.mod = MaterialService.modalWindow(this.modal);
  }
}
