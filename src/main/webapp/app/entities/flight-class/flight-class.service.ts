import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FlightClass } from './flight-class.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FlightClass>;

@Injectable()
export class FlightClassService {

    private resourceUrl =  SERVER_API_URL + 'api/flight-classes';

    constructor(private http: HttpClient) { }

    create(flightClass: FlightClass): Observable<EntityResponseType> {
        const copy = this.convert(flightClass);
        return this.http.post<FlightClass>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(flightClass: FlightClass): Observable<EntityResponseType> {
        const copy = this.convert(flightClass);
        return this.http.put<FlightClass>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FlightClass>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FlightClass[]>> {
        const options = createRequestOption(req);
        return this.http.get<FlightClass[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FlightClass[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FlightClass = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FlightClass[]>): HttpResponse<FlightClass[]> {
        const jsonResponse: FlightClass[] = res.body;
        const body: FlightClass[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FlightClass.
     */
    private convertItemFromServer(flightClass: FlightClass): FlightClass {
        const copy: FlightClass = Object.assign({}, flightClass);
        return copy;
    }

    /**
     * Convert a FlightClass to a JSON which can be sent to the server.
     */
    private convert(flightClass: FlightClass): FlightClass {
        const copy: FlightClass = Object.assign({}, flightClass);
        return copy;
    }
}
