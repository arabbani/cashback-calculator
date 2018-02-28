import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { MainReturn } from './main-return.model';

export type EntityResponseType = HttpResponse<MainReturn>;

@Injectable()
export class MainReturnService {

    private resourceUrl = SERVER_API_URL + 'api/main-returns';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(mainReturn: MainReturn): Observable<EntityResponseType> {
        const copy = this.convert(mainReturn);
        return this.http.post<MainReturn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mainReturn: MainReturn): Observable<EntityResponseType> {
        const copy = this.convert(mainReturn);
        return this.http.put<MainReturn>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MainReturn>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MainReturn[]>> {
        const options = createRequestOption(req);
        return this.http.get<MainReturn[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MainReturn[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MainReturn = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<MainReturn[]>): HttpResponse<MainReturn[]> {
        const jsonResponse: MainReturn[] = this.deserializeArray(res.body);
        const body: MainReturn[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to MainReturn.
     */
    private convertItemFromServer(mainReturn: MainReturn): MainReturn {
        const copy: MainReturn = Object.assign({}, mainReturn);
        return copy;
    }

    /**
     * Convert a MainReturn to a JSON which can be sent to the server.
     */
    private convert(mainReturn: MainReturn): MainReturn {
        const copy: MainReturn = Object.assign({}, mainReturn);
        return copy;
    }

    private deserializeArray(json: any): MainReturn[] {
        return this.jsogService.deserializeArray(json, MainReturn);
    }

    private deserializeObject(json: any): MainReturn {
        return this.jsogService.deserializeObject(json, MainReturn);
    }
}
