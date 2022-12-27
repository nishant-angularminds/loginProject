import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiInfoService } from './services/api-info.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private p: ApiInfoService, private router1: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var statusLocal = localStorage.getItem('tokenList');

    if (statusLocal == null) {
      this.router1.navigateByUrl('/auth/login');

      return false;
    }
  
    else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class RegisterAuthGuard implements CanActivate {
  constructor(private p1: ApiInfoService, private router2: Router) {}

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
      this.router2.navigateByUrl('/home');
      return false;
    }
  }
}
