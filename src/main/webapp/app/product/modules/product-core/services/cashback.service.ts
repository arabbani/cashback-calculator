import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import {
  BroadbandInput,
  BusInput,
  CabInput,
  CashbackInfo,
  DatacardInput,
  DthInput,
  ElectricityInput,
  FlightInput,
  GasInput,
  LandlineInput,
  MetroInput,
  MobileInput,
  WaterInput,
} from '../../..';
import { SERVER_API_URL } from '../../../../app.constants';

type EntityResponseType = HttpResponse<CashbackInfo[]>;

@Injectable()
export class CashbackService {

  private restUrl = SERVER_API_URL + 'api/cashback';

  constructor(private http: HttpClient) { }

  mobile(mobileInput: MobileInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/mobile`, mobileInput);
  }

  dth(dthInput: DthInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/dth`, dthInput);
  }

  datacard(datacardInput: DatacardInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/datacard`, datacardInput);
  }

  landline(landlineInput: LandlineInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/landline`, landlineInput);
  }

  broadband(broadbandInput: BroadbandInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/broadband`, broadbandInput);
  }

  electricity(electricityInput: ElectricityInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/electricity`, electricityInput);
  }

  gas(gasInput: GasInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/gas`, gasInput);
  }

  metro(metroInput: MetroInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/metro`, metroInput);
  }

  water(waterInput: WaterInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/water`, waterInput);
  }

  flight(flightInput: FlightInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/flight`, flightInput);
  }

  bus(busInput: BusInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/bus`, busInput);
  }

  calculateCashbackForCab(cabInput: CabInput): Observable<EntityResponseType> {
    return this.calculate(`${this.restUrl}/cab`, cabInput);
  }

  private calculate(restUrl: string, input: any): Observable<EntityResponseType> {
    input = this.setDateTime(input);
    return this.http.post<any>(restUrl, input, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertArrayResponse(res));
  }

  private setDateTime(input): any {
    const copiedInput = Object.assign({}, input);
    const dateTime = moment();
    copiedInput.activeDate = dateTime.date();
    copiedInput.activeDay = moment(dateTime).format('dddd');
    copiedInput.dateTime = dateTime.seconds(0).format('YYYY-MM-DDTHH:mm');
    return copiedInput;
  }

  private convertArrayResponse(res: EntityResponseType): EntityResponseType {
    // const jsonResponse: Affiliate[] = this.deserializeArray(res.body);
    // const body: Affiliate[] = [];
    // for (let i = 0; i < jsonResponse.length; i++) {
    //     body.push(this.convertItemFromServer(jsonResponse[i]));
    // }
    const body = res.body;
    return res.clone({ body });
    // console.log(res.json()[0]['offer']);
    // console.log(this.jsogService.deserializeObject(res.json()[0]['offer'], Offer));
    // console.log("CASHBACKINFOS ", cashbackInfos);
    // console.log("CASHBACKINFOS### ", this.jsogService.deserializeArray(cashbackInfos, CashbackInfo.));
  }

}
