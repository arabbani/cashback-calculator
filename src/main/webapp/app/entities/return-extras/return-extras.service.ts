import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReturnExtras } from './return-extras.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ReturnExtras>;

@Injectable()
export class ReturnExtrasService {

    private resourceUrl =  SERVER_API_URL + 'api/return-extras';

    constructor(private http: HttpClient) { }

    create(returnExtras: ReturnExtras): Observable<EntityResponseType> {
        const copy = this.convert(returnExtras);
        return this.http.post<ReturnExtras>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(returnExtras: ReturnExtras): Observable<EntityResponseType> {
        const copy = this.convert(returnExtras);
        return this.http.put<ReturnExtras>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReturnExtras>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReturnExtras[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnExtras[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnExtras[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnExtras = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReturnExtras[]>): HttpResponse<ReturnExtras[]> {
        const jsonResponse: ReturnExtras[] = res.body;
        const body: ReturnExtras[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReturnExtras.
     */
    private convertItemFromServer(returnExtras: ReturnExtras): ReturnExtras {
        const copy: ReturnExtras = Object.assign({}, returnExtras);
        return copy;
    }

    /**
     * Convert a ReturnExtras to a JSON which can be sent to the server.
     */
    private convert(returnExtras: ReturnExtras): ReturnExtras {
        const copy: ReturnExtras = Object.assign({}, returnExtras);
        return copy;
    }
}
