import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiEndpoint = 'http://localhost:8080'; // Base URL

  constructor(private http: HttpClient) { }

  getListData(): Observable<any[]> {
    const url = `${this.apiEndpoint}/getStats`;
    return this.http.get<any[]>(url);
  }
}
