import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectServiceService {
  regMessage: string | undefined;
  DepLocMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setMessage(data: any) {
    this.regMessage = data;
  }

  getMessage() {
    return this.regMessage;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
