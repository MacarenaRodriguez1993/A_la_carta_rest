import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime,filter} from 'rxjs';
import { ApiServiceService } from 'src/app/service/api.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Input() datosHijo:any;
  @Input() esperando:boolean;
  @Input() buscarHab:boolean;
  @Input() cantPlato:number;
  @Output() busquedaPlato =new EventEmitter<any>();
  @Output() index =new EventEmitter<number>();

  inputBusqueda= new FormControl('');
  constructor(private api:ApiServiceService) { }
  listaBusqueda:any[]=[];

  ngOnInit(): void {
    this.buscar();

  }

  buscar(){
    this.inputBusqueda.valueChanges
    .pipe(
      debounceTime(350),
      filter((search:string)=> search.length >2)
    )
    .subscribe(
      (search:string) => 
      this.api.buscarRecetas(search).subscribe(search=>{
        this.listaBusqueda=search;
        })
    );
  }

  agregar(id:number,busqueda:any){
    this.busquedaPlato.emit(busqueda);
    this.index.emit(id)
  }


}
