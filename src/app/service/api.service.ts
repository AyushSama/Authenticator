import { endpoint } from './../endpoints/endpoints';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../interfaces/Menu';

export interface GetClientListDataSearchEntity {
  accountType: string;
  productType: string;
  acStatus: number;
  uType: number;
  country: string;
  startDate: string;
  endDate: string;
  expiredStartDate: string;
  expiredEndDate: string;
  subAccountType: string;
  startIndex: number;
  pageSize: number;
}

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

  getNavButtons(param : HttpParams):Observable<Menu[]>{
    try {
      return this.http.get<Menu[]>(this.baseHostUrl +endpoint.getMenu , {params : param});
    } catch (error) {
      throw new Error();
    }
  }

  private readonly reportDataSubject = new BehaviorSubject<any>({});
  reportData$ = this.reportDataSubject.asObservable();

  updateReportData(data: any) {
    this.reportDataSubject.next(data);
  }



  getClientList(searchModel: GetClientListDataSearchEntity): Observable<any> {
    const params = new HttpParams()
      .set('AccountType', searchModel.accountType)
      .set('ProductType', searchModel.productType)
      .set('AcStatus', searchModel.acStatus.toString())
      .set('UType', searchModel.uType.toString())
      .set('Country', searchModel.country)
      .set('StartDate', searchModel.startDate.toString())
      .set('EndDate', searchModel.endDate.toString())
      .set('ExpiredStartDate', searchModel.expiredStartDate.toString())
      .set('ExpiredEndDate', searchModel.expiredEndDate.toString())
      .set('SubAccountType', searchModel.subAccountType)
      .set('StartIndex', searchModel.startIndex.toString())
      .set('PageSize', searchModel.pageSize.toString());

    return this.http.get<any>("https://localhost:44316/api/GetClientListData/list", { params });
  }

}
