import { AppareilService } from './../services/appareil.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  id: number = 1
  name: string | undefined = 'Appareil'
  status: string | undefined = 'Statut'

  constructor(private appareilService: AppareilService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.name = this.appareilService.getAppareilById(+id)?.name
    this.status = this.appareilService.getAppareilById(+id)?.status
    this.id = id
  }

}
