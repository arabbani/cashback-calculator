import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { FlightClass } from './flight-class.model';

type EntityResponseType = HttpResponse<FlightClass>;

@Injectable()
export class FlightClassService {

    private resourceUrl = SERVER_API_URL + 'api/flight-classes';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(flightClass: FlightClass): Observable<EntityResponseType> {
        return this.http.post<FlightClass>(this.resourceUrl, flightClass, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(flightClass: FlightClass): Observable<EntityResponseType> {
        return this.http.put<FlightClass>(this.resourceUrl, flightClass, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FlightClass>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<FlightClass[]>> {
        const options = createRequestOption(req);
        return this.http.get<FlightClass[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FlightClass[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FlightClass = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<FlightClass[]>): HttpResponse<FlightClass[]> {
        const body: FlightClass[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): FlightClass[] {
        return this.jsogService.deserializeArray(json, FlightClass);
    }

    private deserializeObject(json: any): FlightClass {
        return this.jsogService.deserializeObject(json, FlightClass);
    }
}
