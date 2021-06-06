import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false

  lastUpdate = new Date()

  appareils: any[] = [];
  appareilSubscription: Subscription = new Subscription()

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    )
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils
      }
    )
    this.appareilService.emitAppareilSubject()
  }

  onAllumer() {
    this.appareilService.switchOnAll()
  }

  onEteindre() {
    if(confirm("Voulez-vous vraiment tout éteindre ?")) {
      this.appareilService.switchOffAll()
    } else {
      return
    }
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe()
  }

  onSave() {
    this.appareilService.saveAppareilToServer()
  }

  onFetch() {
    this.appareilService.getAppareilFromServer()
  }
}
