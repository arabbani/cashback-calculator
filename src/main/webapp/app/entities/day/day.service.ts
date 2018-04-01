import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Day } from './day.model';

type EntityResponseType = HttpResponse<Day>;

@Injectable()
export class DayService {

    private resourceUrl = SERVER_API_URL + 'api/days';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(day: Day): Observable<EntityResponseType> {
        return this.http.post<Day>(this.resourceUrl, day, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(day: Day): Observable<EntityResponseType> {
        return this.http.put<Day>(this.resourceUrl, day, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Day>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Day[]>> {
        const options = createRequestOption(req);
        return this.http.get<Day[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Day[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Day = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Day[]>): HttpResponse<Day[]> {
        const body: Day[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): Day[] {
        return this.jsogService.deserializeArray(json, Day);
    }

    private deserializeObject(json: any): Day {
        return this.jsogService.deserializeObject(json, Day);
    }
}
