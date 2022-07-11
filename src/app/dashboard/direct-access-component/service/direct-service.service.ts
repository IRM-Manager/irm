import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectServiceService {
  regMessage: string | undefined;
  DepLocMessage: string | undefined;
  ViewSelf: string | undefined;
  yearAMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setMessage(data: any) {
    this.regMessage = data;
  }

  getMessage() {
    return this.regMessage;
  }

  setviewSelfMessage(data: any) {
    this.ViewSelf = data;
  }

  getviewSelfMessage() {
    return this.ViewSelf;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  setAYearMessage(data: any) {
    this.yearAMessage = data;
  }

  getAYearMessage() {
    return this.yearAMessage;
  }
}
