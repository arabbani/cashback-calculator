import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { TravelType } from './travel-type.model';

type EntityResponseType = HttpResponse<TravelType>;

@Injectable()
export class TravelTypeService {

    private resourceUrl = SERVER_API_URL + 'api/travel-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(travelType: TravelType): Observable<EntityResponseType> {
        return this.http.post<TravelType>(this.resourceUrl, travelType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(travelType: TravelType): Observable<EntityResponseType> {
        return this.http.put<TravelType>(this.resourceUrl, travelType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TravelType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<TravelType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TravelType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TravelType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TravelType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<TravelType[]>): HttpResponse<TravelType[]> {
        const body: TravelType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): TravelType[] {
        return this.jsogService.deserializeArray(json, TravelType);
    }

    private deserializeObject(json: any): TravelType {
        return this.jsogService.deserializeObject(json, TravelType);
    }
}
