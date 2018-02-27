import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Affiliate } from './affiliate.model';

export type EntityResponseType = HttpResponse<Affiliate>;

@Injectable()
export class AffiliateService {

    private resourceUrl = SERVER_API_URL + 'api/affiliates';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(affiliate: Affiliate): Observable<EntityResponseType> {
        const copy = this.convert(affiliate);
        return this.http.post<Affiliate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(affiliate: Affiliate): Observable<EntityResponseType> {
        const copy = this.convert(affiliate);
        return this.http.put<Affiliate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Affiliate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Affiliate[]>> {
        const options = createRequestOption(req);
        return this.http.get<Affiliate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Affiliate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Affiliate = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Affiliate[]>): HttpResponse<Affiliate[]> {
        const jsonResponse: Affiliate[] = this.deserializeArray(res.body);
        const body: Affiliate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Affiliate.
     */
    private convertItemFromServer(affiliate: Affiliate): Affiliate {
        const copy: Affiliate = Object.assign({}, affiliate);
        return copy;
    }

    /**
     * Convert a Affiliate to a JSON which can be sent to the server.
     */
    private convert(affiliate: Affiliate): Affiliate {
        const copy: Affiliate = Object.assign({}, affiliate);
        return copy;
    }

    private deserializeArray(json: any): Affiliate[] {
        return this.jsogService.deserializeArray(json, Affiliate);
    }

    private deserializeObject(json: any): Affiliate {
        return this.jsogService.deserializeObject(json, Affiliate);
    }
}
