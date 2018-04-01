import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { CardType } from './card-type.model';

type EntityResponseType = HttpResponse<CardType>;

@Injectable()
export class CardTypeService {

    private resourceUrl = SERVER_API_URL + 'api/card-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(cardType: CardType): Observable<EntityResponseType> {
        return this.http.post<CardType>(this.resourceUrl, cardType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cardType: CardType): Observable<EntityResponseType> {
        return this.http.put<CardType>(this.resourceUrl, cardType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<CardType[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<CardType[]>): HttpResponse<CardType[]> {
        const body: CardType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): CardType[] {
        return this.jsogService.deserializeArray(json, CardType);
    }

    private deserializeObject(json: any): CardType {
        return this.jsogService.deserializeObject(json, CardType);
    }
}
