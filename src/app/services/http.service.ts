import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private base_url = BaseUrl.server;
  private httpOptions = {
    headers: {
      Authorization: `Bearer ${this.authService.getJwtToken()}`,
    },
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  postData(endpoint: any, data: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.base_url + endpoint,
      data,
      this.httpOptions
    );
  }

  postRegisterData(endpoint: any, data: any): Observable<any[]> {
    return this.http.post<any[]>(this.base_url + endpoint, data);
  }

  getSingleNoAuth(endpoint: any) {
    return this.http.get(this.base_url + endpoint).pipe(retry(1));
  }

  getSingleNoAuthID(endpoint: any, id: any) {
    return this.http.get(this.base_url + endpoint + id).pipe(retry(1));
  }

  getAuthSingle(endpoint: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint, this.httpOptions)
      .pipe(retry(1));
  }

  getAuthSingleID(endpoint: any, id: any): Observable<any[]> {
    return this.http
      .get<any[]>(this.base_url + endpoint + id, this.httpOptions)
      .pipe(retry(1));
  }

  updateData(endpoint: any, data: any, id: any, year?: any): Observable<any[]> {
    return this.http
      .put<any[]>(
        !year
          ? this.base_url + endpoint + id
          : this.base_url + endpoint + id + `/?yearId=${year}`,
        data,
        this.httpOptions
      )
      .pipe(retry(1));
  }

  deleteData(endpoint: any, id: any): Observable<any[]> {
    return this.http.delete<any[]>(
      this.base_url + endpoint + id,
      this.httpOptions
    );
  }
}
