import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CardProvider } from './card-provider.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CardProvider>;

@Injectable()
export class CardProviderService {

    private resourceUrl =  SERVER_API_URL + 'api/card-providers';

    constructor(private http: HttpClient) { }

    create(cardProvider: CardProvider): Observable<EntityResponseType> {
        const copy = this.convert(cardProvider);
        return this.http.post<CardProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cardProvider: CardProvider): Observable<EntityResponseType> {
        const copy = this.convert(cardProvider);
        return this.http.put<CardProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CardProvider>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CardProvider[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardProvider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardProvider[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardProvider = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CardProvider[]>): HttpResponse<CardProvider[]> {
        const jsonResponse: CardProvider[] = res.body;
        const body: CardProvider[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CardProvider.
     */
    private convertItemFromServer(cardProvider: CardProvider): CardProvider {
        const copy: CardProvider = Object.assign({}, cardProvider);
        return copy;
    }

    /**
     * Convert a CardProvider to a JSON which can be sent to the server.
     */
    private convert(cardProvider: CardProvider): CardProvider {
        const copy: CardProvider = Object.assign({}, cardProvider);
        return copy;
    }
}
