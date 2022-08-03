import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WitholdingServiceService {
  regMessage: string | undefined;
  assMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setRegMessage(data: any) {
    this.regMessage = data;
  }

  getRegMessage() {
    return this.regMessage;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  //
  setAssMessage(data: any) {
    this.assMessage = data;
  }

  getAssMessage() {
    return this.assMessage;
  }
}
