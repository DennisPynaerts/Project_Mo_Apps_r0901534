import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-nieuwe-auto',
  templateUrl: './nieuwe-auto.page.html',
  styleUrls: ['./nieuwe-auto.page.scss'],
})
export class NieuweAutoPage implements OnInit {
  merkNaam: string;
  land: string;

  constructor(public navController: NavController) { }

  ngOnInit() {
    this.merkNaam = '';
    this.land = '';
  }

  valideerInput(): boolean {
    const resultaat = (this.merkNaam !== '' && this.land !== '') ? true : false;
    return resultaat;
    // check of de invoervelden ingevuld zijn
  }

  clickHandler(): void {
    if (this.valideerInput()) {

    } else {
      alert('Vul de invoervelden in!');
    }
  }

}
