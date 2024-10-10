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
  corpDataUrl = environment.corpData;
    surveyUrl=environment.surveyUrl;
  downloadExcel = environment.downloadExcel;
  getReportDataUrl=environment.getReportData;

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
  getAccounts(): Observable<string> {
    return this.http.get<string>(this.corpDataUrl);
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
    return this.http.post(this.getReportDataUrl,
      this.reportData
    );
  }
}
