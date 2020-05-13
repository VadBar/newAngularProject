import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Category} from "../../shared/interfaces";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {
  constructor(private categoryServ: CategoryService) {}
  categories$: Observable<Category[]>;
  ngOnInit() {
    this.categories$ = this.categoryServ.fetch();
  }
}
