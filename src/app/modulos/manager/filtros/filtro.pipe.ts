import { Pipe, PipeTransform } from '@angular/core';
import { Insumo } from '../models/insumo.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(elementos: Insumo[], pages:number, search:string): Insumo[] {
    if(search.length === 0){
      return elementos?.slice(pages,pages+8);
    }
    const insumoFiltered = elementos.filter(elemento => elemento.nombre.toLowerCase().startsWith(search.toLowerCase()))
    return insumoFiltered
  }

}
