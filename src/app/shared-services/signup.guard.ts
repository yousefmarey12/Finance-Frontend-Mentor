import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService, auth } from "./auth.service";


@Injectable()
export class SignUpGuard implements CanActivate {
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
       let authService = inject(AuthService)
       return createUserWithEmailAndPassword(auth, authService.getEmail(), authService.getPassword())
        .then(userCreds => {
            return true;
        })
        .catch(e => {
            return false;
        })
    }
    
}