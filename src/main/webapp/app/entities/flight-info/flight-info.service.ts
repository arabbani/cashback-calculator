import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FlightInfo } from './flight-info.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<FlightInfo>;

@Injectable()
export class FlightInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/flight-infos';

    constructor(private http: HttpClient) { }

    create(flightInfo: FlightInfo): Observable<EntityResponseType> {
        const copy = this.convert(flightInfo);
        return this.http.post<FlightInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(flightInfo: FlightInfo): Observable<EntityResponseType> {
        const copy = this.convert(flightInfo);
        return this.http.put<FlightInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FlightInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FlightInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<FlightInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FlightInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FlightInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FlightInfo[]>): HttpResponse<FlightInfo[]> {
        const jsonResponse: FlightInfo[] = res.body;
        const body: FlightInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FlightInfo.
     */
    private convertItemFromServer(flightInfo: FlightInfo): FlightInfo {
        const copy: FlightInfo = Object.assign({}, flightInfo);
        return copy;
    }

    /**
     * Convert a FlightInfo to a JSON which can be sent to the server.
     */
    private convert(flightInfo: FlightInfo): FlightInfo {
        const copy: FlightInfo = Object.assign({}, flightInfo);
        return copy;
    }
}
