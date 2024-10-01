import { endpoint } from './../endpoints/endpoints';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseApiUrl = environment.baseApiUrl;
  baseHostUrl = environment.baseHostUrl;

  getUser(params : HttpParams){
    try {
      return this.http.get(this.baseApiUrl+endpoint.getUser ,{params});
    } catch (error) {
      throw new Error();
    }
  }

  postUser(user:User){
    try {
      return this.http.post(this.baseApiUrl+endpoint.postUser ,user);
    } catch (error) {
      throw new Error();
    }
  }

  getHistory(){
    try {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Add Bearer token
      });
      return this.http.get(this.baseApiUrl+endpoint.getHistory,{headers});
    } catch (error) {
      throw new Error();
    }
  }

  getNavButtons(){
    try {
      return this.http.get(this.baseHostUrl +endpoint.NavButtons);
    } catch (error) {
      throw new Error();
    }
  }

  getNavButtonData(endpoint:string){
    try {
      return this.http.get(this.baseHostUrl+endpoint);
    } catch (error) {
      throw new Error();
    }
  }

}
