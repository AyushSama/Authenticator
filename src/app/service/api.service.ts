import { endpoint } from './../endpoints/endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseApiUrl = environment.baseApiUrl;

  getUser(params : HttpParams){
    try {
      return this.http.get(this.baseApiUrl+endpoint.getUser ,{params});
    } catch (error) {
      throw new Error();
    }
  }

  postUser(email:string,password:string){
    try {
      return this.http.post(this.baseApiUrl+endpoint.postUser ,{email,password});
    } catch (error) {
      throw new Error();
    }
  }

}
