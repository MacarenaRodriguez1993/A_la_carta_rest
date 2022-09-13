import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN_KEY ='TOKEN'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  url='http://challenge-react.alkemy.org';
  constructor(private http:HttpClient) { }

  login(url:string,user:object){
    return this.http.post(url,user);
  }
  public setToken(token:string):void{
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,token);
  }
  public getToken():string{
    return localStorage.getItem(TOKEN_KEY)!;
  }
  public hayToken(){
    const token=this.getToken();
    if(token==null){ 
      return false;
    }else {
      return true;
    }

  }
  public logOut():void{
    localStorage.removeItem('TOKEN');
  }
}
