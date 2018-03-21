import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReturnMode } from './return-mode.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ReturnMode>;

@Injectable()
export class ReturnModeService {

    private resourceUrl =  SERVER_API_URL + 'api/return-modes';

    constructor(private http: HttpClient) { }

    create(returnMode: ReturnMode): Observable<EntityResponseType> {
        const copy = this.convert(returnMode);
        return this.http.post<ReturnMode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(returnMode: ReturnMode): Observable<EntityResponseType> {
        const copy = this.convert(returnMode);
        return this.http.put<ReturnMode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReturnMode>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReturnMode[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnMode[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnMode[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnMode = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReturnMode[]>): HttpResponse<ReturnMode[]> {
        const jsonResponse: ReturnMode[] = res.body;
        const body: ReturnMode[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReturnMode.
     */
    private convertItemFromServer(returnMode: ReturnMode): ReturnMode {
        const copy: ReturnMode = Object.assign({}, returnMode);
        return copy;
    }

    /**
     * Convert a ReturnMode to a JSON which can be sent to the server.
     */
    private convert(returnMode: ReturnMode): ReturnMode {
        const copy: ReturnMode = Object.assign({}, returnMode);
        return copy;
    }
}
