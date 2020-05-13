import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Chart} from 'chart.js'
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit {
  average: number;
  preloading: boolean = true;
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('orders') ordersRef: ElementRef;
  sub: Subscription;
  constructor(private analyticService: AnalyticsService, private title: Title) {
    title.setTitle('Аналитика');
  }

  ngAfterViewInit() {
     let gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(155, 99, 132)'
    };
    let ordersConfig: any = {
      label: 'Заказы',
      color: 'rgb(155, 99, 132)'
    };
    this.sub = this.analyticService.getAnalytics().subscribe((item: AnalyticsPage) => {
      this.average = item.average;
      gainConfig.labels =  item.chart.map(i => i.label);
      gainConfig.data = item.chart.map(i => i.gain);
      ordersConfig.labels =  item.chart.map(i => i.label);
      ordersConfig.data = item.chart.map(i => i.order);
      const gainCont = this.gainRef.nativeElement.getContext('2d');
      gainCont.canvas.height = '300px';
      const ordersCont = this.ordersRef.nativeElement.getContext('2d');
      ordersCont.canvas.height = '300px';
      new Chart(gainCont, this.getChartFromData(gainConfig));
      new Chart(ordersCont, this.getChartFromData(ordersConfig));
      this.preloading = false;
    });
  }
  getChartFromData({label, color, labels, data}) {
    return {
      type: 'line',
      options: {
        responsive: true
      },
      data: {
        labels,
        datasets:[
          {
            label,
            data,
            backgroundColor: color,
            steppedLine: false,
            fill: false
          }
        ]
      }
    }
  }
}
