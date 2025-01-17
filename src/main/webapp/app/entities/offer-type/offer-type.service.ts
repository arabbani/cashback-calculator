import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { OfferType } from './offer-type.model';

type EntityResponseType = HttpResponse<OfferType>;

@Injectable()
export class OfferTypeService {

    private resourceUrl = SERVER_API_URL + 'api/offer-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(offerType: OfferType): Observable<EntityResponseType> {
        const copy = this.convert(offerType);
        return this.http.post<OfferType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offerType: OfferType): Observable<EntityResponseType> {
        const copy = this.convert(offerType);
        return this.http.put<OfferType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfferType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<OfferType[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfferType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfferType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfferType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<OfferType[]>): HttpResponse<OfferType[]> {
        const body: OfferType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a OfferType to a JSON which can be sent to the server.
     */
    private convert(offerType: OfferType): OfferType {
        const copy: OfferType = Object.assign({}, offerType);
        return copy;
    }

    private deserializeArray(json: any): OfferType[] {
        return this.jsogService.deserializeArray(json, OfferType);
    }

    private deserializeObject(json: any): OfferType {
        return this.jsogService.deserializeObject(json, OfferType);
    }
}
