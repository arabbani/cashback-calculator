import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CardType } from './card-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardType>;

@Injectable()
export class CardTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/card-types';

    constructor(private http: HttpClient) { }

    create(cardType: CardType): Observable<EntityResponseType> {
        const copy = this.convert(cardType);
        return this.http.post<CardType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cardType: CardType): Observable<EntityResponseType> {
        const copy = this.convert(cardType);
        return this.http.put<CardType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardType[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardType[]>): HttpResponse<CardType[]> {
        const jsonResponse: CardType[] = res.body;
        const body: CardType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardType.
     */
    private convertItemFromServer(cardType: CardType): CardType {
        const copy: CardType = Object.assign({}, cardType);
        return copy;
    }

    /**
     * Convert a CardType to a JSON which can be sent to the server.
     */
    private convert(cardType: CardType): CardType {
        const copy: CardType = Object.assign({}, cardType);
        return copy;
    }
}