
import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
    // important breakpoints that we care about
  private readonly BREAKPOINTS = {
    sm: '640px',
  }

  private activeMediaQueries: {[key: string]: Observable<boolean>} = {}


  /*
    returns an observable (something we can listen to) in the instance that the document screen size changed.
  */
  mediaQuery(type: 'min' | 'max', breakPoint: keyof typeof this.BREAKPOINTS): Observable<boolean> {

    /*
        params: 
            - we need to specify whether it's min or max because that's what the mq-Text uses which we use in fromEvent.
            - we need a break to be the key in the BREAKPOINTS member.
    */
   
    const mediaId = `${type}-${breakPoint}`;

    // if we already called the mediaQuery with the same params, no need to make multiple observables and make a memory leak.
    if(mediaId in this.activeMediaQueries) {
      return this.activeMediaQueries[mediaId]
    }
    
  
    // dividing our strings to make it cleaner.
    const mqText = `(${type}-width: ${this.BREAKPOINTS[breakPoint]})`;
    const mediaQuery = window.matchMedia(mqText); // this returns something called the MediaQueryList. 
    /*
        mediaQuery is an object that stores info regarding a CSS media query.
    */


        // this is something that has an event, therefore, mediaQuery is called a target. The only event it really has is the 'change' event which is (it is only called if it either the mediaQuery goes from false to true or true to false.  )
    const dynamicMediaQuery = fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
        // piping just changes the obseravle, so now we have a new observable.
      startWith(mediaQuery), // sync emit all values passed to the operator
      map((query: MediaQueryList)=> query.matches)
    )

    this.activeMediaQueries[mediaId] = dynamicMediaQuery;
    return dynamicMediaQuery;
  }
}
