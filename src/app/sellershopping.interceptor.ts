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
import { ShoppinglocalstorageService } from './shopping/services/shoppinglocalstorage.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class SellershoppingInterceptor implements HttpInterceptor {
  token: any;
  header: { Authorization: string };
  typeData: any;
  toastService: any;

  constructor(
    private local1: SellerlocalstorageapiService,
    private local2: ShoppinglocalstorageService,
    private router: Router,
    private toast:HotToastService
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (this.typeData == 'tokenList') {
      if (error['error']['code'] == 401) {
        this.local1.removeToken();
        this.toast.error('login error');
        this.router.navigateByUrl('/seller/auth/login');
        
      }

      console.log(this.typeData);
    } else {
      if (error['error']['code'] == 401) {
        this.local2.removeToken();
        this.router.navigateByUrl('');
      }

     else if (error['error']['code'] == 400) {

        console.log(error);
        
        alert(error['message']);
        
      }
      
      console.log(this.typeData);
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
    // var type = req.url.includes('.com/shop');
    console.log(req);

    if (req.url.includes('customers') || req.url.includes('.com/shop')) {
      this.token = localStorage.getItem('customerToken');
      this.typeData = 'customerToken';
    } else {
      this.token = localStorage.getItem('tokenList');
      this.typeData = 'tokenList';
    }

    this.header = { Authorization: `Bearer ${this.token}` };

    return next.handle(req.clone({ setHeaders: this.header })).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
}
