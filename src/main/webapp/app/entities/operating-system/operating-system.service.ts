import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OperatingSystem } from './operating-system.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OperatingSystem>;

@Injectable()
export class OperatingSystemService {

    private resourceUrl =  SERVER_API_URL + 'api/operating-systems';

    constructor(private http: HttpClient) { }

    create(operatingSystem: OperatingSystem): Observable<EntityResponseType> {
        const copy = this.convert(operatingSystem);
        return this.http.post<OperatingSystem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(operatingSystem: OperatingSystem): Observable<EntityResponseType> {
        const copy = this.convert(operatingSystem);
        return this.http.put<OperatingSystem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OperatingSystem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OperatingSystem[]>> {
        const options = createRequestOption(req);
        return this.http.get<OperatingSystem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OperatingSystem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OperatingSystem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OperatingSystem[]>): HttpResponse<OperatingSystem[]> {
        const jsonResponse: OperatingSystem[] = res.body;
        const body: OperatingSystem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OperatingSystem.
     */
    private convertItemFromServer(operatingSystem: OperatingSystem): OperatingSystem {
        const copy: OperatingSystem = Object.assign({}, operatingSystem);
        return copy;
    }

    /**
     * Convert a OperatingSystem to a JSON which can be sent to the server.
     */
    private convert(operatingSystem: OperatingSystem): OperatingSystem {
        const copy: OperatingSystem = Object.assign({}, operatingSystem);
        return copy;
    }
}