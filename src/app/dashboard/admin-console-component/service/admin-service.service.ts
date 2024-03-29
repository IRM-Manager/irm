import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  regMessage: string | undefined;
  depLocMessage: string | undefined;
  private subject = new Subject<any>();
  constructor() {}

  setAdminMessage(data: any) {
    this.regMessage = data;
  }

  getAdminMessage() {
    return this.regMessage;
  }

  setDepLocMessage(data: any) {
    this.depLocMessage = data;
  }

  getDepLocMessage() {
    return this.depLocMessage;
  }

  sendClickEvent() {
    this.subject.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
