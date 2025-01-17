import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { BankType } from './bank-type.model';

type EntityResponseType = HttpResponse<BankType>;

@Injectable()
export class BankTypeService {

    private resourceUrl = SERVER_API_URL + 'api/bank-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(bankType: BankType): Observable<EntityResponseType> {
        const copy = this.convert(bankType);
        return this.http.post<BankType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bankType: BankType): Observable<EntityResponseType> {
        const copy = this.convert(bankType);
        return this.http.put<BankType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<BankType[]>> {
        const options = createRequestOption(req);
        return this.http.get<BankType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BankType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<BankType[]>): HttpResponse<BankType[]> {
        const body: BankType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a BankType to a JSON which can be sent to the server.
     */
    private convert(bankType: BankType): BankType {
        const copy: BankType = Object.assign({}, bankType);
        return copy;
    }

    private deserializeArray(json: any): BankType[] {
        return this.jsogService.deserializeArray(json, BankType);
    }

    private deserializeObject(json: any): BankType {
        return this.jsogService.deserializeObject(json, BankType);
    }
}
