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
        retryWhen(err => err.pipe(
          scan((retryCount: any) => {
            const refresh = this.authService.refreshToken();
            console.log(refresh)
            if (refresh) {
              if (retryCount > 1) throw err;
              else {
                retryCount++;
                console.log(retryCount)
                return retryCount
              }
            }else {
            }
          }, 0)
        ))
      )
  }


  // add individual or company payer
  AddPayer(data: any, type: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api + `user/api/v1/register-payer/?payer_group=${type}`, data, httpOptions)
  }

  // get payer data
  GetPayerList(): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api + `user/api/v1/getallpayer/`, httpOptions)
  }

  // get payer by tin
  GetPayerTin(tin: string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api + `user/api/v1/getpayertin/?tin=${tin}`, httpOptions)
  }

  // upload csv payee file
  UploadPayeeFile(data: any, tin: string, year_id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/csv/?comp_tin=${tin}&yearId=${year_id}`, data, httpOptions)
  }

  // upload validated csv payee file
  UploadPayeeValidatedFile(data: any, tin: string, year_id: number): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/bulkupload/?comp_tin=${tin}&yearId=${year_id}`, data, httpOptions)
  }

  // add single payee
  AddSinglePayee(data: any): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.post<any[]>(BaseUrl.api2 + `paye/api/v1/paye/`, data, httpOptions)
  }

  // upload validated csv payee file
  GetPayee(tin: string, year_id: number | string): Observable<any[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      }
    };
    return this.http.get<any[]>(BaseUrl.api2 + `paye/api/v1/paye/?comp_tin=${tin}&yearId=${year_id}`, httpOptions)
  }
  

}
