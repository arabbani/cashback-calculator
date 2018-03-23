import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { CashbackInfo, MobileInput } from '../../..';
import { SERVER_API_URL } from '../../../../app.constants';

type EntityResponseType = HttpResponse<CashbackInfo[]>;

@Injectable()
export class CalculateCashbackService {

  private restUrl = SERVER_API_URL + 'api/cashback';

  constructor(private http: HttpClient) { }

  calculateCashbackForMobile(mobileInput: MobileInput): Observable<EntityResponseType> {
    mobileInput.dateTime = this.setDateTime();
    return this.calculate(`${this.restUrl}/mobile`, mobileInput);
  }

  private calculate(restUrl: string, input: any): Observable<EntityResponseType> {
    return this.http.post<any>(restUrl, input, { observe: 'response' })
      .map((res: EntityResponseType) => this.convertArrayResponse(res));
  }

  private setDateTime(): any {
    return moment().seconds(0).format('YYYY-MM-DDTHH:mm');
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
