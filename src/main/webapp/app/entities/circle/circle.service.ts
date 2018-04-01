import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Circle } from './circle.model';

type EntityResponseType = HttpResponse<Circle>;

@Injectable()
export class CircleService {

    private resourceUrl = SERVER_API_URL + 'api/circles';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(circle: Circle): Observable<EntityResponseType> {
        return this.http.post<Circle>(this.resourceUrl, circle, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(circle: Circle): Observable<EntityResponseType> {
        return this.http.put<Circle>(this.resourceUrl, circle, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Circle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Circle[]>> {
        const options = createRequestOption(req);
        return this.http.get<Circle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Circle[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Circle = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Circle[]>): HttpResponse<Circle[]> {
        const body: Circle[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): Circle[] {
        return this.jsogService.deserializeArray(json, Circle);
    }

    private deserializeObject(json: any): Circle {
        return this.jsogService.deserializeObject(json, Circle);
    }
}
