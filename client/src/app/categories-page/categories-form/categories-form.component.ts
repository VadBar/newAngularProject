import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {of, Subscription} from "rxjs";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {Category, Message} from "../../shared/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  constructor(private category: CategoryService, private route: ActivatedRoute, private router: Router) { }
  form: FormGroup;
  image: File;
  previewInf: string;
  cat: Category;
  mod: MaterialInstance;
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('input') input: ElementRef;
  ngOnInit() {
    this. mod = MaterialService.modalWindow(this.modal);
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.sub = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this.category.getById(params['id']);
            }
            return of(null);
          }
        )
      ).subscribe(
        category => {
          if (category) {
            this.cat = category;
            this.form.patchValue({
              name: category.name
            });
            this.previewInf = category.imageSrc;
          }
          MaterialService.udateFields();
        },
      error => MaterialService.toast(error.error.message)
    );
  }
  callInput() {
    this.input.nativeElement.click();
  }
  uploadFile(event: any) {
    this.image = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.previewInf = reader.result;
    };
    reader.readAsDataURL(this.image);
  }
  showModal() {
    this.mod.open();
  }
  closeModal() {
    this.mod.close();
  }
  deleteCategory() {
    this.sub3 = this.category.remove(this.cat._id).subscribe((message: Message) => {
      this.router.navigate(['/categories']);
      MaterialService.toast(message.message);
    });
  }
  ngOnDestroy() {
    this.mod.destroy();
    this.sub.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }
  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.cat) {
      obs$ = this.category.update(this.cat._id, this.form.value.name, this.image);
    } else {
      obs$ = this.category.create(this.form.value.name, this.image);
    }
    this.sub2 = obs$.subscribe(category => {
      this.cat = category;
      this.form.enable();
      MaterialService.toast('Данные внесены!');
    },
    error => {
      this.form.enable();
      MaterialService.toast(error.error.message);
    });
  }
}
