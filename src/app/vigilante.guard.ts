import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './service/token.service';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  constructor(private tok:TokenService,private router:Router){}

  redirect(flag:boolean):any{
    if(!flag){
      this.router.navigate(['login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.tok.hayToken()){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
   
  }
  
}
