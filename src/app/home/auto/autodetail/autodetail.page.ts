import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';
import {HttpClient} from '@angular/common/http';
import {AutoService} from '../../../services/auto.service';
import {IAutoAPI} from '../../../types/IAutoAPI';
import {IModelAPI} from '../../../types/IModelAPI';
import {Network} from '@capacitor/network';
import {Haptics} from '@capacitor/haptics';
import {Clipboard} from '@capacitor/clipboard';

@Component({
  selector: 'app-autodetail',
  templateUrl: './autodetail.page.html',
  styleUrls: ['./autodetail.page.scss'],
})
export class AutodetailPage implements OnInit {
  #subscriptions: Subscription[] = [];
  modellen: Observable<IModelAPI[]>;
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  inputNaam: string;
  inputLand: string;
  merkNaam: string;
  land: string;
  auto: IAutoAPI;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modellenService: ModellenService, public http: HttpClient,
              public autoService: AutoService) {
  }

  async ngOnInit() {
    this.haalIdUitRoute();
    await this.haalAutoOp();
    await this.laadAuto();
    await this.haalModellenOp();
    await this.laadAuto();
    this.merkNaam = this.auto.merkNaam;
    this.land = this.auto.land;
  }

  ngOnDestroy() {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
  }

  async haalModellenOp(): Promise<void> {
    this.modellen = this.modellenService.getModellen(this.haalIdUitRoute());
  }

  async haalAutoOp(): Promise<void> {
    await this.autoService.getAutoById(this.haalIdUitRoute()).subscribe(data => {
      this.auto = data;
    });
  }

  haalIdUitRoute(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
    // Haal id op van circuit dat gekozen is op Auto page en return
  }

  valideerInput(): boolean {
    return (this.inputNaam !== '' && this.inputLand !== '') ? true : false;
    // check of de invoervelden ingevuld zijn
  }

  async updateAutoHandler(): Promise<void> {
    if (this.valideerInput()) {
      await this.updateAuto();
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  laadAuto() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  async verwijderenHandler(): Promise<void> {
    await this.http.delete<any>(`https://azureapi-production.up.railway.app/autos/delete/${this.haalIdUitRoute()}`).subscribe();
    // Verwijderen werkt, lijst auto's update nog trager dan lijst circuits na delete actie
  }

  async updateAuto(): Promise<void> {
    await this.http.put<any>(`https://azureapi-production.up.railway.app/autos/update/${this.haalIdUitRoute()}`,
        { merkNaam: `${this.inputNaam}`, land: `${this.inputLand}`}).subscribe();
    // Updaten werkt, lijst auto's update nog trager dan lijst circuits
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
