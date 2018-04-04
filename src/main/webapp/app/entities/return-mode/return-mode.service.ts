import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { ReturnMode } from './return-mode.model';

type EntityResponseType = HttpResponse<ReturnMode>;

@Injectable()
export class ReturnModeService {

    private resourceUrl = SERVER_API_URL + 'api/return-modes';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

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
        return this.http.get<ReturnMode>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<ReturnMode[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReturnMode[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReturnMode[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReturnMode = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ReturnMode[]>): HttpResponse<ReturnMode[]> {
        const body: ReturnMode[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a ReturnMode to a JSON which can be sent to the server.
     */
    private convert(returnMode: ReturnMode): ReturnMode {
        const copy: ReturnMode = Object.assign({}, returnMode);
        return copy;
    }

    private deserializeArray(json: any): ReturnMode[] {
        return this.jsogService.deserializeArray(json, ReturnMode);
    }

    private deserializeObject(json: any): ReturnMode {
        return this.jsogService.deserializeObject(json, ReturnMode);
    }
}
