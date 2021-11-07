import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, merge, Observable, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() 
  {
      of(1, 2, 3, 4, 5).pipe(
        map(n => {
          if (n === 4) {
            throw 'four!';
          }
        return n;
        }),
        catchError(err => of('I', 'II', 'III', 'IV', 'V')),
      )
  .subscribe(x => console.log(x));
  };
  
}



