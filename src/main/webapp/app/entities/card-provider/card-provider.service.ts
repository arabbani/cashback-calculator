import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { CardProvider } from './card-provider.model';

type EntityResponseType = HttpResponse<CardProvider>;

@Injectable()
export class CardProviderService {

    private resourceUrl = SERVER_API_URL + 'api/card-providers';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

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
        return this.http.get<CardProvider>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<CardProvider[]>> {
        const options = createRequestOption(req);
        return this.http.get<CardProvider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CardProvider[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CardProvider = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<CardProvider[]>): HttpResponse<CardProvider[]> {
        const body: CardProvider[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a CardProvider to a JSON which can be sent to the server.
     */
    private convert(cardProvider: CardProvider): CardProvider {
        const copy: CardProvider = Object.assign({}, cardProvider);
        return copy;
    }

    private deserializeArray(json: any): CardProvider[] {
        return this.jsogService.deserializeArray(json, CardProvider);
    }

    private deserializeObject(json: any): CardProvider {
        return this.jsogService.deserializeObject(json, CardProvider);
    }

}
