import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OfferPayment } from './offer-payment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OfferPayment>;

@Injectable()
export class OfferPaymentService {

    private resourceUrl =  SERVER_API_URL + 'api/offer-payments';

    constructor(private http: HttpClient) { }

    create(offerPayment: OfferPayment): Observable<EntityResponseType> {
        const copy = this.convert(offerPayment);
        return this.http.post<OfferPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offerPayment: OfferPayment): Observable<EntityResponseType> {
        const copy = this.convert(offerPayment);
        return this.http.put<OfferPayment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfferPayment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OfferPayment[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfferPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfferPayment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfferPayment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OfferPayment[]>): HttpResponse<OfferPayment[]> {
        const jsonResponse: OfferPayment[] = res.body;
        const body: OfferPayment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OfferPayment.
     */
    private convertItemFromServer(offerPayment: OfferPayment): OfferPayment {
        const copy: OfferPayment = Object.assign({}, offerPayment);
        return copy;
    }

    /**
     * Convert a OfferPayment to a JSON which can be sent to the server.
     */
    private convert(offerPayment: OfferPayment): OfferPayment {
        const copy: OfferPayment = Object.assign({}, offerPayment);
        return copy;
    }
}
