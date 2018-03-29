import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TravelInfo } from './travel-info.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<TravelInfo>;

@Injectable()
export class TravelInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/travel-infos';

    constructor(private http: HttpClient) { }

    create(travelInfo: TravelInfo): Observable<EntityResponseType> {
        const copy = this.convert(travelInfo);
        return this.http.post<TravelInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(travelInfo: TravelInfo): Observable<EntityResponseType> {
        const copy = this.convert(travelInfo);
        return this.http.put<TravelInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TravelInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TravelInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<TravelInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TravelInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TravelInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TravelInfo[]>): HttpResponse<TravelInfo[]> {
        const jsonResponse: TravelInfo[] = res.body;
        const body: TravelInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TravelInfo.
     */
    private convertItemFromServer(travelInfo: TravelInfo): TravelInfo {
        const copy: TravelInfo = Object.assign({}, travelInfo);
        return copy;
    }

    /**
     * Convert a TravelInfo to a JSON which can be sent to the server.
     */
    private convert(travelInfo: TravelInfo): TravelInfo {
        const copy: TravelInfo = Object.assign({}, travelInfo);
        return copy;
    }
}
