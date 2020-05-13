import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {OverviewPage} from "../shared/interfaces";
import {Observable} from "rxjs";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  constructor(private analyticsService: AnalyticsService, private title: Title) {
    title.setTitle('Статистика');
  }
  @ViewChild('target') target: ElementRef;
  tapTarget: MaterialInstance;
  overview$: Observable<OverviewPage>;
  ngOnInit() {
    this.overview$ = this.analyticsService.getOverview();
  }
  showTarget() {
    this.tapTarget = MaterialService.materialTapTarget(this.target);
    this.tapTarget.open();
  }
  // ngAfterViewInit() {
  // }
  ngOnDestroy() {
    if (this.tapTarget) {
      this.tapTarget.destroy();
    }
  }
}
