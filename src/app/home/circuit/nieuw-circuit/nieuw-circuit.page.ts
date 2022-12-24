import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Haptics} from '@capacitor/haptics';
import {Clipboard} from '@capacitor/clipboard';
import {TrackService} from '../../../services/track.service';

@Component({
  selector: 'app-nieuw-circuit',
  templateUrl: './nieuw-circuit.page.html',
  styleUrls: ['./nieuw-circuit.page.scss'],
})
export class NieuwCircuitPage implements OnInit {
  naam: string;
  land: string;

  constructor(public navController: NavController, public trackService: TrackService) { }

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
      try {
        await this.trackService.maakNieuwCircuitAan(this.naam, this.land);
      } catch (e) {
        await this.hapticsVibrate();
        alert('Er is iets mis gegaan bij het aanmaken!');
      }
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
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
