import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';
import {IModelAPI, ModelAPI} from '../../../types/IModelAPI';
import {IAutoAPI} from '../../../types/IAutoAPI';
import {AutoService} from '../../../services/auto.service';
import {Haptics} from '@capacitor/haptics';
import {Clipboard} from '@capacitor/clipboard';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.page.html',
  styleUrls: ['./model-detail.page.scss'],
})
export class ModelDetailPage implements OnInit {
  model: IModelAPI;
  alleModellen: ModelAPI[] = [];
  modelNaam: string;
  PI: number;
  prijs: number;
  handling: number;
  bouwjaar: number;
  klasse: string;
  inputNaam: string;
  inputPI: number;
  inputPrijs: number;
  inputHandling: number;
  inputBouwjaar: number;
  nieuwModel: ModelAPI = new ModelAPI();
  modelId: string;
  merkId: string;
  merkNaam: string;
  land: string;
  auto: IAutoAPI;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modelService: ModellenService, public autoService: AutoService) { }

  async ngOnInit() {
    this.haalIdsOpUitRoute();
    this.modelId = this.haalIdsOpUitRoute()[0];
    this.merkId = this.haalIdsOpUitRoute()[1];
    await this.haalModelOp();
    await this.haalAlleModellenOp();
    await this.haalAutoOp();
    await this.laadModel();
    await this.vulModelGegevensIn();
    this.nieuwModel = new ModelAPI();
  }

  haalIdsOpUitRoute(): string[] {
    let idArray: string[] = [];
    const id = this.activatedRoute.snapshot.paramMap.get('modelId');
    const merkId = this.activatedRoute.snapshot.paramMap.get('id');
    idArray.push(id, merkId);
    // ik geef merkId + modelId door aan de methode haalModelOp() om het juiste model van een merk op te halen
    return idArray;
  }

  laadModel(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  async haalModelOp(): Promise<void> {
    await this.modelService.getModelById(this.haalIdsOpUitRoute()[0], this.haalIdsOpUitRoute()[1]).subscribe(
        data => { this.model = data; });
  }

  async haalAlleModellenOp(): Promise<void> {
    await this.modelService.getModellen(this.haalIdsOpUitRoute()[1]).subscribe(data => {
      this.alleModellen = data;
    });
  }

  valideerInput(): boolean {
    return (
        this.inputNaam !== '' &&
        Number(this.inputBouwjaar) &&
        Number(this.inputPI) &&
        Number(this.inputPrijs) &&
        Number(this.inputHandling)) &&
        this.inputBouwjaar > 1930 &&
        this.inputBouwjaar < new Date().getFullYear() &&
        this.inputPI > 0 &&
        this.inputPI < 1000 &&
        this.inputHandling < 10 &&
        this.inputPrijs > 0 ? true : false;
    // check of de invoervelden ingevuld zijn en kijk na of de gegevens kloppen
  }

  async haalAutoOp(): Promise<void> {
    await this.autoService.getAutoById(this.merkId).subscribe(data => {
      this.auto = data;
    });
  }

  async modelAanmakenHandler(): Promise<void> {
    if (this.valideerInput()) {
      try {
        this.maakNieuwModelAan();
        await this.autoService.pasAutoAan(this.merkId, this.merkNaam, this.land, this.alleModellen);
      } catch (e) {
        console.log(e);
      }
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  async modelVerwijderenHandler(): Promise<void> {
    try {
      this.haalModelUitArray(this.modelId);
      await this.autoService.pasAutoAan(this.merkId, this.merkNaam, this.land, this.alleModellen);
    } catch (e) {
      await this.hapticsVibrate();
      alert('Er is iets mis gegaan!');
      console.log(e);
    }
  }

  async modelAanpassenHandler(): Promise<void> {
    if (this.valideerInput()) {
      try {
        this.pasModelAan();
        await this.autoService.pasAutoAan(this.merkId, this.merkNaam, this.land, this.alleModellen);
      } catch (e) {
        console.log(e);
      }
    } else {
      await this.hapticsVibrate();
      alert('Vul de invoervelden in!');
    }
  }

  haalModelUitArray(id: string): void {
    let index = this.alleModellen.findIndex(model => model._id === id);
    this.alleModellen.splice(index, 1);
  }

  pasModelAan(): void {
    this.haalModelUitArray(this.modelId);
    // Zoek model in array via id en haal het uit array

    this.nieuwModel = {
      modelNaam: this.inputNaam,
      merkId: this.merkId,
      handling: this.inputHandling,
      bouwjaar: this.inputBouwjaar,
      prijs: this.inputPrijs,
      klasse: this.stelKlasseIn(Number(this.inputPI)),
      PI: this.inputPI
    }
    this.alleModellen.push(this.nieuwModel);
    // maak nieuw model aan en voeg toe aan array
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
    this.alleModellen.push(this.nieuwModel);
  }

  async vulModelGegevensIn(): Promise<void> {
    this.modelNaam = this.model.modelNaam;
    this.PI = this.model.PI;
    this.prijs = this.model.prijs;
    this.bouwjaar = this.model.bouwjaar;
    this.handling = this.model.handling;
    this.klasse = this.model.klasse;
    this.merkNaam = this.auto.merkNaam;
    this.land = this.auto.land;
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
