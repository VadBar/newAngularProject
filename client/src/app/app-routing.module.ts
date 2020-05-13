import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrPageComponent} from './registr-page/registr-page.component';
import {CiteLayoutComponent} from './shared/layouts/cite-layout/cite-layout.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoriesFormComponent} from './categories-page/categories-form/categories-form.component';
import {OrderCategoriesComponent} from './order-page/order-categories/order-categories.component';
import {OrderPositionsComponent} from './order-page/order-positions/order-positions.component';
import {NotFoundComponent} from './not-found/not-found.component';
const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'registr', component: RegistrPageComponent}
  ]},
  {path: '', component: CiteLayoutComponent, canActivate: [AuthGuard], children: [
    {
      path: 'overview', component: OverviewPageComponent
    },
    {
      path: 'analytics', component: AnalyticsPageComponent
    },
    {
      path: 'history', component: HistoryPageComponent
    },
    {
      path: 'order', component: OrderPageComponent, children: [
      {path: '', component: OrderCategoriesComponent},
      {path: ':id', component: OrderPositionsComponent}
    ]
    },
    {
      path: 'categories', component: CategoriesPageComponent
    },
    {path: 'categories/new', component: CategoriesFormComponent},
    {path: 'categories/:id', component: CategoriesFormComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
