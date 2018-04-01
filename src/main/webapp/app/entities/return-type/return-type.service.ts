import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { ReturnType } from './return-type.model';

type EntityResponseType = HttpResponse<ReturnType>;

@Injectable()
export class ReturnTypeService {

    private resourceUrl = SERVER_API_URL + 'api/return-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(returnType: ReturnType): Observable<EntityResponseType> {
        return this.http.post<ReturnType>(this.resourceUrl, returnType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(returnType: ReturnType): Observable<EntityResponseType> {
        return this.http.put<ReturnType>(this.resourceUrl, returnType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReturnType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<ReturnType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ReturnType[]>): HttpResponse<ReturnType[]> {
        const body: ReturnType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): ReturnType[] {
        return this.jsogService.deserializeArray(json, ReturnType);
    }

    private deserializeObject(json: any): ReturnType {
        return this.jsogService.deserializeObject(json, ReturnType);
    }
}
