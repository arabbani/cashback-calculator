import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { JhiDateUtils } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Offer } from './offer.model';

type EntityResponseType = HttpResponse<Offer>;

@Injectable()
export class OfferService {

    private resourceUrl = SERVER_API_URL + 'api/offers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private jsogService: JsogService) { }

    create(offer: Offer): Observable<EntityResponseType> {
        return this.http.post<Offer>(this.resourceUrl, offer, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offer: Offer): Observable<EntityResponseType> {
        return this.http.put<Offer>(this.resourceUrl, offer, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Offer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findOneForAdminView(id: number): Observable<EntityResponseType> {
        return this.http.get<Offer>(`${this.resourceUrl}/for/admin-view/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Offer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Offer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Offer[]>) => this.convertArrayResponse(res));
    }

    findReechargeInfoById(id: number): Observable<EntityResponseType> {
        return this.http.get<Offer>(`${this.resourceUrl}/with/reechargeInfo/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Offer = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Offer[]>): HttpResponse<Offer[]> {
        const body: Offer[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Offer.
     */
    private convertItemFromServer(offer: Offer): Offer {
        const copy: Offer = Object.assign({}, offer);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(offer.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(offer.endDate);
        return copy;
    }

    private deserializeArray(json: any): Offer[] {
        return this.jsogService.deserializeArray(json, Offer);
    }

    private deserializeObject(json: any): Offer {
        return this.jsogService.deserializeObject(json, Offer);
    }
}
