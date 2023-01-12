import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SellerlocalstorageapiService } from './seller/services/sellerlocalstorageapi.service';
import { Router } from '@angular/router';

@Injectable()
export class SellershoppingInterceptor implements HttpInterceptor {
  token: any;
  header: { Authorization: string };

  constructor(
    private local1: SellerlocalstorageapiService,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error['error']['code'] == 401) {
      this.local1.removeToken();
      this.router.navigateByUrl('/seller/auth/login');
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
