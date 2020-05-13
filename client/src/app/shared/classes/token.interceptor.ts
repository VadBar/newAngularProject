import {AuthService} from "../services/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.tokenFinishedWork(error)
      )
    )
  }
  private tokenFinishedWork(error: HttpErrorResponse): Observable<any> {
     if(error.status === 401) {
       this.router.navigate(['/login'], {
         queryParams: {
           sessionFinished: true
         }
       })
     }
     return throwError(error)
  }
  constructor(private auth: AuthService, private router: Router) {}
}
