import {User} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  constructor(private http: HttpClient) {}
  registr(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/registration', user);
  }
  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
           localStorage.setItem('auth-token', token);
           this.token = token;
        })
      );
  }
  getToken() {
    return this.token;
  }
  setToken(token: string) {
    this.token = token;
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }
  logout() {
    this.token = null;
    localStorage.clear();
  }
}
