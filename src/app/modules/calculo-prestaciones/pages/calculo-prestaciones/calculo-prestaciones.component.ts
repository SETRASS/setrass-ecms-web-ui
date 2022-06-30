import { Component, Input, OnInit } from '@angular/core';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';

@Component({
  selector: 'app-calculo-prestaciones',
  templateUrl: './calculo-prestaciones.component.html',
  styleUrls: ['./calculo-prestaciones.component.scss']
})
export class CalculoPrestacionesComponent implements OnInit {

  

  constructor(public toolbarService: ToolbarService,
    public calculoPrestacionesService: CalculoPrestacionesService) { }

  ngOnInit(): void {
    

  }



}
