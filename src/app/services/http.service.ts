import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, retryWhen, scan } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';
// state management
import { Store } from '@ngrx/store';
import { Profile } from '../models/irm';
import { AppState, selectAllProfile } from 'src/app/reducers/index';
import { AddProfile, RemoveProfile } from '../actions/irm.action';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  stateProfile: Observable<Profile[]>;

  constructor(private http: HttpClient, private authService: AuthService,
    private store: Store<AppState>) {
      this.stateProfile = store.select(selectAllProfile);
    }


  getUsername(): any {
    this.stateProfile.forEach(e => {
      return e[0].data.data;
    })
  }

    // get list of state and get lga of a selected state
  state(type: string, state_id: number) {
    return this.http.get<any>(BaseUrl.api + `user/api/v1/getstate/?type=${type}&state_id=${state_id}`).pipe(
      retry(1)
    )
  }

  // get lists of years
  year() {
    return this.http.get<any>(BaseUrl.api2 + `paye/api/v1/paye/year/`).pipe(
      retry(1)
    )
  }

  // get user profile
  getProfile(token: string): Observable<any[]> {
      const httpOptions = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      return this.http.get<any[]>(BaseUrl.api + `user/api/v1/profile/`, httpOptions).pipe(
        retry(1)
      )
  }


  // add individual or company payer
  AddPayer(data: any, type: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api + `user/api/v1/register-payer/?payer_group=${type}`, data, httpOptions).pipe(
      retry(2)
    )
  }

  // get payer data
  GetPayerList(): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api + `user/api/v1/getallpayer/`, httpOptions).pipe(
      retry(1)
    )
  }

  // get payer by tin
  GetPayerTin(tin: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api + `user/api/v1/getpayertin/?tin=${tin}`, httpOptions).pipe(
      retry(1)
    )
  }

  // upload csv payee file
  UploadPayeeFile(data: any, tin: string, year_id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/csv/?comp_tin=${tin}&yearId=${year_id}`, data, httpOptions).pipe(
      retry(2)
    )
  }

  // upload validated csv payee file
  UploadPayeeValidatedFile(data: any, tin: string, year_id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/bulkupload/?comp_tin=${tin}&yearId=${year_id}`, data, httpOptions).pipe(
      retry(2)
    )
  }

  // add single payee
  AddSinglePayee(data: any): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/`, data, httpOptions).pipe(
      retry(2)
    )
  }

  // upload validated csv payee file
  GetPayee(tin: string, year_id: number | string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api2 + `paye/api/v1/paye/?comp_tin=${tin}&yearId=${year_id}`, httpOptions).pipe(
      retry(1)
    )
  }

  // delete a payer
  DeletePayer(id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.delete<any[]>(BaseUrl.api + `user/api/v1/register-payer/?payer_id=${id}`,httpOptions).pipe(
      retry(1)
    )
  }


  // update a payer
  UpdatePayer(type: string, id: number, data: any): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.put<any[]>(BaseUrl.api + `user/api/v1/register-payer/?type=${type}&payer_id=${id}`, data, httpOptions).pipe(
      retry(2)
    )
  }
  

  

}
