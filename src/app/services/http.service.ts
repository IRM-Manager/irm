import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  // get list of state
  state() {
    return this.http
      .get<any>(
        BaseUrl.api + `user/api/v1/list-state/`
      )
      .pipe(retry(1));
  }

  // get list of lga selected from a state
  lga(state_id: number) {
    return this.http
      .get<any>(
        BaseUrl.api + `user/api/v1/get-state/${state_id}`
      )
      .pipe(retry(1));
  }

  // get lists of years
  year() {
    return this.http
      .get<any>(BaseUrl.api2 + `paye/api/paye/year/`)
      .pipe(retry(1));
  }

  // get user profile
  getProfile(): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .get<any[]>(BaseUrl.api + `user/api/v1/profile/`, httpOptions)
      .pipe(retry(1));
  }

  // add individual or company payer
  AddPayer(data: any, type: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .post<any[]>(
        BaseUrl.api + `user/api/v1/register-payer/?payer_group=${type}`,
        data,
        httpOptions
      )
      .pipe(retry(2));
  }

  // get payer data
  GetPayerList(): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .get<any[]>(BaseUrl.api + `user/api/v1/list-payer/`, httpOptions)
      .pipe(retry(1));
  }

  // get payer by tin
  GetPayerTin(tin: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .get<any[]>(
        BaseUrl.api + `user/api/v1/getpayertin/?tin=${tin}`,
        httpOptions
      )
      .pipe(retry(2));
  }

  // upload csv payee file
  UploadPayeeFile(data: any, tin: string, year_id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .post<any[]>(
        BaseUrl.api2 +
          `paye/api/v1/paye/upload/?comp_tin=${tin}&yearId=${year_id}`,
        data,
        httpOptions
      )
      .pipe(retry(2));
  }

  // upload validated csv payee file
  UploadPayeeValidatedFile(
    data: any,
    tin: string,
    year_id: number | string
  ): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .post<any[]>(
        BaseUrl.api2 +
          `paye/api/v1/paye/confirm_upload/?comp_tin=${tin}&yearId=${year_id}`,
        data,
        httpOptions
      )
      .pipe(retry(2));
  }

  // add single payee
  AddSinglePayee(data: any, tin: string, year_id: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/?comp_tin=${tin}&yearId=${year_id}`, data, httpOptions)
      .pipe(retry(2));
  }

  // upload validated csv payee file
  GetPayee(tin: string, year_id: number | string): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .get<any[]>(
        BaseUrl.api2 + `paye/api/v1/paye/?comp_tin=${tin}&yearId=${year_id}`,
        httpOptions
      )
      .pipe(retry(2));
  }

  // delete a payer
  DeletePayer(id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .delete<any[]>(
        BaseUrl.api + `user/api/v1/register-payer/?payer_id=${id}`,
        httpOptions
      )
      .pipe(retry(2));
  }

  // update a payer
  UpdatePayer(type: string, id: number, data: any): Observable<any[]> {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .put<any[]>(
        BaseUrl.api + `user/api/v1/register-payer/?type=${type}&payer_id=${id}`,
        data,
        httpOptions
      )
      .pipe(retry(2));
  }

  // Delete payee
  DeletePayee(id: number) {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .delete<any[]>(
        BaseUrl.api2 + `paye/api/v1/paye/${id}/`,
        httpOptions
      )
      .pipe(retry(1));
  }

  // Update payee
  UpdatePayee(data: any, tin: string, id: number | string) {
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`,
      },
    };
    return this.http
      .patch<any[]>(
        BaseUrl.api2 + `paye/api/v1/paye/117/?comp_tin=${tin}&yearId=${id}`,
        data,
        httpOptions
      )
      .pipe(retry(2));
  }



}
