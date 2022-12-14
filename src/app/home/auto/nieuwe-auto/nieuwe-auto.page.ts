import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AutoAPI, IAutoAPI} from '../../../types/IAutoAPI';
import {ModelAPI} from '../../../types/IModelAPI';
import {AutoService} from '../../../services/auto.service';
import {Haptics} from '@capacitor/haptics';

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

  constructor(public navController: NavController, public autoService: AutoService) {
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
        Number(this.inputHandling)) &&
        this.inputBouwjaar > 1930 &&
        this.inputBouwjaar <= new Date().getFullYear() &&
        this.inputPI > 0 &&
        this.inputPI < 1000 &&
        this.inputHandling < 10 &&
        this.inputPrijs > 0 ? true : false;
    // check of de invoervelden ingevuld zijn en kijk na of de gegevens kloppen
  }

  async nieuweAutoHandler(): Promise<void> {
    if (this.valideerInput()) {
      await this.autoService.maakInitieleAutoAanZonderModellen(this.inputMerknaam, this.inputLand);
      // this.maakInitieleAutoAanZonderModellen(); // eerst een auto met merk + land + lege array modellen
      await this.laadtijdVoorAutos();
      await this.haalAlleAutosOpEnGeefIDLaatsteAutoTerug(); // merkId ophalen, anders wordt merkId niet bij model toegevoegd
      await this.laadtijdVoorAutos(); // tijd geven om laatst aangemaakte auto op te halen
      this.maakNieuwModelAan(); // nieuw model aanmaken
      await this.autoService.updateNieuwAangemaakteAutoEnVoegModelToe(this.merkId, this.inputMerknaam, this.inputLand, this.nieuwModel);
      // this.updateNieuwAangemaakteAutoEnVoegModelToe(); // nieuw aangemaakte auto updaten ??? workaround voor create nieuw model
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  async haalAlleAutosOpEnGeefIDLaatsteAutoTerug(): Promise<void> {
    await this.autoService.getAutos().subscribe(autos => this.alleAutos = autos);
    await this.laadtijdVoorAutos();
    this.laatsteAuto = this.alleAutos.find((laatsteAuto) => {
      return laatsteAuto.merkNaam === this.inputMerknaam
    });
    let nieuweAuto = new AutoAPI();
    nieuweAuto = {
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
    this.merkId = nieuweAuto._id;
  }

  maakNieuwModelAan(): void {
    this.nieuwModel = {
      modelNaam: this.inputNaam,
      merkId: this.merkId,
      handling: this.inputHandling,
      bouwjaar: this.inputBouwjaar,
      prijs: this.inputPrijs,
      klasse: this.stelKlasseIn(Number(this.inputPI)),
      PI: this.inputPI
    }
  }

  stelKlasseIn(pi: Number): string {
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

  async hapticsVibrate(): Promise<void> {
    await Haptics.vibrate({duration: 500});
  }
}
