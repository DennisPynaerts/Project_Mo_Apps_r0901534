import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AutoService} from '../../services/auto.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {
  verticalFabPosition: ('bottom' | 'top') = 'bottom';
  fabIsVisible = true;
  autos = this.autoService.getAutos();


  constructor(public navController: NavController, public autoService: AutoService) { }

  ngOnInit() {
  // console.log(this.autos);
  }

}
