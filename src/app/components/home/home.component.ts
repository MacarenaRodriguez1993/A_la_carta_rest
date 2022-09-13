import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';;
import { ApiServiceService } from 'src/app/service/api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  isLogged=false;
  loading=false;
  habilitarBus=false;
  habilitarPla=false;
  busqueda:any;
  platos:any[]=[];

  precioAcumulado:number =0;
  tiempoAcumulado:number =0;
  saludableAcumulado:number =0;
  cantidadVegan:number =0;
  cantidadNoVegan:number =0;
  cantidadPlatos:number =0;
  Nvegano:number;

  constructor(private tok:TokenService,private api:ApiServiceService) { }

  ngOnInit(): void {
    if(this.tok.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }

    // INICIO DE ARRAY DE PLATOS 
    var platosArray=localStorage.getItem('platosData')
    if(platosArray == null){
      this.platos=[]
    }else{
      this.platos= JSON.parse(platosArray)
    }
    // Inicio variables # PLATOS NO VEGANOS
    let Nvegi=localStorage.getItem('cantidadNoVegan')
    if(Nvegi==null){
      this.cantidadNoVegan=0;
    }else{
      this.cantidadNoVegan= JSON.parse(Nvegi);
    }

    // Inicio variables # PLATOS VEGANOS
    let vegi=localStorage.getItem('cantidadVegan')
    if(vegi==null){
      this.cantidadVegan=0;
    }else{
      this.cantidadVegan= JSON.parse(vegi);
    }

    // Inicio variables # PLATOS 
    let total=localStorage.getItem('cantidadTotal')
    if(total==null){
      this.cantidadPlatos=0;
    }else{
      this.cantidadPlatos= JSON.parse(total);
    }

    // Inicio variables #acumulado tiempo
    let tiempo=localStorage.getItem('tiempoAcumulado')
    if(tiempo==null){
      this.tiempoAcumulado=0;
    }else{
      this.tiempoAcumulado= JSON.parse(tiempo);
    }
    // Inicio variables #acumulado saludable
    let saludable=localStorage.getItem('saludableAcumulado')
    if(saludable==null){
      this.saludableAcumulado=0;
    }else{
      this.saludableAcumulado = JSON.parse(saludable);
    }

     // Inicio variables #acumulado precio
     let precio=localStorage.getItem('precioAcumulado')
     if(precio==null){
       this.precioAcumulado=0;
     }else{
       this.precioAcumulado = JSON.parse(precio);
     }
  
  }


  habilitarBusqueda(){
      this.habilitarBus=true;
      this.habilitarPla=false;
  }
  habilitarPlatos(){
    this.habilitarPla=true;
    this.habilitarBus=false;
  }

  agregar(indice:number,){
    this.loading=true;
    let datos:any;
    for(let i=0; i<this.busqueda.length; i++){
      if(this.busqueda[i].id==indice){
        this.api.traerReceta(indice).subscribe(data =>{
          datos={
            id:data.id,
            title:data.title,
            imagen:data.image,
            dieta:data.diets,
            tipo_de_plato:data.dishTypes,
            tiempo:data.readyInMinutes,
            precio: data.pricePerServing,
            saludable:data.healthScore,
            isVegan:data.vegan,
          }
            if(datos.isVegan==false && this.cantidadNoVegan<2){
              this.cantidadNoVegan++;
              this.platos.push(datos)
              let platosJSON=JSON.stringify(this.platos);
              localStorage.setItem("platosData", platosJSON)
              this.busqueda.splice(i,1)
            }
            if(datos.isVegan==true && this.cantidadVegan<2){
              this.cantidadVegan++;
              this.platos.push(datos)
              let platosJSON=JSON.stringify(this.platos);
              localStorage.setItem("platosData", platosJSON)
              this.busqueda.splice(i,1)
            }

            this.precioAcumulado+=datos.precio;
            let precio=JSON.stringify(this.precioAcumulado);
            localStorage.setItem("precioAcumulado", precio)
      
            this.tiempoAcumulado+=datos.tiempo; 
            let tiempo=JSON.stringify(this.tiempoAcumulado);
            localStorage.setItem("tiempoAcumulado", tiempo)
  
            this.saludableAcumulado+=datos.saludable; 
            let saludable=JSON.stringify(this.saludableAcumulado);
            localStorage.setItem("saludableAcumulado", saludable)
  
          this.cantidadPlatos=this.cantidadNoVegan+this.cantidadVegan;
          this.loading=false;
          localStorage.setItem('cantidadNoVegan',JSON.stringify(this.cantidadNoVegan))
          localStorage.setItem('cantidadVegan',JSON.stringify(this.cantidadVegan))
          localStorage.setItem('cantidadTotal',JSON.stringify(this.cantidadPlatos))
        })
      } 
    }
  }

  borrarPlato(id:number){
    for(var i=0;i<this.platos.length;i++){
      if(this.platos[i].id==id){
        if(this.platos[i].isVegan==true){
          this.cantidadVegan--;
          this.precioAcumulado-=this.platos[i].precio;
          this.tiempoAcumulado-=this.platos[i].tiempo;
          this.saludableAcumulado-=this.platos[i].saludable;
          this.cantidadPlatos=this.cantidadNoVegan+this.cantidadVegan;
          let vegan = JSON.stringify(this.cantidadVegan);
          localStorage.setItem('cantidadVegan',vegan)
        }
        if(this.platos[i].isVegan==false){
          this.cantidadNoVegan--;
          this.precioAcumulado-=this.platos[i].precio;
          this.tiempoAcumulado-=this.platos[i].tiempo;
          this.saludableAcumulado-=this.platos[i].saludable;
          this.cantidadPlatos=this.cantidadNoVegan+this.cantidadVegan;
          let NOvegan = JSON.stringify(this.cantidadNoVegan);
          localStorage.setItem('cantidadNoVegan',NOvegan)
        }
        this.platos.splice(i,1) 
        let platosJSON=JSON.stringify(this.platos);
        localStorage.setItem("platosData", platosJSON)
      }
    }
  }

}
