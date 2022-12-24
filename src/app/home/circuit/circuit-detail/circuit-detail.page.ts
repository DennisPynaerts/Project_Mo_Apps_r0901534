import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../../services/track.service';
import {ITrackAPI} from '../../../types/TrackAPI';
import {Clipboard} from '@capacitor/clipboard';
import {Capacitor} from '@capacitor/core';
import {Haptics} from '@capacitor/haptics';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.page.html',
  styleUrls: ['./circuit-detail.page.scss'],
})
export class CircuitDetailPage implements OnInit {
  id: string = undefined;
  track: ITrackAPI;
  naam: string;
  land: string;
  inputNaam: string;
  inputLand: string;
  circuitId: string;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public trackService: TrackService) {
  }

  async ngOnInit() {
    isNative: Capacitor.isNativePlatform();
    this.circuitId = this.haalIdsOp();
    await this.haalTrackOp();
    await this.laadTrack(); // extra tijd geven om track binnen te halen, ging te snel
    this.naam = this.track.naam;
    this.land = this.track.land;
    this.inputNaam = '';
    this.inputLand = '';
    await this.checkClipboard();
  }

  async haalTrackOp(): Promise<void> {
    await this.trackService.getTrackById(this.circuitId).subscribe(data => {
      this.track = data;
    });
  }

  haalIdsOp(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
    // Haal id op van circuit dat gekozen is op Circuit page en return
  }

  laadTrack() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  valideerInput(): boolean {
    return this.inputNaam !== '' && this.inputLand !== '';
    // check of de invoervelden ingevuld zijn
  }

  async circuitAanpassenHandler(): Promise<void> {
    if (this.valideerInput()) {
      try {
        await this.trackService.updateCircuit(this.circuitId, this.inputNaam, this.inputLand);
      } catch (e) {
        await this.hapticsVibrate();
        alert('Er is iets mis gegaan bij het aanpassen!');
      }
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  async verwijderenHandler(): Promise<void> {
    try {
      await this.trackService.verwijderCircuit(this.circuitId);
      await this.navController.back();
    } catch (e) {
      await this.hapticsVibrate();
      alert('Er is iets mis gegaan bij het verwijderen!');
    }
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

    return '';
  }

  async hapticsVibrate(): Promise<void> {
    await Haptics.vibrate({duration: 500});
  }
}
