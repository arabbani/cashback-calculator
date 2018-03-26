import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ReechargePlanType } from './reecharge-plan-type.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ReechargePlanType>;

@Injectable()
export class ReechargePlanTypeService {

    private resourceUrl = SERVER_API_URL + 'api/reecharge-plan-types';

    constructor(private http: HttpClient) { }

    create(reechargePlanType: ReechargePlanType): Observable<EntityResponseType> {
        const copy = this.convert(reechargePlanType);
        return this.http.post<ReechargePlanType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reechargePlanType: ReechargePlanType): Observable<EntityResponseType> {
        const copy = this.convert(reechargePlanType);
        return this.http.put<ReechargePlanType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReechargePlanType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReechargePlanType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReechargePlanType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReechargePlanType[]>) => this.convertArrayResponse(res));
    }

    getDataPlans(): Observable<HttpResponse<ReechargePlanType[]>> {
        return this.http.get<ReechargePlanType[]>(`${this.resourceUrl}/data-plans`, { observe: 'response' })
            .map((res: HttpResponse<ReechargePlanType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReechargePlanType = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ReechargePlanType[]>): HttpResponse<ReechargePlanType[]> {
        const jsonResponse: ReechargePlanType[] = res.body;
        const body: ReechargePlanType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ReechargePlanType.
     */
    private convertItemFromServer(reechargePlanType: ReechargePlanType): ReechargePlanType {
        const copy: ReechargePlanType = Object.assign({}, reechargePlanType);
        return copy;
    }

    /**
     * Convert a ReechargePlanType to a JSON which can be sent to the server.
     */
    private convert(reechargePlanType: ReechargePlanType): ReechargePlanType {
        const copy: ReechargePlanType = Object.assign({}, reechargePlanType);
        return copy;
    }
}
