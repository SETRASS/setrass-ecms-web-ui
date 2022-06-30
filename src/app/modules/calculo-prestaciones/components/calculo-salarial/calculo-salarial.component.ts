import { Component, OnInit } from '@angular/core';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

@Component({
  selector: 'app-calculo-salarial',
  templateUrl: './calculo-salarial.component.html',
  styleUrls: ['./calculo-salarial.component.scss']
})
export class CalculoSalarialComponent implements OnInit {

  data: any;

  constructor(private calculoPrestacionesService: CalculoPrestacionesService) {

   }

  ngOnInit(): void {
    this.data = this.calculoPrestacionesService.objectGlobal;
  }

}
