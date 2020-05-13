import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  constructor(private category: CategoryService, private router: Router, private title: Title) {
    title.setTitle('Асортимент');
  }
  categories$: Observable<Category[]>;
  ngOnInit() {
  this.categories$ = this.category.fetch();
  }
}
