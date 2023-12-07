import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthenticationService } from "./user-authentication.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor
{
    constructor(private authservice: UserAuthenticationService)
    {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const authToken = this.authservice.getToken()
       const authRequest = req.clone({
        headers: req.headers.set('Authorization',"Bearer " + authToken)
       })
       return next.handle(authRequest)
    }
}