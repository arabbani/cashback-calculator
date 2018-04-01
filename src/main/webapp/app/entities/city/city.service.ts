import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { City } from './city.model';

type EntityResponseType = HttpResponse<City>;

@Injectable()
export class CityService {

    private resourceUrl = SERVER_API_URL + 'api/cities';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(city: City): Observable<EntityResponseType> {
        return this.http.post<City>(this.resourceUrl, city, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(city: City): Observable<EntityResponseType> {
        return this.http.put<City>(this.resourceUrl, city, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<City>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<City[]>> {
        const options = createRequestOption(req);
        return this.http.get<City[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<City[]>) => this.convertArrayResponse(res));
    }

    findAllWithState(req?: any): Observable<HttpResponse<City[]>> {
        const options = createRequestOption(req);
        return this.http.get<City[]>(`${this.resourceUrl}/with/state`, { params: options, observe: 'response' })
            .map((res: HttpResponse<City[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: City = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<City[]>): HttpResponse<City[]> {
        const body: City[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): City[] {
        return this.jsogService.deserializeArray(json, City);
    }

    private deserializeObject(json: any): City {
        return this.jsogService.deserializeObject(json, City);
    }
}
