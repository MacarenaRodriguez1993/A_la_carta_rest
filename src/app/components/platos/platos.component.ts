import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  @Input() datosHijo:any;
  @Input() logueado:boolean | undefined;
  @Input() platoHab:boolean | undefined;
  @Output() indice = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  
  }

  borrar(id:number){
  this.indice.emit(id)
  }
}
