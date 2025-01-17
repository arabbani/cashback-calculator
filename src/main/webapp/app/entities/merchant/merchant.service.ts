import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Merchant } from './merchant.model';

type EntityResponseType = HttpResponse<Merchant>;

@Injectable()
export class MerchantService {

    private resourceUrl = SERVER_API_URL + 'api/merchants';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

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
        return this.http.get<Merchant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Merchant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Merchant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Merchant[]>) => this.convertArrayResponse(res));
    }

    findWithSubCategories(req?: any): Observable<HttpResponse<Merchant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Merchant[]>(`${this.resourceUrl}/with/subCategories`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Merchant[]>) => this.convertArrayResponse(res));
    }

    finBySubCategoryId(id: number): Observable<HttpResponse<Merchant[]>> {
        return this.http.get<Merchant[]>(`${this.resourceUrl}/by/subCategoryId/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Merchant[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Merchant = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Merchant[]>): HttpResponse<Merchant[]> {
        const body: Merchant[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a Merchant to a JSON which can be sent to the server.
     */
    private convert(merchant: Merchant): Merchant {
        const copy: Merchant = Object.assign({}, merchant);
        return copy;
    }

    private deserializeArray(json: any): Merchant[] {
        return this.jsogService.deserializeArray(json, Merchant);
    }

    private deserializeObject(json: any): Merchant {
        return this.jsogService.deserializeObject(json, Merchant);
    }
}
