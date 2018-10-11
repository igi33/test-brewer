import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser =  JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.token) {
      /*
      const data: any = jwt_decode(currentUser.token);
      if (Date.now() / 1000 <= data.exp) {
        return true; // logged in so return true
      }
      */
      return true; // logged in so return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
