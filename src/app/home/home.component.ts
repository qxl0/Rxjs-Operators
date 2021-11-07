import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    courses$: Observable<Course[]>;
    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

        const http$ = createHttpObservable('/api/courses');

        this.courses$ = http$.pipe(
          catchError(error => {
            console.log(error);
            return throwError(error);
          }),
          finalize(() => console.log('HTTP request finalized')),
          tap(() => console.log('HTTP request executed')),
          map(res => Object.values(res['payload'])),
          shareReplay()
        ) as any;
    }

    ngOnInit() {
    
    
    this.beginnersCourses$ = this.courses$.pipe(
      map(( courses) => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advancedCourses$ = this.courses$.pipe(
      map((courses) => courses.filter(course => course.category === 'ADVANCED'))
    );
    }

}
