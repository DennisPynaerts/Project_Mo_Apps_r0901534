import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-nieuw-circuit',
  templateUrl: './nieuw-circuit.page.html',
  styleUrls: ['./nieuw-circuit.page.scss'],
})
export class NieuwCircuitPage implements OnInit {
  naam: string;
  land: string;

  constructor(public navController: NavController) { }

  ngOnInit() {
    this.naam = '';
    this.land = '';
  }

  valideerInput(): boolean {
    const resultaat = (this.naam !== '' && this.land !== '') ? true : false;
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
