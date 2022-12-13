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
import { DataInfoService } from './data-info.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private p: DataInfoService, private router1: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var statusLocal = JSON.parse(localStorage.getItem('loginUser')!);
    console.log(statusLocal);

    if (statusLocal == null) {
      this.router1.navigateByUrl('');
      return false;
    } else {
      // this.router1.navigateByUrl('home/profile');
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class RegisterAuthGuard implements CanActivate {
  constructor(private p1: DataInfoService, private router2: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var statusLocal = JSON.parse(localStorage.getItem('loginUser')!);
    console.log(statusLocal);

    if (statusLocal == null) {
      return true;
    } else {
      this.router2.navigateByUrl('home/profile');
      return false;
    }
  }
}
