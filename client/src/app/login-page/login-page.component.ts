import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {MaterialService} from "../shared/classes/material.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private title: Title) {
    title.setTitle('Авторизация');
  }
  form: FormGroup;
  sub1: Subscription;
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registr']) {
        MaterialService.toast('Вы успешно зарегестрировались!');
      } else if (params['accessDenid']) {
        MaterialService.toast('Для доступа необходимо авторизироваться!');
      } else if(params['sessionFinished']) {
        MaterialService.toast('Вам снова необходимо авторизироваться!');
      }
    });
  }
 onSubmit() {
   this.form.disable();
   this.sub1 = this.auth.login(this.form.value).subscribe(() => {
     this.router.navigate(['/overview']);
   }, error => {
     MaterialService.toast(error.error.message);
     this.form.enable();
   })
 }
 ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
 }
}
