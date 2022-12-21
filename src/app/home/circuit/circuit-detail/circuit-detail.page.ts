import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../../services/track.service';
import {ITrackAPI, TrackAPI} from '../../../types/TrackAPI';
import {HttpClient} from '@angular/common/http';

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

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute, public trackService: TrackService, private http: HttpClient) {
  }

  async ngOnInit() {
    this.setData();
    await this.haalTrackOp();
    await this.laadTrack(); // extra tijd geven om track binnen te halen, ging te snel
    this.naam = this.track.naam;
    this.land = this.track.land;
  }

  async haalTrackOp(): Promise<void> {
    await this.trackService.getTrackById(this.setData()).subscribe(data => {
      this.track = data;
    });
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
    // Haal id op van circuit dat gekozen is op Circuit page en return
  }

  laadTrack() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  valideerInput(): boolean {
    const resultaat = (this.inputNaam !== '' && this.inputLand !== '') ? true : false;
    return resultaat;
    // check of de invoervelden ingevuld zijn
  }

  clickHandler(): void {
    if (this.valideerInput()) {
      this.postData();
    } else {
      alert('Vul de invoervelden in!'); // werkt dit native?
    }
  }

  async verwijderenHandler(): Promise<void> {
    await this.http.delete<any>(`https://azureapi-production.up.railway.app/tracks/delete/${this.setData()}`).subscribe();
    await this.navController.back();
  }

  async postData(): Promise<void> {
    await this.http.put<any>(`https://azureapi-production.up.railway.app/tracks/update/${this.setData()}`,
        { naam: `${this.inputNaam}`, land: `${this.inputLand}`}).subscribe();
  }

}
