import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { loginI } from '../model/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged=false;
  loading=false;
  
  formulario=new FormGroup(
    {
      email: new FormControl(''),
      password:new FormControl('')
    }
  );
  usuario:loginI[] =[];
  
  constructor(
    private builder:FormBuilder,private router: Router,private tok:TokenService) {
    this.formulario=this.builder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
    if(this.tok.getToken()){
      this.isLogged=true;
    }
  }

 public onSubmit(){
  const url='http://challenge-react.alkemy.org/'
  const usuario={email:this.formulario.value.email, password:this.formulario.value.password}
    this.loading=true;
    this.tok.login(url,usuario).subscribe(res=>{
    
      if(res!=''){
        /*
        sessionStorage.removeItem(token_key);
        sessionStorage.setItem(token_key,JSON.stringify(res));*/
        this.isLogged=true;
        this.loading=false;
        this.tok.setToken(JSON.stringify(res));
        this.router.navigate(['']);

      }
    }, err=>{
        console.log("ocurrio un error");
        this.isLogged=false;
        Swal.fire({
          title: 'Credenciales incorrectas',
          text: "¿Quieres intentarlo nuevamente?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Nuevo intento',
          cancelButtonText:'Menu principal',
          cancelButtonColor: '#1b9e4d',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['login']);
            this.loading=false;
          }else{
            this.router.navigate(['']);
          }
        })
    });
 }

 public logoOut():void{
  sessionStorage.clear();
 }
  
}
