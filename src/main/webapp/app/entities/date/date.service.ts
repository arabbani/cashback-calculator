import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Date } from './date.model';

type EntityResponseType = HttpResponse<Date>;

@Injectable()
export class DateService {

    private resourceUrl = SERVER_API_URL + 'api/dates';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(date: Date): Observable<EntityResponseType> {
        const copy = this.convert(date);
        return this.http.post<Date>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(date: Date): Observable<EntityResponseType> {
        const copy = this.convert(date);
        return this.http.put<Date>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Date>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Date[]>> {
        const options = createRequestOption(req);
        return this.http.get<Date[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Date[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Date = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Date[]>): HttpResponse<Date[]> {
        const body: Date[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a Date to a JSON which can be sent to the server.
     */
    private convert(date: Date): Date {
        const copy: Date = Object.assign({}, date);
        return copy;
    }

    private deserializeArray(json: any): Date[] {
        return this.jsogService.deserializeArray(json, Date);
    }

    private deserializeObject(json: any): Date {
        return this.jsogService.deserializeObject(json, Date);
    }
}
