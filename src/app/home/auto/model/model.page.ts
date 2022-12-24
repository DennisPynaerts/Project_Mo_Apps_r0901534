import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
  #modellen = this.modellenService.getModellen('');

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute,
              public modellenService: ModellenService) { }

  ngOnInit() {
    this.#modellen = this.modellenService.getModellen(this.haalIdUitRoute());
  }

  haalIdUitRoute(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(id); Haal id op van circuit dat gekozen is op Auto page en return
  }

}
