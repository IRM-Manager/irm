import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleNavService {

  
  private subject = new Subject<any>();
  private subject3 = new Subject<any>();

  constructor() { }


  // Updata changes in header component

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable();
  }

  sendHeaderClickEvent(data: any) {
    this.subject3.next(null);
    return data
  }

  getHeaderClickEvent(data: any):Observable<any> {
    return this.subject3.asObservable();
  }


}
