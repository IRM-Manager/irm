import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MdaServiceService {
  message: string | undefined;
  mdaMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setMessage(data: any) {
    this.message = data;
  }

  getMessage() {
    return this.message;
  }

  //
  setMdaMessage(data: any) {
    this.mdaMessage = data;
  }

  getMdaMessage() {
    return this.mdaMessage;
  }
  //

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
