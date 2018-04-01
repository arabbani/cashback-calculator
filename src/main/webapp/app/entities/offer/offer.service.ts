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
        // const copy = this.convert(offer);
        return this.http.post<Offer>(this.resourceUrl, offer, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(offer: Offer): Observable<EntityResponseType> {
        // const copy = this.convert(offer);
        return this.http.put<Offer>(this.resourceUrl, offer, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Offer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Offer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Offer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Offer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Offer = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Offer[]>): HttpResponse<Offer[]> {
        const jsonResponse: Offer[] = this.deserializeArray(res.body);
        const body: Offer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
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

    /**
     * Convert a Offer to a JSON which can be sent to the server.
     */
    private convert(offer: Offer): Offer {
        const copy: Offer = Object.assign({}, offer);

        copy.startDate = this.dateUtils.toDate(offer.startDate);

        copy.endDate = this.dateUtils.toDate(offer.endDate);
        return copy;
    }

    private deserializeArray(json: any): Offer[] {
        return this.jsogService.deserializeArray(json, Offer);
    }

    private deserializeObject(json: any): Offer {
        return this.jsogService.deserializeObject(json, Offer);
    }
}
