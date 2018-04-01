import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { OfferPolicy } from './offer-policy.model';

type EntityResponseType = HttpResponse<OfferPolicy>;

@Injectable()
export class OfferPolicyService {

    private resourceUrl = SERVER_API_URL + 'api/offer-policies';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(offerPolicy: OfferPolicy): Observable<EntityResponseType> {
        return this.http.post<OfferPolicy>(this.resourceUrl, offerPolicy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offerPolicy: OfferPolicy): Observable<EntityResponseType> {
        return this.http.put<OfferPolicy>(this.resourceUrl, offerPolicy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfferPolicy>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<OfferPolicy[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfferPolicy[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfferPolicy[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfferPolicy = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<OfferPolicy[]>): HttpResponse<OfferPolicy[]> {
        const body: OfferPolicy[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): OfferPolicy[] {
        return this.jsogService.deserializeArray(json, OfferPolicy);
    }

    private deserializeObject(json: any): OfferPolicy {
        return this.jsogService.deserializeObject(json, OfferPolicy);
    }
}
