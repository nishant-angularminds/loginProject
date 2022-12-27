import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalstorageDataService } from './localstorage-data.service';

@Injectable({
  providedIn: 'root',
})
export class HttpinterceptorService implements HttpInterceptor {
  token: any;
  header: { Authorization: string };
  constructor(
    private local1: LocalstorageDataService,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error['error']['code'] == 401) {
      console.log(error['error']['code']);

      this.local1.removeToken();
      // localStorage.clear();
      // this.router.navigateByUrl('/auth/login');
    }

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('tokenList');
    this.header = { Authorization: `Bearer ${this.token}` };
    return next.handle(req.clone({ setHeaders: this.header })).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
}
