import { Store, StoreConfig } from "@datorama/akita";

export interface CalculoPrestacionesState {
    userType: '',
    datosEmpleador: {},
    calculoSalarial: {},
    derechosIndemnizaciones: {},
    otrosDerechos: {}
}

export const getInitialState = () => {
    return {
        userType: '',
        datosEmpleador: {},
        calculoSalarial: {},
        derechosIndemnizaciones: {},
        otrosDerechos: {}
    }
}

export class CalculoPrestacionesStore extends Store<CalculoPrestacionesState> {
    
}