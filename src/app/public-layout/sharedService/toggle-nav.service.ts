import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleNavService {

  message: string | undefined;

  private subject = new Subject<any>();
  private subject3 = new Subject<any>();

  constructor() { }

  setMessage(data: any) {
    this.message = data
  }
  
  getMessage() {
    return this.message
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable();
  }

  // payee
  PayeesendClickEvent(data: any) {
    this.subject.next(data);
  }

  PayeegetClickEvent():Observable<any> {
    return this.subject.asObservable();
  }
  // 

  sendHeaderClickEvent() {
    this.subject3.next(null);
  }

  getHeaderClickEvent():Observable<any> {
    return this.subject3.asObservable();
  }


}
