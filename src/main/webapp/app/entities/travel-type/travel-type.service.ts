import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TravelType } from './travel-type.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<TravelType>;

@Injectable()
export class TravelTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/travel-types';

    constructor(private http: HttpClient) { }

    create(travelType: TravelType): Observable<EntityResponseType> {
        const copy = this.convert(travelType);
        return this.http.post<TravelType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(travelType: TravelType): Observable<EntityResponseType> {
        const copy = this.convert(travelType);
        return this.http.put<TravelType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TravelType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TravelType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TravelType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TravelType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TravelType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TravelType[]>): HttpResponse<TravelType[]> {
        const jsonResponse: TravelType[] = res.body;
        const body: TravelType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TravelType.
     */
    private convertItemFromServer(travelType: TravelType): TravelType {
        const copy: TravelType = Object.assign({}, travelType);
        return copy;
    }

    /**
     * Convert a TravelType to a JSON which can be sent to the server.
     */
    private convert(travelType: TravelType): TravelType {
        const copy: TravelType = Object.assign({}, travelType);
        return copy;
    }
}
