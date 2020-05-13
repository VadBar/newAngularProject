import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionService} from "../../../shared/services/position.service";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";
import {Message, Position} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {findIndex} from "rxjs/internal/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalDelete') modalDelete: ElementRef;
  mod: MaterialInstance;
  mod2: MaterialInstance;
  constructor(private positionServ: PositionService) { }
  positions: Position[] = [];
  loader: boolean = true;
  form: FormGroup;
  creatPos: boolean;
  idPosition: string;
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  ngOnInit() {
     this.mod = MaterialService.modalWindow(this.modal);
    this.mod2 = MaterialService.modalWindow(this.modalDelete);
     this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        cost: new FormControl(1, [Validators.required, Validators.min(1)])
     });
     this.sub = this.positionServ.getAll(this.categoryId).subscribe((positions: Position[]) => {
       this.positions = positions;
       this.loader = false;
     },
     error => MaterialService.toast(error.error.message)
     );
  }
  showModal() {
    this.creatPos = true;
    this.mod.open();
  }
  closeModal() {
    this.form.reset({
      name: '',
      cost: 1
    });
    this.mod.close();
  }
  ngOnDestroy() {
    this.mod.destroy();
    this.sub.unsubscribe();
    if(this.sub2) {
      this.sub2.unsubscribe();
    }
    if(this.sub3) {
      this.sub3.unsubscribe();
    }
  }
  changePosition(position: Position) {
    this.form.setValue({
      name: position.name,
      cost: position.cost
    });
    MaterialService.udateFields();
    this.creatPos = false;
    this.idPosition = position._id;
    this.mod.open();
  }
  onSubmit() {
    this.form.disable();
    if(this.creatPos) {
      let position: Position = {
        name: this.form.value.name,
        cost: this.form.value.cost,
        category: this.categoryId
      };
      this.sub2 = this.positionServ.create(position).subscribe(position => {
          this.positions.push(position);
          this.form.enable();
          this.mod.close();
          MaterialService.toast('Позиция создана!');
        },
        error => {
          this.form.enable();
          this.mod.close();
          MaterialService.toast(error.error.message);
        })
    } else {
      this.sub2 = this.positionServ.update(this.form.value.name, this.form.value.cost, this.idPosition).subscribe((position: Position) => {
        let index = this.positions.findIndex( p => p._id === position._id);
        this.positions[index] = position;
        this.form.enable();
        this.mod.close();
        MaterialService.toast('Позиция изменена!');
      },
        error => {
          this.form.enable();
          this.mod.close();
          MaterialService.toast(error.error.message);
        });
    }
  }
  showDeletePositionWindow(id: string) {
    this.idPosition = id;
    this.mod2.open();
  }
  deletePosition() {
    this.sub3 = this.positionServ.remove(this.idPosition).subscribe((message: Message) => {
        let index = this.positions.findIndex(p => p._id === this.idPosition);
        this.positions.splice(index, 1);
        MaterialService.toast(message.message);
      },
      error => MaterialService.toast(error.error.message));
  }
  ngAfterViewInit() {
    MaterialService.udateFields();
  }
}
