import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserAuthenticationService } from "./user-authentication.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private userauth:UserAuthenticationService, private router: Router)
    {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    {

            if(this.userauth.isAuthenticated())
            {
                return true;
            }
            else
            {
                this.router.navigate(['/'])
                return false;
            }
    }

}