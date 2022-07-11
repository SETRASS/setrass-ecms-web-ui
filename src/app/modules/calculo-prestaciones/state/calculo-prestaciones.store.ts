import { Injectable } from '@angular/core';
import { Store, StoreConfig,  ID, EntityStore, EntityState } from '@datorama/akita';
import { CalculoPrestacionesState } from 'src/app/models/calculo-prestaciones.model';

export function createInitialState(): CalculoPrestacionesState {
    return {
        userType: '',
        datosEmpleador: {},
        calculoSalarial: {},
        derechosIndemnizaciones: {},
        otrosDerechos: {}
    }
}

@StoreConfig({ name: 'calculo-salarial' })
export class CalculoPrestacionesStore extends Store<CalculoPrestacionesState> {
  constructor() {
    super(createInitialState());
  } 
}