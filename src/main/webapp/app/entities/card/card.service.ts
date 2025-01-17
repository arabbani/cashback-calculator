import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Card } from './card.model';

type EntityResponseType = HttpResponse<Card>;

@Injectable()
export class CardService {

    private resourceUrl = SERVER_API_URL + 'api/cards';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(card: Card): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.post<Card>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(card: Card): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.put<Card>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Card>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Card[]>> {
        const options = createRequestOption(req);
        return this.http.get<Card[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Card[]>) => this.convertArrayResponse(res));
    }

    findWithTypeAndProviders(req?: any): Observable<HttpResponse<Card[]>> {
        const options = createRequestOption(req);
        return this.http.get<Card[]>(`${this.resourceUrl}/with/type-providers`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Card[]>) => this.convertArrayResponse(res));
    }

    findWithTypeAndBanks(req?: any): Observable<HttpResponse<Card[]>> {
        const options = createRequestOption(req);
        return this.http.get<Card[]>(`${this.resourceUrl}/with/type-banks`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Card[]>) => this.convertArrayResponse(res));
    }

    findWithTypeAndBankAndProviders(req?: any): Observable<HttpResponse<Card[]>> {
        const options = createRequestOption(req);
        return this.http.get<Card[]>(`${this.resourceUrl}/with/type-bank-providers`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Card[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Card = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Card[]>): HttpResponse<Card[]> {
        const body: Card[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a Card to a JSON which can be sent to the server.
     */
    private convert(card: Card): Card {
        const copy: Card = Object.assign({}, card);
        return copy;
    }

    private deserializeArray(json: any): Card[] {
        return this.jsogService.deserializeArray(json, Card);
    }

    private deserializeObject(json: any): Card {
        return this.jsogService.deserializeObject(json, Card);
    }
}
