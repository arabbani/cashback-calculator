import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { AffiliateCredential } from './affiliate-credential.model';

type EntityResponseType = HttpResponse<AffiliateCredential>;

@Injectable()
export class AffiliateCredentialService {

    private resourceUrl =  SERVER_API_URL + 'api/affiliate-credentials';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(affiliateCredential: AffiliateCredential): Observable<EntityResponseType> {
        const copy = this.convert(affiliateCredential);
        return this.http.post<AffiliateCredential>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(affiliateCredential: AffiliateCredential): Observable<EntityResponseType> {
        const copy = this.convert(affiliateCredential);
        return this.http.put<AffiliateCredential>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AffiliateCredential>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AffiliateCredential[]>> {
        const options = createRequestOption(req);
        return this.http.get<AffiliateCredential[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AffiliateCredential[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AffiliateCredential = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AffiliateCredential[]>): HttpResponse<AffiliateCredential[]> {
        const jsonResponse: AffiliateCredential[] = this.deserializeArray(res.body);
        const body: AffiliateCredential[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AffiliateCredential.
     */
    private convertItemFromServer(affiliateCredential: AffiliateCredential): AffiliateCredential {
        const copy: AffiliateCredential = Object.assign({}, affiliateCredential);
        return copy;
    }

    /**
     * Convert a AffiliateCredential to a JSON which can be sent to the server.
     */
    private convert(affiliateCredential: AffiliateCredential): AffiliateCredential {
        const copy: AffiliateCredential = Object.assign({}, affiliateCredential);
        return copy;
    }

    private deserializeArray(json: any): AffiliateCredential[] {
        return this.jsogService.deserializeArray(json, AffiliateCredential);
    }

    private deserializeObject(json: any): AffiliateCredential {
        return this.jsogService.deserializeObject(json, AffiliateCredential);
    }
}
