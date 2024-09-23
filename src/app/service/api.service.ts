import { endpoint } from './../endpoints/endpoints';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/User';

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

  postUser(user:User){
    try {
      return this.http.post(this.baseApiUrl+endpoint.postUser ,user);
    } catch (error) {
      throw new Error();
    }
  }

}
