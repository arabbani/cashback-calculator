import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OperatingSystemType } from './operating-system-type.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<OperatingSystemType>;

@Injectable()
export class OperatingSystemTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/operating-system-types';

    constructor(private http: HttpClient) { }

    create(operatingSystemType: OperatingSystemType): Observable<EntityResponseType> {
        const copy = this.convert(operatingSystemType);
        return this.http.post<OperatingSystemType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(operatingSystemType: OperatingSystemType): Observable<EntityResponseType> {
        const copy = this.convert(operatingSystemType);
        return this.http.put<OperatingSystemType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OperatingSystemType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OperatingSystemType[]>> {
        const options = createRequestOption(req);
        return this.http.get<OperatingSystemType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OperatingSystemType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OperatingSystemType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OperatingSystemType[]>): HttpResponse<OperatingSystemType[]> {
        const jsonResponse: OperatingSystemType[] = res.body;
        const body: OperatingSystemType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OperatingSystemType.
     */
    private convertItemFromServer(operatingSystemType: OperatingSystemType): OperatingSystemType {
        const copy: OperatingSystemType = Object.assign({}, operatingSystemType);
        return copy;
    }

    /**
     * Convert a OperatingSystemType to a JSON which can be sent to the server.
     */
    private convert(operatingSystemType: OperatingSystemType): OperatingSystemType {
        const copy: OperatingSystemType = Object.assign({}, operatingSystemType);
        return copy;
    }
}
