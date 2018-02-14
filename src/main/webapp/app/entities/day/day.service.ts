import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Day } from './day.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Day>;

@Injectable()
export class DayService {

    private resourceUrl =  SERVER_API_URL + 'api/days';

    constructor(private http: HttpClient) { }

    create(day: Day): Observable<EntityResponseType> {
        const copy = this.convert(day);
        return this.http.post<Day>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(day: Day): Observable<EntityResponseType> {
        const copy = this.convert(day);
        return this.http.put<Day>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Day>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Day[]>> {
        const options = createRequestOption(req);
        return this.http.get<Day[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Day[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Day = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Day[]>): HttpResponse<Day[]> {
        const jsonResponse: Day[] = res.body;
        const body: Day[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Day.
     */
    private convertItemFromServer(day: Day): Day {
        const copy: Day = Object.assign({}, day);
        return copy;
    }

    /**
     * Convert a Day to a JSON which can be sent to the server.
     */
    private convert(day: Day): Day {
        const copy: Day = Object.assign({}, day);
        return copy;
    }
}
