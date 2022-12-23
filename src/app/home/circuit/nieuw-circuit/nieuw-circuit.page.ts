import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Haptics} from '@capacitor/haptics';
import {Clipboard} from '@capacitor/clipboard';

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

  async nieuwCircuitHandler(): Promise<void> {
    if (this.valideerInput()) {
      this.maakNieuwCircuitAan();
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  async maakNieuwCircuitAan(): Promise<void> {
    await this.http.post<any>('https://azureapi-production.up.railway.app/tracks/create',

        { naam: `${this.naam}`, land: `${this.land}`}).subscribe();
    await this.navController.back();
  }

  async hapticsVibrate(): Promise<void> {
    await Haptics.vibrate({duration: 500});
  }

  async writeToClipboard(): Promise<void> {
    await Clipboard.write({
      string: await this.checkClipboard()
    });
  }

  async checkClipboard(): Promise<string> {
    const { type, value } = await Clipboard.read();
    if (typeof type === 'string')
      return value;

    console.log(`Got ${type} from clipboard: ${value}`);
    return '';
  }
}
