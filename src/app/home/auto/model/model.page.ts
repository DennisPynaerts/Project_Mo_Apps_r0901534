import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
  #subscriptions: Subscription[] = [];
  #modellen = this.modellenService.getModellen('');

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute, public modellenService: ModellenService) {


  }

  ngOnInit() {
    this.#modellen = this.modellenService.getModellen(this.setData());
  }

  ngOnDestroy() {
    this.#subscriptions.forEach(sub => sub.unsubscribe());
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id;
    //console.log(id); Haal id op van circuit dat gekozen is op Auto page en return
  }

}
