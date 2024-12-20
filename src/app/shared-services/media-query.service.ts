
import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith, Subject, BehaviorSubject } from 'rxjs';
import { MediaQuery } from '../shared-interfaces/media-query.interface';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
    // important breakpoints that we care about

    viewports: BehaviorSubject<MediaQuery> = new BehaviorSubject<MediaQuery>({
      isDesktop: false,
      isTablet: false,
      isMobile: false
    }) 
  

  
      
  private readonly BREAKPOINTS = {
    lg: '1200px',
    md: '768px',
    sm: '0px',
  }

  private activeMediaQueries: {[key: string]: Observable<boolean>} = {}


  
  mediaQuery(type: 'min' | 'max', breakPoint: keyof typeof this.BREAKPOINTS): Observable<boolean> {

   

    
   
    const mediaId = `${type}-${breakPoint}`;

    if(mediaId in this.activeMediaQueries) {
      return this.activeMediaQueries[mediaId]
    }
    
  
    const mqText = `(${type}-width: ${this.BREAKPOINTS[breakPoint]})`;
    const mediaQuery = window.matchMedia(mqText); // this returns something called the MediaQueryList. 
    


    const dynamicMediaQuery = fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery), // sync emit all values passed to the operator
      map((query: MediaQueryList)=> query.matches)
    )

    this.activeMediaQueries[mediaId] = dynamicMediaQuery;
    return dynamicMediaQuery;
  }

  
  
  }


