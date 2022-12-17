import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AutoService} from '../../../../services/auto.service';
import {TrackAPI} from '../../../../types/TrackAPI';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nieuw-model',
  templateUrl: './nieuw-model.page.html',
  styleUrls: ['./nieuw-model.page.scss'],
})
export class NieuwModelPage implements OnInit {
  modelNaam: string;
  PI: number;
  prijs: number;
  klasse: string;
  bouwjaar: number;
  handling: number;
  merk: string;
  merkId: Observable<any>;

  constructor(public navController: NavController, public autoService: AutoService) {

  }

  ngOnInit() {
    this.modelNaam = '';
    this.PI = 0;
    this.prijs = 0;
    this.bouwjaar = 0;
    this.handling = 0;
    this.klasse = '';
    this.merk = '';
  }

  valideerInput(): boolean {
    return (
        this.modelNaam !== '' &&
        this.klasse !== '' &&
        this.merk !== '' &&
        Number(this.prijs) < 5000 &&
        Number(this.PI) < 100 &&
        Number(this.PI) > 999 &&
        Number(this.handling) < 1 &&
        Number(this.handling) > 10 &&
        Number(this.bouwjaar) < 1930 &&
        Number(this.bouwjaar) > new Date().getFullYear()
    );
    // check of de invoervelden ingevuld zijn & conform zijn met de validaties
  }

  clickHandler(): void {
    if (this.valideerInput()) {
      this.setMerkId();

    } else {
      alert('Vul de invoervelden in!');
    }
  }

  setMerkId(): void {
    this.merkId = this.autoService.getMerkIdByName(this.merk);
    console.log(this.merkId);
  }

}
