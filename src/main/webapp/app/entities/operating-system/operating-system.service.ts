import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { OperatingSystem } from './operating-system.model';

type EntityResponseType = HttpResponse<OperatingSystem>;

@Injectable()
export class OperatingSystemService {

    private resourceUrl = SERVER_API_URL + 'api/operating-systems';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(operatingSystem: OperatingSystem): Observable<EntityResponseType> {
        return this.http.post<OperatingSystem>(this.resourceUrl, operatingSystem, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(operatingSystem: OperatingSystem): Observable<EntityResponseType> {
        return this.http.put<OperatingSystem>(this.resourceUrl, operatingSystem, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OperatingSystem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<OperatingSystem[]>> {
        const options = createRequestOption(req);
        return this.http.get<OperatingSystem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OperatingSystem[]>) => this.convertArrayResponse(res));
    }

    findAllWithType(req?: any): Observable<HttpResponse<OperatingSystem[]>> {
        const options = createRequestOption(req);
        return this.http.get<OperatingSystem[]>(`${this.resourceUrl}/with/type`, { params: options, observe: 'response' })
            .map((res: HttpResponse<OperatingSystem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OperatingSystem = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<OperatingSystem[]>): HttpResponse<OperatingSystem[]> {
        const body: OperatingSystem[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): OperatingSystem[] {
        return this.jsogService.deserializeArray(json, OperatingSystem);
    }

    private deserializeObject(json: any): OperatingSystem {
        return this.jsogService.deserializeObject(json, OperatingSystem);
    }
}
