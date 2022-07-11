import { Injectable } from '@angular/core';
import { CalculoPrestacionesStore, CalculoPrestacionesState } from './calculo-prestaciones.store';
import { QueryEntity } from '@datorama/akita';


@Injectable({
  providedIn: 'root'
})
export class CourseQuery extends QueryEntity<CourseState> {

  selectAreCoursesLoaded$ = this.select(state => {
    return state.areCoursesLoaded;
  });

  constructor(protected store: CourseStore) {
    super(store);
  }
}