import { Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleNavService {

  message: string | undefined;
  message2: string | undefined;
  message3: string | undefined;
  payerEditMessage: string | undefined;
  payeeData: string | undefined;

  private subject = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();

  constructor() { }

  setMessage(data: any) {
    this.message = data
  }
  
  getMessage() {
    return this.message
  }

  // message 2
  setMessage2(data: any) {
    this.message2 = data
  }
  
  getMessage2() {
    return this.message2
  }

  // message 3

  setMessage3(data: any) {
    this.message3 = data
  }
  
  getMessage3() {
    return this.message3
  }

  // payer edit message 

  setPayerEditMessage(data: any) {
    this.payerEditMessage = data
  }
  
  getPayerEditMessage() {
    return this.payerEditMessage
  }

  // 

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

  // payee data
  PayeesenddataEvent(data: any) {
    this.payeeData = data;
  }

  PayeegetdataEvent() {
    return this.payeeData;
  }
  // 

  sendHeaderClickEvent() {
    this.subject3.next(null);
  }

  getHeaderClickEvent():Observable<any> {
    return this.subject3.asObservable();
  }

  sendHeaderSideClickEvent() {
    this.subject3.next(null);
  }

  getHeaderSideClickEvent():Observable<any> {
    return this.subject3.asObservable();
  }

  // remove payee year header button

  sendPayeeHeaderButtonClickEvent() {
    this.subject4.next(null);
  }

  getPayeeHeaderButtonClickEvent():Observable<any> {
    return this.subject4.asObservable();
  }


}
