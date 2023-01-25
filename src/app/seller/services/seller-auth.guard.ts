import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate {

  constructor(private routerObject:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var statusLocal = localStorage.getItem('tokenList');

      if (statusLocal == null) {
        this.routerObject.navigateByUrl('/seller/auth/login');
  
        return false;
      } else {
        return true;
      }  }
  
}

@Injectable({
  providedIn: 'root',
})
export class SellerRAuthGuard implements CanActivate {
  constructor(private router2: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var tokenDemo = localStorage.getItem('tokenList');

    if (tokenDemo == null) {
      return true;
    } else {
      this.router2.navigateByUrl('/seller/home');
      return false;
    }
  }
}
