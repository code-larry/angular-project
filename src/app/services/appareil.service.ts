import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>()

  private appareils: any[] = []

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice())
  }

  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé'
    }
  }

  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status ='éteint'
    }
    this.emitAppareilSubject()
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé'
    this.emitAppareilSubject()
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint'
    this.emitAppareilSubject()
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id
      }
    )
    return appareil
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    }

    appareilObject.name = name
    appareilObject.status = status
    appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1
    this.appareils.push(appareilObject)
    this.emitAppareilSubject
  }

  saveAppareilToServer() {
    this.httpClient
      .put('https://fir-angular-16965-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      )
  }

  getAppareilFromServer() {
    this.httpClient
      .get<any[]>('https://fir-angular-16965-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response
          this.emitAppareilSubject()
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      )
  }
}
