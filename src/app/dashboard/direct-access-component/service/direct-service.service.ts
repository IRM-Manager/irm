import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectServiceService {
  regMessage: string | undefined;
  viewSelf: string | undefined;
  yearAMessage: string | undefined;
  yearBMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  //
  setMessage(data: any) {
    this.regMessage = data;
  }

  getMessage() {
    return this.regMessage;
  }

  // self view details
  setviewSelfMessage(data: any) {
    this.viewSelf = data;
  }

  getviewSelfMessage() {
    return this.viewSelf;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  // Self year
  setAYearMessage(data: any) {
    this.yearAMessage = data;
  }

  getAYearMessage() {
    return this.yearAMessage;
  }

  // BOJ year
  setBYearMessage(data: any) {
    this.yearBMessage = data;
  }

  getBYearMessage() {
    return this.yearBMessage;
  }
}
