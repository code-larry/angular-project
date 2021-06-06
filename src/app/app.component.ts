import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number = 0
  counterSubscription: Subscription = new Subscription;

  constructor() {}

  ngOnInit() {
    const counter = Observable.interval(1000)

    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value
      },
      (error) => {
        console.log('Uh-ih, an error occurred : ' + error);
      },
      () => {
        console.log('Observable complete !');
      }
    )
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe()
  }

}
