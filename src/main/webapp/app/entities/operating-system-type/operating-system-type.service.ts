import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { OperatingSystemType } from './operating-system-type.model';

type EntityResponseType = HttpResponse<OperatingSystemType>;

@Injectable()
export class OperatingSystemTypeService {

    private resourceUrl = SERVER_API_URL + 'api/operating-system-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(operatingSystemType: OperatingSystemType): Observable<EntityResponseType> {
        return this.http.post<OperatingSystemType>(this.resourceUrl, operatingSystemType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(operatingSystemType: OperatingSystemType): Observable<EntityResponseType> {
        return this.http.put<OperatingSystemType>(this.resourceUrl, operatingSystemType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OperatingSystemType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<OperatingSystemType[]>> {
        const options = createRequestOption(req);
        return this.http.get<OperatingSystemType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OperatingSystemType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OperatingSystemType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<OperatingSystemType[]>): HttpResponse<OperatingSystemType[]> {
        const body: OperatingSystemType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): OperatingSystemType[] {
        return this.jsogService.deserializeArray(json, OperatingSystemType);
    }

    private deserializeObject(json: any): OperatingSystemType {
        return this.jsogService.deserializeObject(json, OperatingSystemType);
    }
}
