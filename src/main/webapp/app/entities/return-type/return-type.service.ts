import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReturnType } from './return-type.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ReturnType>;

@Injectable()
export class ReturnTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/return-types';

    constructor(private http: HttpClient) { }

    create(returnType: ReturnType): Observable<EntityResponseType> {
        const copy = this.convert(returnType);
        return this.http.post<ReturnType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(returnType: ReturnType): Observable<EntityResponseType> {
        const copy = this.convert(returnType);
        return this.http.put<ReturnType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReturnType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReturnType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReturnType[]>): HttpResponse<ReturnType[]> {
        const jsonResponse: ReturnType[] = res.body;
        const body: ReturnType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReturnType.
     */
    private convertItemFromServer(returnType: ReturnType): ReturnType {
        const copy: ReturnType = Object.assign({}, returnType);
        return copy;
    }

    /**
     * Convert a ReturnType to a JSON which can be sent to the server.
     */
    private convert(returnType: ReturnType): ReturnType {
        const copy: ReturnType = Object.assign({}, returnType);
        return copy;
    }
}
