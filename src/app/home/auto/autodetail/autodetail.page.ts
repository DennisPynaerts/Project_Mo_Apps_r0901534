import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';
import {AutoService} from '../../../services/auto.service';
import {IAutoAPI} from '../../../types/IAutoAPI';
import {IModelAPI} from '../../../types/IModelAPI';
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
  fabIsVisible = true;
  inputNaam: string;
  inputLand: string;
  merkNaam: string;
  land: string;
  auto: IAutoAPI;
  merkId: string;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modellenService: ModellenService, public autoService: AutoService) {
  }

  async ngOnInit() {
    this.merkId = this.haalIdUitRoute();
    await this.haalAutoOp();
    await this.laadAuto();
    await this.haalModellenOp();
    await this.laadAuto();
    this.merkNaam = this.auto.merkNaam;
    this.land = this.auto.land;
    this.inputLand = '';
    this.inputNaam = '';
  }

  ngOnDestroy() {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
  }

  async haalModellenOp(): Promise<void> {
    this.modellen = this.modellenService.getModellen(this.merkId);
  }

  async haalAutoOp(): Promise<void> {
    this.#subscriptions.push(this.autoService.getAutoById(this.merkId).subscribe(data => {
      this.auto = data;
    }));
  }

  haalIdUitRoute(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
    // Haal id op van circuit dat gekozen is op Auto page en return
  }

  valideerInput(): boolean {
    return (this.inputNaam !== '' && this.inputLand !== '') ? true : false;
    // check of de invoervelden ingevuld zijn
  }

  async updateAutoHandler(): Promise<void> {
    if (this.valideerInput()) {
      try {
        await this.autoService.updateAutoZonderModellen(this.merkId, this.inputNaam, this.inputLand);
      } catch (e) {
        await this.hapticsVibrate();
        alert('Er is iets mis gegaan bij het verwijderen');
      }
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  laadAuto() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  async autoVerwijderenHandler(): Promise<void> {
    try {
      await this.autoService.verwijderAuto(this.merkId);
    } catch (e) {
      await this.hapticsVibrate();
      alert('Er is iets mis gegaan bij het verwijderen');
    }
    // Verwijderen werkt, lijst auto's update nog trager dan lijst circuits na delete actie
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
    return '';
  }
}
