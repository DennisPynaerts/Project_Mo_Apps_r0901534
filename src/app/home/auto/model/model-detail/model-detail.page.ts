import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.page.html',
  styleUrls: ['./model-detail.page.scss'],
})
export class ModelDetailPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  modelNaam: string;
  PI: number;
  prijs: number;
  handling: number;
  bouwjaar: number;
  klasse: string;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setData();
    this.laadModel();
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('modelNaam');
    // workaround modelNaam gebruiken ipv id om data op te halen
    console.log(id);
    return id;
  }

  laadModel() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }


}
