import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../../services/modellen.service';
import {IModelAPI, ModelAPI} from '../../../../types/IModelAPI';
import {HttpClient} from '@angular/common/http';
import {AutoAPI} from '../../../../types/AutoAPI';
import {AutoService} from '../../../../services/auto.service';

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
  inputKlasse: string;
  nieuwModel: ModelAPI = new ModelAPI();
  modelId: string;
  merkId: string;
  merkNaam: string;
  land: string;
  auto: AutoAPI;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modelService: ModellenService, public autoService: AutoService,
              public http: HttpClient) { }

  async ngOnInit() {
    this.haalIdsOp();
    this.modelId = this.haalIdsOp()[0];
    this.merkId = this.haalIdsOp()[1];
    await this.haalModelOp();
    await this.laadModel();
    await this.haalAlleModellenOp();
    await this.laadModel();
    await this.haalAutoOp();
    await this.laadModel();
    await this.vulModelGegevensIn();
    this.nieuwModel = new ModelAPI();
  }

  haalIdsOp(): string[] {
    let idArray: string[] = [];
    const id = this.activatedRoute.snapshot.paramMap.get('modelId');
    const merkId = this.activatedRoute.snapshot.paramMap.get('id');
    idArray.push(id, merkId);
    // console.log('modelID ' + id + ' merkID ' + merkId);
    // ik geef merkId + modelId door aan de methode haalModelOp() om het juiste model van een merk op te halen
    return idArray;
  }

  laadModel(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
    // API is soms wat traag, laat geen data zien zonder extra laadtijd
  }

  async haalModelOp(): Promise<void> {
    await this.modelService.getModelById(this.haalIdsOp()[0], this.haalIdsOp()[1]).subscribe(data => {
      this.model = data;
    });
  }

  async haalAlleModellenOp(): Promise<void> {
    await this.modelService.getModellen(this.haalIdsOp()[1]).subscribe(data => {
      this.alleModellen = data;
    });
  }

  valideerInput(): boolean {
    return (
        this.inputNaam !== '' &&
        this.inputKlasse !== '' &&
        Number(this.inputBouwjaar) &&
        Number(this.inputPI) &&
        Number(this.inputPrijs) &&
        Number(this.inputHandling)) ? true : false;
    // check of de invoervelden ingevuld zijn
  }

  async postData(): Promise<void> {
    await this.http.put<any>(
        `https://azureapi-production.up.railway.app/autos/modellen/update/${this.auto._id}`,
        {
          merkNaam: this.merkNaam,
          land: this.land,
          modellen: this.alleModellen
        }
    ).toPromise()
  }

  async haalAutoOp(): Promise<void> {
    await this.autoService.getAutoById(this.merkId).subscribe(data => {
      this.auto = data;
    });
  }

  async modelAanmakenHandler(): Promise<void> {
    if (this.valideerInput()) {
      console.log('validatie check: ' + this.valideerInput());
      console.log('merknaam: ' + this.merkNaam);
      console.log('land: ' + this.land);

      try {
        this.maakNieuwModelAan();
        console.log('nieuw model modelnaam: ' + this.nieuwModel.modelNaam);
        console.log('alle modellen: ' + this.alleModellen[0]);
        await this.postData();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Vul de invoervelden in!'); // werkt dit native?
    }
  }

  async verwijderenHandler(): Promise<void> {
    await this.http.delete<any>(
        `https://azureapi-production.up.railway.app/autos/delete/${this.haalIdsOp()}`).subscribe();
    await this.navController.back();
    // Verwijderen werkt, lijst auto's update nog trager dan lijst circuits na delete actie
  }

  maakNieuwModelAan(): void {
    this.nieuwModel = {
      // _id: (this.alleModellen.length + 1).toString(), // al '' & undefined geprobeerd + _id staat nullable nu
      modelNaam: this.inputNaam,
      merkId: this.merkId,
      handling: this.inputHandling,
      bouwjaar: this.inputBouwjaar,
      prijs: this.inputPrijs,
      klasse: this.stelKlasseIn(Number(this.inputPI)),
      PI: this.inputPI
    }
    console.log('input modelNaam = ' + this.nieuwModel.modelNaam);
    this.alleModellen.push(this.nieuwModel);
    // console.log(this.alleModellen[0]);
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
}
