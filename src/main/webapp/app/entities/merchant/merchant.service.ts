import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Merchant } from './merchant.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Merchant>;

@Injectable()
export class MerchantService {

    private resourceUrl =  SERVER_API_URL + 'api/merchants';

    constructor(private http: HttpClient) { }

    create(merchant: Merchant): Observable<EntityResponseType> {
        const copy = this.convert(merchant);
        return this.http.post<Merchant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(merchant: Merchant): Observable<EntityResponseType> {
        const copy = this.convert(merchant);
        return this.http.put<Merchant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Merchant>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Merchant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Merchant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Merchant[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Merchant = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Merchant[]>): HttpResponse<Merchant[]> {
        const jsonResponse: Merchant[] = res.body;
        const body: Merchant[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Merchant.
     */
    private convertItemFromServer(merchant: Merchant): Merchant {
        const copy: Merchant = Object.assign({}, merchant);
        return copy;
    }

    /**
     * Convert a Merchant to a JSON which can be sent to the server.
     */
    private convert(merchant: Merchant): Merchant {
        const copy: Merchant = Object.assign({}, merchant);
        return copy;
    }
}
