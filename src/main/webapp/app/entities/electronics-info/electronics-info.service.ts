import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { ElectronicsInfo } from './electronics-info.model';

export type EntityResponseType = HttpResponse<ElectronicsInfo>;

@Injectable()
export class ElectronicsInfoService {

    private resourceUrl = SERVER_API_URL + 'api/electronics-infos';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(electronicsInfo: ElectronicsInfo): Observable<EntityResponseType> {
        const copy = this.convert(electronicsInfo);
        return this.http.post<ElectronicsInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(electronicsInfo: ElectronicsInfo): Observable<EntityResponseType> {
        const copy = this.convert(electronicsInfo);
        return this.http.put<ElectronicsInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ElectronicsInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ElectronicsInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<ElectronicsInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ElectronicsInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ElectronicsInfo = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ElectronicsInfo[]>): HttpResponse<ElectronicsInfo[]> {
        const jsonResponse: ElectronicsInfo[] = this.deserializeArray(res.body);
        const body: ElectronicsInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ElectronicsInfo.
     */
    private convertItemFromServer(electronicsInfo: ElectronicsInfo): ElectronicsInfo {
        const copy: ElectronicsInfo = Object.assign({}, electronicsInfo);
        return copy;
    }

    /**
     * Convert a ElectronicsInfo to a JSON which can be sent to the server.
     */
    private convert(electronicsInfo: ElectronicsInfo): ElectronicsInfo {
        const copy: ElectronicsInfo = Object.assign({}, electronicsInfo);
        return copy;
    }

    private deserializeArray(json: any): ElectronicsInfo[] {
        return this.jsogService.deserializeArray(json, ElectronicsInfo);
    }

    private deserializeObject(json: any): ElectronicsInfo {
        return this.jsogService.deserializeObject(json, ElectronicsInfo);
    }
}
