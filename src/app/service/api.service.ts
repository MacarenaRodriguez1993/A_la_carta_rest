import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , pluck } from 'rxjs';

interface apiResponse {
  
  results:respuesta[];

}
export interface respuesta{
  id: number;
  title: string;
  image: string;
  imageType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url1='https://api.spoonacular.com/recipes/'
  url2='/information?&includeNutrition=false&';
  apikey='apiKey=86a2419f613e432bb97a416e9e00e9bf'
  constructor(private http:HttpClient) { }

  public traerReceta(index:number){
    return this.http.get<any>(this.url1+index+this.url2+this.apikey);
  }

  public buscarRecetas(receta:string):Observable<respuesta[]>{
    return this.http.get<apiResponse>(`${this.url1}complexSearch?query=${receta}&${this.apikey}`)
    .pipe(
      pluck('results')
    )
  }
}
