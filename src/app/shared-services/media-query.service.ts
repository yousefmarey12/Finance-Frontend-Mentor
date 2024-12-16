
import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith, Subject } from 'rxjs';
import { MediaQuery } from '../shared-interfaces/media-query.interface';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
    // important breakpoints that we care about

    viewports: Subject<MediaQuery> = new Subject<MediaQuery>() 
  

  
      
  private readonly BREAKPOINTS = {
    lg: '1440px',
    md: '768px',
    sm: '0px',
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

  setViewPort() {
    this.mediaQuery('min', 'sm').pipe(map(
      matches => {
        if (matches)  {
          return this.mediaQuery('max', 'md')
        }
        else {
          return false;
        }
      }
     )).subscribe((matches) => {
      if (matches) {
       this.viewports.next({
        isMobile: true,
        isTablet: false,
        isDesktop: false
       })
 
      }
     })
   
     this.mediaQuery('min', 'md').pipe(map(
      matches => {
        console.log("matches is")
        console.log(matches)
        if (matches) {
          return this.mediaQuery('max', 'lg')
        } 
        else {
          return false;
        }
      }
     )).subscribe((matches) => {
      if (matches) {
        this.viewports.next({
          isMobile: false,
          isTablet: true,
          isDesktop: false
         })
      
      }
      else {
        this.viewports.next({
          isMobile: true,
          isTablet: false,
          isDesktop: false
         })
      }

     })
    
     this.mediaQuery('min', 'lg').subscribe((matches) => {
      if (matches) {
        this.viewports.next({
          isMobile: false,
          isTablet: false,
          isDesktop: true
         })
      }
     
     })
     
    }
  
  }


