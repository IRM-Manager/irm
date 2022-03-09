import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  state(type: string, state_id: number) {
    return this.http.get<any>(BaseUrl.api + `user/api/v1/getstate/?type=${type}&state_id=${state_id}`)
  }

}
