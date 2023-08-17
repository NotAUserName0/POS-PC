import { Pipe, PipeTransform } from '@angular/core';
import { Insumo } from '../models/insumo.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(elementos: Insumo[], pages:number): Insumo[] {
    return elementos?.slice(pages,pages+8);
  }

}
