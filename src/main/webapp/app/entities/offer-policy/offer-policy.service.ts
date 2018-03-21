import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OfferPolicy } from './offer-policy.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OfferPolicy>;

@Injectable()
export class OfferPolicyService {

    private resourceUrl =  SERVER_API_URL + 'api/offer-policies';

    constructor(private http: HttpClient) { }

    create(offerPolicy: OfferPolicy): Observable<EntityResponseType> {
        const copy = this.convert(offerPolicy);
        return this.http.post<OfferPolicy>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offerPolicy: OfferPolicy): Observable<EntityResponseType> {
        const copy = this.convert(offerPolicy);
        return this.http.put<OfferPolicy>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfferPolicy>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OfferPolicy[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfferPolicy[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfferPolicy[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfferPolicy = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OfferPolicy[]>): HttpResponse<OfferPolicy[]> {
        const jsonResponse: OfferPolicy[] = res.body;
        const body: OfferPolicy[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OfferPolicy.
     */
    private convertItemFromServer(offerPolicy: OfferPolicy): OfferPolicy {
        const copy: OfferPolicy = Object.assign({}, offerPolicy);
        return copy;
    }

    /**
     * Convert a OfferPolicy to a JSON which can be sent to the server.
     */
    private convert(offerPolicy: OfferPolicy): OfferPolicy {
        const copy: OfferPolicy = Object.assign({}, offerPolicy);
        return copy;
    }
}
