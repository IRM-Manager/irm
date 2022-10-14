import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  regMessage: string | undefined;
  setCustomerPlateReg: string | undefined;
  setPlateStatM: string | undefined;
  setVehicleType: string | undefined;
  assMessage: string | undefined;
  docMessage: string | undefined;
  ownerMessage: string | undefined;
  offenceMessage: string | undefined;
  penaltyMessage: string | undefined;
  regMessage2: string | undefined;
  RegVehicleMessage: string | undefined;
  profileMessage: string | undefined;
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();
  constructor() {}

  // for renew vehicle
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

  // for new vehicle reg
  setRegMessage2(data: any) {
    this.regMessage2 = data;
  }

  getRegMessage2() {
    return this.regMessage2;
  }

  sendClickEvent2() {
    this.subject2.next(null);
  }

  getClickEvent2(): Observable<any> {
    return this.subject2.asObservable();
  }

  // For cusomer reg plate number
  setCustomerPlateRegMessage(data: any) {
    this.setCustomerPlateReg = data;
  }

  getCustomerPlateRegMessage() {
    return this.setCustomerPlateReg;
  }

  // For plate number statistics
  setPlateStat(data: any) {
    this.setPlateStatM = data;
  }

  getPlateStat() {
    return this.setPlateStatM;
  }

  // For plate number statistics
  setVehicleTypeMessage(data: any) {
    this.setVehicleType = data;
  }

  getVehicleTypeMessage() {
    return this.setVehicleType;
  }

  // For vehicle collect tax details
  setRegVehicleMessage(data: any) {
    this.RegVehicleMessage = data;
  }

  getRegVehicleMessage() {
    return this.RegVehicleMessage;
  }

  // For vehicle assessment
  setAssMessage(data: any) {
    this.assMessage = data;
  }

  getAssMessage() {
    return this.assMessage;
  }

  // For vehicle document
  setDocMessage(data: any) {
    this.docMessage = data;
  }

  getDocMessage() {
    return this.docMessage;
  }

  // For vehicle change of ownership view
  setOwnerViewMessage(data: any) {
    this.ownerMessage = data;
  }

  getOwnerViewMessage() {
    return this.ownerMessage;
  }

  // For offence and penalties
  setOffenceMessage(data: any) {
    this.offenceMessage = data;
  }

  getOffenceMessage() {
    return this.offenceMessage;
  }

  // For set offence and penalties
  setPenaltyMessage(data: any) {
    this.penaltyMessage = data;
  }

  getPenaltyMessage() {
    return this.penaltyMessage;
  }

  // For set profile message
  setProfileMessage(data: any) {
    this.profileMessage = data;
  }

  getProfileMessage() {
    return this.profileMessage;
  }
}
