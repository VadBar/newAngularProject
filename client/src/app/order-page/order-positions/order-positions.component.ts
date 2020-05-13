import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Position} from '../../shared/interfaces';
import {PositionService} from "../../shared/services/position.service";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/internal/operators";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit, OnDestroy {

  constructor(private positionServ: PositionService, private route: ActivatedRoute, private orderSer: OrderService) {}
  positions: Position[] = [];
  load = true;
  sub: Subscription;
  ngOnInit() {
    this.sub = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionServ.getAll(params['id'])
        }
      ),
      map(
        (positions: Position[]) => {
          return positions.map(p => {
            p.quanitity = 1;
            return p;
          });
        }
      )
    ).subscribe((positions: Position[]) => {
       this.positions = positions;
       this.load = false;
    });
  }
  addPosition(position: Position) {
    this.orderSer.create(position);
    MaterialService.toast('Позиция добавлена!');
    position.quanitity = 1;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
