import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AutoAPI} from '../../../types/AutoAPI';

@Component({
  selector: 'app-nieuwe-auto',
  templateUrl: './nieuwe-auto.page.html',
  styleUrls: ['./nieuwe-auto.page.scss'],
})
export class NieuweAutoPage implements OnInit {
  merkNaam: string;
  land: string;
  modellen: [{}] = [{}];

  constructor(public navController: NavController, public http: HttpClient) { }

  ngOnInit() {
    this.merkNaam = '';
    this.land = '';
    this.modellen = [{}];
  }

  valideerInput(): boolean {
    const resultaat = (this.merkNaam !== '' && this.land !== '') ? true : false;
    return resultaat;
    // check of de invoervelden ingevuld zijn
  }

  clickHandler(): void {
    if (this.valideerInput()) {
      this.postData();
    } else {
      alert('Vul de invoervelden in!');
    }
  }

  async postData(): Promise<void> {
    await this.http.post<any>('https://azureapi-production.up.railway.app/autos/create',

        { merkNaam: `${this.merkNaam}`, land: `${this.land}`}).subscribe();
  }
}
