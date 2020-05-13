import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MaterialInstance, MaterialService} from '../../classes/material.service';

@Component({
  selector: 'app-cite-layout',
  templateUrl: './cite-layout.component.html',
  styleUrls: ['./cite-layout.component.css']
})
export class CiteLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('floatBut') floatBut: ElementRef;
  @ViewChild('side_h') sideNavRef: ElementRef;
  sideNav: MaterialInstance;
  constructor(private auth: AuthService, private router: Router) { }
  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ];

  ngAfterViewInit() {
    MaterialService.FloatingButton(this.floatBut);
    this.sideNav = MaterialService.materialSideNav(this.sideNavRef);
  }
  sideOpen() {
    this.sideNav.open();
  }
  sideClose() {
    this.sideNav.close();
  }
  onLogout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.sideNav.destroy();
  }
}
