import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-nieuw-circuit',
  templateUrl: './nieuw-circuit.page.html',
  styleUrls: ['./nieuw-circuit.page.scss'],
})
export class NieuwCircuitPage implements OnInit {
  naam: string;
  land: string;

  constructor(public navController: NavController, private http: HttpClient) { }

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
      this.postData();
    } else {
      alert('Vul de invoervelden in!');
    }
  }

  async postData(): Promise<void> {
    await this.http.post<any>('https://azureapi-production.up.railway.app/tracks/create',

        { naam: `${this.naam}`, land: `${this.land}`}).subscribe();
  }

}
