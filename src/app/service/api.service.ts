import { endpoint } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseApiUrl = environment.baseApiUrl;

  getUser(){
    try {
      return this.http.get(this.baseApiUrl+endpoint.getUser);
    } catch (error) {
      throw new Error();
    }
  }

}
