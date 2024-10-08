import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsummaryService {
  private apiUrl: string = 'https://localhost:44316/api/PKG_ProductMaster/corporate-ids';
  private apiUrl2: string = 'https://localhost:44316/api/MsSurveyCorporate';

  constructor(private http: HttpClient, private router: Router) { }

  getCorporateIds(accountType: number, productId: number): Observable<any[]> {
    const url = `${this.apiUrl}?accountType=${accountType}&productId=${productId}`;
    return this.http.get<any[]>(url);
  }

  getCorporateDataById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/getbyid?id=${id}`);
  }

  
  getActivatorCorpDetails(corporate_no: number, AccountType: string, lang: string): Observable<any> {
    const url = `https://localhost:44316/api/ProcGetActivatorCorpDetails/list?corporate_no=${corporate_no}&AccountType=${AccountType}&lang=${lang}`;
    return this.http.get<any>(url);
  }
  getSurveyData(corporate_no: number): Observable<any> {
    const url = `https://localhost:44316/api/SurveyService/surveydata/${corporate_no}`;
    return this.http.get<any>(url);
  }
  getSurveyDataForDeleted(corporate_no: number): Observable<any> {
    const url = `https://localhost:44316/api/SurveyService/surveydatafordeleted/${corporate_no}`;
    return this.http.get<any>(url);
}
}
