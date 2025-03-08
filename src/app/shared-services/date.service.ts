import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DateService {
    private called = false
    private dateMap = new Map()
    getDateMap() {
        if (!this.called) {
            this.dateMap.set('jan', 0)
            this.dateMap.set('feb', 1)
            this.dateMap.set('march', 2)
            this.dateMap.set('april', 3)
            this.dateMap.set('may', 4)
            this.dateMap.set('june', 5)
            this.dateMap.set('july', 6)
            this.dateMap.set('aug', 7)
            this.dateMap.set('sept', 8)
            this.dateMap.set('oct', 9)
            this.dateMap.set('nov', 10)
            this.dateMap.set('dec', 11)
        }
        this.called = true
        return this.dateMap
    }
}