import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AutoAPI, IAutoAPI} from '../../../types/IAutoAPI';
import {ModelAPI} from '../../../types/IModelAPI';
import {AutoService} from '../../../services/auto.service';

@Component({
  selector: 'app-nieuwe-auto',
  templateUrl: './nieuwe-auto.page.html',
  styleUrls: ['./nieuwe-auto.page.scss'],
})
export class NieuweAutoPage implements OnInit {
  inputMerknaam: string;
  inputLand: string;
  modellen: [{}] = [{}];
  inputNaam: string;
  inputPI: number;
  inputPrijs: number;
  inputHandling: number;
  inputBouwjaar: number;
  nieuwModel: ModelAPI = new ModelAPI();
  merkId: string;
  merkNaam: string;
  land: string;
  auto: IAutoAPI;
  alleAutos: IAutoAPI[] = [];
  laatsteAuto: IAutoAPI;

  constructor(public navController: NavController, public http: HttpClient,
              public autoService: AutoService) {
  }

  ngOnInit() {
    this.inputMerknaam = '';
    this.inputLand = '';
    this.modellen = [{}];
  }

  valideerInput(): boolean {
    return (
        this.inputMerknaam !== '' &&
        this.inputLand !== '' &&
        this.inputNaam !== '' &&
        Number(this.inputBouwjaar) &&
        Number(this.inputPI) &&
        Number(this.inputPrijs) &&
        Number(this.inputHandling)) ? true : false;
    // check of de invoervelden ingevuld zijn
  }

  async clickHandler(): Promise<void> {
    if (this.valideerInput()) { // <== ! weghalen
      this.postData(); // eerst een auto met merk + land + lege array modellen
      await this.laadtijdVoorAutos();
      await this.haalAlleAutosOpEnGeefIDLaatsteAutoTerug(); // merkId ophalen, anders wordt merkId niet bij model toegevoegd
      await this.laadtijdVoorAutos(); // tijd geven om laatst aangemaakte auto op te halen
      this.maakNieuwModelAan(); // nieuw model aanmaken
      this.postData2(); // nieuw aangemaakte auto updaten → workaround voor create nieuw model
    } else {
      alert('Vul de invoervelden in!');
    }
  }

  async postData(): Promise<void> {
    await this.http.post<any>('https://azureapi-production.up.railway.app/autos/create',
        {merkNaam: `${this.inputMerknaam}`, land: `${this.inputLand}`}).subscribe();
  }

  async postData2(): Promise<void> {
    await this.http.put<any>(
        `https://azureapi-production.up.railway.app/autos/modellen/update/${this.merkId}`,
        {
          merkNaam: this.merkNaam,
          land: this.land,
          modellen: this.nieuwModel
        }).toPromise()
  }

  async haalAlleAutosOpEnGeefIDLaatsteAutoTerug(): Promise<void> {
    await this.autoService.getAutos().subscribe(autos => this.alleAutos = autos);
    await this.laadtijdVoorAutos();
    console.log(this.alleAutos);
    this.laatsteAuto = this.alleAutos.find((laatsteAuto) => {
      return laatsteAuto.merkNaam === this.inputMerknaam
    });
    let autoModel = new AutoAPI();
    autoModel = {
      _id: this.laatsteAuto._id,
      merkNaam: this.laatsteAuto.merkNaam,
      land: this.laatsteAuto.land,
      modellen: [{
        modelNaam: '',
        PI: 0,
        prijs: 0,
        handling: 0,
        bouwjaar: 0,
        klasse: ''
      }]
    }
    this.merkId = autoModel._id;
  }

  maakNieuwModelAan(): void {
    this.nieuwModel = {
      modelNaam: this.inputNaam,
      merkId: this.merkId,
      handling: this.inputHandling,
      bouwjaar: this.inputBouwjaar,
      prijs: this.inputPrijs,
      klasse: NieuweAutoPage.stelKlasseIn(Number(this.inputPI)),
      PI: this.inputPI
    }
    console.log('input modelNaam = ' + this.nieuwModel.modelNaam);
  }

  static stelKlasseIn(pi: Number): string {
    if (pi <= 300)
      return 'E';
    if (pi <= 400)
      return 'D';
    if (pi <= 500)
      return 'C';
    if (pi <= 600)
      return 'B';
    if (pi <= 700)
      return 'A';
    if (pi <= 800)
      return 'S';
    if (pi <= 900)
      return 'R';
    if (pi <= 990)
      return 'P';
    if (pi <= 990)
      return 'X';
  }

  laadtijdVoorAutos(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }
}
