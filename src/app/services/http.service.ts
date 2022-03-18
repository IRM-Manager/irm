import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, retryWhen, scan } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  state(type: string, state_id: number) {
    return this.http.get<any>(BaseUrl.api + `user/api/v1/getstate/?type=${type}&state_id=${state_id}`).pipe(
      retry(1)
    )
  }

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
              if (retryCount > 2) throw err;
              else {
                retryCount++;
                return retryCount
              }
            }else {
            }
          }, 0)
        ))
      )
  }
  

}
