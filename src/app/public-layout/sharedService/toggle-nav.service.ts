import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleNavService {
  message: string | undefined;
  message2: string | undefined;
  message3: string | undefined;
  message4: string | undefined;
  payerEditMessage: string | undefined;
  payeeData: string | undefined;
  payerMessage: any;

  private subject = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();
  private subject5 = new Subject<any>();

  constructor() {}

  setMessage(data: any) {
    this.message = data;
  }

  getMessage() {
    return this.message;
  }

  // message 2
  setMessage2(data: any) {
    this.message2 = data;
  }

  getMessage2() {
    return this.message2;
  }

  // message 3

  setMessage3(data: any) {
    this.message3 = data;
  }

  getMessage3() {
    return this.message3;
  }

  // message 3

  setMessage4(data: any) {
    this.message4 = data;
  }

  getMessage4() {
    return this.message4;
  }

  // payer edit message

  setPayerEditMessage(data: any) {
    this.payerEditMessage = data;
  }

  getPayerEditMessage() {
    return this.payerEditMessage;
  }








   // create payer page message
   setPayerMessage(data: any) {
    this.payerMessage = data;
  }

  getPayerMessage() {
    return this.payerMessage;
  }

  //










  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  // payee
  PayeesendClickEvent(data: any) {
    this.subject.next(data);
  }

  PayeegetClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  PayeesendClickEvent2() {
    this.subject5.next(null);
  }

  PayeegetClickEvent2(): Observable<any> {
    return this.subject5.asObservable();
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

  getHeaderClickEvent(): Observable<any> {
    return this.subject3.asObservable();
  }

  sendHeaderSideClickEvent() {
    this.subject3.next(null);
  }

  getHeaderSideClickEvent(): Observable<any> {
    return this.subject3.asObservable();
  }

  // remove payee year header button

  sendPayeeHeaderButtonClickEvent(data: Boolean) {
    this.subject4.next(data);
  }

  getPayeeHeaderButtonClickEvent(): Observable<any> {
    return this.subject4.asObservable();
  }
}
