import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from "./auth.service";


@Injectable()
export class SignInGuard implements CanActivate {
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
       let authService = inject(AuthService)
       return signInWithEmailAndPassword(authService.auth, authService.getEmail(), authService.getPassword())
        .then(userCreds => {
            return true;
        })
        .catch(e => {
            console.error("Error", e)
            return false;
        })
    }
    
}