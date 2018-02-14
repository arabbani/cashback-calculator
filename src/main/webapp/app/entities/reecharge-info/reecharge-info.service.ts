import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReechargeInfo } from './reecharge-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReechargeInfo>;

@Injectable()
export class ReechargeInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/reecharge-infos';

    constructor(private http: HttpClient) { }

    create(reechargeInfo: ReechargeInfo): Observable<EntityResponseType> {
        const copy = this.convert(reechargeInfo);
        return this.http.post<ReechargeInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reechargeInfo: ReechargeInfo): Observable<EntityResponseType> {
        const copy = this.convert(reechargeInfo);
        return this.http.put<ReechargeInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReechargeInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReechargeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReechargeInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReechargeInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReechargeInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReechargeInfo[]>): HttpResponse<ReechargeInfo[]> {
        const jsonResponse: ReechargeInfo[] = res.body;
        const body: ReechargeInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReechargeInfo.
     */
    private convertItemFromServer(reechargeInfo: ReechargeInfo): ReechargeInfo {
        const copy: ReechargeInfo = Object.assign({}, reechargeInfo);
        return copy;
    }

    /**
     * Convert a ReechargeInfo to a JSON which can be sent to the server.
     */
    private convert(reechargeInfo: ReechargeInfo): ReechargeInfo {
        const copy: ReechargeInfo = Object.assign({}, reechargeInfo);
        return copy;
    }
}
