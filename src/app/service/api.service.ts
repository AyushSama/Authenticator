import { endpoint } from './../endpoints/endpoints';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/Menu';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }
  
  baseApiUrl = environment.baseApiUrl;
  baseHostUrl = environment.baseHostUrl;
    surveyUrl=environment.surveyUrl;
  downloadExcel = environment.downloadExcel;

  getRecordsApi(requestbody: any) {
    return this.http.post(
      'https://localhost:44316/api/LoginDetails/search',
      requestbody
    );
  }
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

  getNavButtons(param : HttpParams):Observable<Menu[]>{
    try {
      return this.http.get<Menu[]>(this.baseHostUrl +endpoint.getMenu , {params : param});
    } catch (error) {
      throw new Error();
    }
  }

  getSurveyDetailsByCorporateNo(corporate_no: number): Observable<any> {
    console.log(corporate_no);
    return this.http.get(`${this.surveyUrl}/details/${corporate_no}`);
  }


  downloadreport(report: any): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.downloadExcel}`, report, {
      headers,
      responseType: 'blob',
    });
  }

  getCorporateIds(product:number, account_type:number[]): Observable<any> {
    return this.http.get(`${this.surveyUrl}/corporate-ids?`, {params:{
      Account_Type:account_type,
      ProductId:product
    }});
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.baseHostUrl}api/MsSurCorp/list`);
  }

  fetchUserFeatures(corporate_no:number):Observable<any>{
    const data ={
      corporate_no:corporate_no
    }
    return this.http.get<any>(`${this.baseHostUrl}api/GetUserPackageMapping/list`, {params: data});
  }

  getUserAccountType(corporate_no:number):Observable<any>{
    const data ={
      corporate_no:corporate_no
    }
    return this.http.post<any>(`${this.baseHostUrl}api/getAccountType/search`, data);
  }

  updateUserPermission(corporate_no : number, featureExracted:any){
    const data = {
      flag: 0,
      corporate_no:corporate_no,
      features:featureExracted
    }
    return this.http.post(`${this.baseHostUrl}api/UserCustomFeature/insertupdate`, data);
  }
}
