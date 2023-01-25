import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustAuthGuard implements CanActivate {

  constructor(private router2: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var tokenDemo = localStorage.getItem('customerToken');

      if (tokenDemo == null) {
        return true;
      } else {
        this.router2.navigateByUrl('');
        return false;
      }  }
  
}


@Injectable({
  providedIn: 'root',
})
export class CustProfileAuth implements CanActivate {
  constructor(private router2: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var tokenDemo = localStorage.getItem('customerToken');

    if (tokenDemo == null) {
      this.router2.navigateByUrl('');

      return false;

    } else {

      // this.router2.navigateByUrl('/customer-profile');

      return true;
    }
  }
}
