import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReturnInfo } from './return-info.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ReturnInfo>;

@Injectable()
export class ReturnInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/return-infos';

    constructor(private http: HttpClient) { }

    create(returnInfo: ReturnInfo): Observable<EntityResponseType> {
        const copy = this.convert(returnInfo);
        return this.http.post<ReturnInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(returnInfo: ReturnInfo): Observable<EntityResponseType> {
        const copy = this.convert(returnInfo);
        return this.http.put<ReturnInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReturnInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReturnInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReturnInfo[]>): HttpResponse<ReturnInfo[]> {
        const jsonResponse: ReturnInfo[] = res.body;
        const body: ReturnInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReturnInfo.
     */
    private convertItemFromServer(returnInfo: ReturnInfo): ReturnInfo {
        const copy: ReturnInfo = Object.assign({}, returnInfo);
        return copy;
    }

    /**
     * Convert a ReturnInfo to a JSON which can be sent to the server.
     */
    private convert(returnInfo: ReturnInfo): ReturnInfo {
        const copy: ReturnInfo = Object.assign({}, returnInfo);
        return copy;
    }
}
