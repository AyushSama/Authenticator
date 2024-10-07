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

  authenticateUser(params : HttpParams){
    try {
      return this.http.get(this.baseHostUrl+endpoint.authenticateUser ,{params});
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

  getNavButtons(param : HttpParams){
    try {
      return this.http.get(this.baseHostUrl +endpoint.getMenu , {params : param});
    } catch (error) {
      throw new Error();
    }
  }

}
