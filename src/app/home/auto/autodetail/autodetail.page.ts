import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ModellenService} from '../../../services/modellen.service';

@Component({
  selector: 'app-autodetail',
  templateUrl: './autodetail.page.html',
  styleUrls: ['./autodetail.page.scss'],
})
export class AutodetailPage implements OnInit {
  #subscriptions: Subscription[] = [];
  #modellen = this.modellenService.getModellen('');
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute, public modellenService: ModellenService) {


  }

  ngOnInit() {
    this.setData();
    this.#modellen = this.modellenService.getModellen(this.setData());
    console.log(this.setData());
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
