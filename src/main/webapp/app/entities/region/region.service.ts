import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Region } from './region.model';

type EntityResponseType = HttpResponse<Region>;

@Injectable()
export class RegionService {

    private resourceUrl = SERVER_API_URL + 'api/regions';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(region: Region): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.post<Region>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(region: Region): Observable<EntityResponseType> {
        const copy = this.convert(region);
        return this.http.put<Region>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Region>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Region[]>> {
        const options = createRequestOption(req);
        return this.http.get<Region[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Region[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Region = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Region[]>): HttpResponse<Region[]> {
        const body: Region[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a Region to a JSON which can be sent to the server.
     */
    private convert(region: Region): Region {
        const copy: Region = Object.assign({}, region);
        return copy;
    }

    private deserializeArray(json: any): Region[] {
        return this.jsogService.deserializeArray(json, Region);
    }

    private deserializeObject(json: any): Region {
        return this.jsogService.deserializeObject(json, Region);
    }
}
