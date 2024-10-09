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
  corpDataUrl = environment.corpData;

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

  getAllUsers():Observable<any>{
    return this.http.get<any>(this.corpDataUrl);
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
  getAccounts(): Observable<string> {
    return this.http.get<string>(`https://localhost:44383/api/Users/corporate-ids?accountType=1`);
  }
  reportData: any;
  requestData: any;
  DataToApi(corpNo: number, startDate: Date, endDate: Date, accountType: string, lang: string) {
    this.reportData = {
      corpNo: corpNo,
      startDate: startDate,
      endDate: endDate,
      accountType: accountType,
      lang: lang
    }
  }

  sendDataToApi() {
    return this.http.post('https://localhost:44383/api/Users/run-report',
      this.reportData
    );
  }
}
