import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {OrdersService} from "../shared/services/orders.service";
import {Filter, Order} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
const STEP = 10;
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('tooltip') tooltip: ElementRef;
  tool: MaterialInstance;
  filterVisible: boolean = false;
  offset: number = 0;
  limit: number = STEP;
  orders: Order[];
  sub: Subscription;
  loading: boolean = false;
  preloading: boolean = false;
  showBut: boolean = true;
  filter: Filter = {};
  start: Date;
  end: Date;
  order: number;
  constructor(private orderSer: OrdersService, private title: Title) {
    title.setTitle('История');
  }
 ngOnInit() {
   this.loading = true;
   this.fetch();
 }
 applyFiltration(filter: Filter) {
  this.orders = [];
  this.offset = 0;
  this.filter = filter;
  this.loading = true;
  this.fetch();
 }
 private fetch() {
   let params = Object.assign({}, this.filter, {
     offset: this.offset,
     limit: this.limit
   });
   this.sub = this.orderSer.getByFilter(params).subscribe((orders: Order[]) => {
     if(!this.orders) {
       this.orders = orders;
     } else {
       this.orders = this.orders.concat(orders);
     }
     this.showBut = orders.length === this.limit;
     this.loading = false;
     this.preloading = false;
   })
 }
 loadMore() {
    this.offset += STEP;
    this.preloading = true;
    this.fetch();
 }
 isFiltred() {
    return Object.keys(this.filter).length !== 0;
 }
 ngAfterViewInit() {
    this.tool = MaterialService.materialTooltip(this.tooltip);
 }
 ngOnDestroy() {
    this.tool.destroy();
    this.sub.unsubscribe();
 }
}
