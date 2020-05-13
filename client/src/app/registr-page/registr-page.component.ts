import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-registr-page',
  templateUrl: './registr-page.component.html',
  styleUrls: ['./registr-page.component.css']
})
export class RegistrPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub1: Subscription;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute,private title: Title) {
    title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
 onSubmit() {
    this.form.disable();
    this.sub1 = this.auth.registr(this.form.value).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams:{
          registred: true
        }
      });
    }, error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    });
 }
 ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
 }
}
