import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';
import {HttpClient} from '@angular/common/http';
import {AutoService} from '../../../services/auto.service';
import {IAutoAPI} from '../../../types/IAutoAPI';
import {IModelAPI} from '../../../types/IModelAPI';

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
    this.setData();
    await this.haalAutoOp();
    await this.laadAuto();
    await this.haalModellenOp();
    await this.laadAuto();
    this.merkNaam = this.auto.merkNaam;
    this.land = this.auto.land;
    // console.log(this.modellen);
  }

  ngOnDestroy() {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
  }

  async haalModellenOp(): Promise<void> {
    this.modellen = this.modellenService.getModellen(this.setData());
  }

  async haalAutoOp(): Promise<void> {
    await this.autoService.getAutoById(this.setData()).subscribe(data => {
      this.auto = data;
    });
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
    // Haal id op van circuit dat gekozen is op Auto page en return
  }

  valideerInput(): boolean {
    const resultaat = (this.inputNaam !== '' && this.inputLand !== '') ? true : false;
    return resultaat;
    // check of de invoervelden ingevuld zijn
  }

  async clickHandler(): Promise<void> {
    if (this.valideerInput()) {
      await this.postData();
    } else {
      alert('Vul de invoervelden in!'); // werkt dit native?
    }
  }

  laadAuto() {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  async verwijderenHandler(): Promise<void> {
    await this.http.delete<any>(`https://azureapi-production.up.railway.app/autos/delete/${this.setData()}`).subscribe();
    await this.navController.back();
    // Verwijderen werkt, lijst auto's update nog trager dan lijst circuits na delete actie
  }

  async postData(): Promise<void> {
    await this.http.put<any>(`https://azureapi-production.up.railway.app/autos/update/${this.setData()}`,
        { merkNaam: `${this.inputNaam}`, land: `${this.inputLand}`}).subscribe();
    // Updaten werkt, lijst auto's update nog trager dan lijst circuits na delete actie
  }

}
