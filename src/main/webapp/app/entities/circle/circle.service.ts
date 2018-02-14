import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Circle } from './circle.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Circle>;

@Injectable()
export class CircleService {

    private resourceUrl =  SERVER_API_URL + 'api/circles';

    constructor(private http: HttpClient) { }

    create(circle: Circle): Observable<EntityResponseType> {
        const copy = this.convert(circle);
        return this.http.post<Circle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(circle: Circle): Observable<EntityResponseType> {
        const copy = this.convert(circle);
        return this.http.put<Circle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Circle>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Circle[]>> {
        const options = createRequestOption(req);
        return this.http.get<Circle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Circle[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Circle = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Circle[]>): HttpResponse<Circle[]> {
        const jsonResponse: Circle[] = res.body;
        const body: Circle[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Circle.
     */
    private convertItemFromServer(circle: Circle): Circle {
        const copy: Circle = Object.assign({}, circle);
        return copy;
    }

    /**
     * Convert a Circle to a JSON which can be sent to the server.
     */
    private convert(circle: Circle): Circle {
        const copy: Circle = Object.assign({}, circle);
        return copy;
    }
}
