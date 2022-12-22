import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../../services/track.service';
import {ITrackAPI} from '../../../types/TrackAPI';
import {HttpClient} from '@angular/common/http';
import {Clipboard} from '@capacitor/clipboard';
import {Capacitor} from '@capacitor/core';

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

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public trackService: TrackService, private http: HttpClient) {
  }

  async ngOnInit() {
    isNative: Capacitor.isNativePlatform();
    this.haalIdsOp();
    await this.haalTrackOp();
    await this.laadTrack(); // extra tijd geven om track binnen te halen, ging te snel
    this.naam = this.track.naam;
    this.land = this.track.land;
    this.inputNaam = '';
    this.inputLand = '';
    await this.checkClipboard();
  }

  async haalTrackOp(): Promise<void> {
    await this.trackService.getTrackById(this.haalIdsOp()).subscribe(data => {
      this.track = data;
    });
  }

  haalIdsOp(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
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

  async clickHandler(): Promise<void> {
    console.log(this.valideerInput());
    if (this.valideerInput()) {
      this.postData();
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!'); // werkt dit native?
    }
  }

  async verwijderenHandler(): Promise<void> {
    await this.http.delete<any>(`https://azureapi-production.up.railway.app/tracks/delete/${this.haalIdsOp()}`).subscribe();
    await this.navController.back();
  }

  async postData(): Promise<void> {
    await this.http.put<any>(`https://azureapi-production.up.railway.app/tracks/update/${this.haalIdsOp()}`,
        { naam: `${this.inputNaam}`, land: `${this.inputLand}`}).subscribe();
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

  async hapticsVibrate(): Promise<void> {
    console.log('vibrate');
    await this.hapticsVibrate();
  }

}
