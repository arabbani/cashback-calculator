import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BusInfo } from './bus-info.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<BusInfo>;

@Injectable()
export class BusInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/bus-infos';

    constructor(private http: HttpClient) { }

    create(busInfo: BusInfo): Observable<EntityResponseType> {
        const copy = this.convert(busInfo);
        return this.http.post<BusInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(busInfo: BusInfo): Observable<EntityResponseType> {
        const copy = this.convert(busInfo);
        return this.http.put<BusInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BusInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BusInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<BusInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BusInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BusInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BusInfo[]>): HttpResponse<BusInfo[]> {
        const jsonResponse: BusInfo[] = res.body;
        const body: BusInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BusInfo.
     */
    private convertItemFromServer(busInfo: BusInfo): BusInfo {
        const copy: BusInfo = Object.assign({}, busInfo);
        return copy;
    }

    /**
     * Convert a BusInfo to a JSON which can be sent to the server.
     */
    private convert(busInfo: BusInfo): BusInfo {
        const copy: BusInfo = Object.assign({}, busInfo);
        return copy;
    }
}
