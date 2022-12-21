import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.page.html',
  styleUrls: ['./model-detail.page.scss'],
})
export class ModelDetailPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  modelNaam: string;
  PI: number;
  prijs: number;
  handling: number;
  bouwjaar: number;
  klasse: string;

  constructor(public navController: NavController, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setData();
  }

  setData(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    return id;
    // Haal id op van circuit dat gekozen is op Auto page en return
    // 63a2036feab0e3f616b8048f
  }

}
