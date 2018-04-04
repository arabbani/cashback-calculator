import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Bank } from './bank.model';

type EntityResponseType = HttpResponse<Bank>;

@Injectable()
export class BankService {

    private resourceUrl = SERVER_API_URL + 'api/banks';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(bank: Bank): Observable<EntityResponseType> {
        return this.http.post<Bank>(this.resourceUrl, bank, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bank: Bank): Observable<EntityResponseType> {
        return this.http.put<Bank>(this.resourceUrl, bank, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bank>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Bank[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bank[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bank[]>) => this.convertArrayResponse(res));
    }

    findWithType(req?: any): Observable<HttpResponse<Bank[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bank[]>(`${this.resourceUrl}/with/type`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bank[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bank = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Bank[]>): HttpResponse<Bank[]> {
        const body: Bank[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): Bank[] {
        return this.jsogService.deserializeArray(json, Bank);
    }

    private deserializeObject(json: any): Bank {
        return this.jsogService.deserializeObject(json, Bank);
    }
}
