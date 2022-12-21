import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../../services/modellen.service';
import {IModelAPI} from '../../../../types/IModelAPI';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.page.html',
  styleUrls: ['./model-detail.page.scss'],
})
export class ModelDetailPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  model: IModelAPI;
  modelNaam: string;
  PI: number;
  prijs: number;
  handling: number;
  bouwjaar: number;
  klasse: string;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modelService: ModellenService) { }

  async ngOnInit() {
    this.setData();
    await this.haalModelOp();
    await this.laadModel();
    this.modelNaam = this.model.modelNaam;
    this.PI = this.model.PI;
    this.prijs = this.model.prijs;
    this.bouwjaar = this.model.bouwjaar;
    this.handling = this.model.handling;
    this.klasse = this.model.klasse;
  }

  setData(): string[] {
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
    await this.modelService.getModelById(this.setData()[0], this.setData()[1]).subscribe(data => {
      this.model = data;
    });
  }


}
