import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OfferReturn } from './offer-return.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<OfferReturn>;

@Injectable()
export class OfferReturnService {

    private resourceUrl =  SERVER_API_URL + 'api/offer-returns';

    constructor(private http: HttpClient) { }

    create(offerReturn: OfferReturn): Observable<EntityResponseType> {
        const copy = this.convert(offerReturn);
        return this.http.post<OfferReturn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offerReturn: OfferReturn): Observable<EntityResponseType> {
        const copy = this.convert(offerReturn);
        return this.http.put<OfferReturn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfferReturn>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OfferReturn[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfferReturn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfferReturn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfferReturn = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OfferReturn[]>): HttpResponse<OfferReturn[]> {
        const jsonResponse: OfferReturn[] = res.body;
        const body: OfferReturn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OfferReturn.
     */
    private convertItemFromServer(offerReturn: OfferReturn): OfferReturn {
        const copy: OfferReturn = Object.assign({}, offerReturn);
        return copy;
    }

    /**
     * Convert a OfferReturn to a JSON which can be sent to the server.
     */
    private convert(offerReturn: OfferReturn): OfferReturn {
        const copy: OfferReturn = Object.assign({}, offerReturn);
        return copy;
    }
}
