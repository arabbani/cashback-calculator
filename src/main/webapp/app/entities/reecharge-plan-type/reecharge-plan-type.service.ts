import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { ReechargePlanType } from './reecharge-plan-type.model';

type EntityResponseType = HttpResponse<ReechargePlanType>;

@Injectable()
export class ReechargePlanTypeService {

    private resourceUrl = SERVER_API_URL + 'api/reecharge-plan-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(reechargePlanType: ReechargePlanType): Observable<EntityResponseType> {
        return this.http.post<ReechargePlanType>(this.resourceUrl, reechargePlanType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(reechargePlanType: ReechargePlanType): Observable<EntityResponseType> {
        return this.http.put<ReechargePlanType>(this.resourceUrl, reechargePlanType, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReechargePlanType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<ReechargePlanType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReechargePlanType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReechargePlanType[]>) => this.convertArrayResponse(res));
    }

    findAllDataPlans(): Observable<HttpResponse<ReechargePlanType[]>> {
        return this.http.get<ReechargePlanType[]>(`${this.resourceUrl}/data-plans`, { observe: 'response' })
            .map((res: HttpResponse<ReechargePlanType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReechargePlanType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ReechargePlanType[]>): HttpResponse<ReechargePlanType[]> {
        const body: ReechargePlanType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    private deserializeArray(json: any): ReechargePlanType[] {
        return this.jsogService.deserializeArray(json, ReechargePlanType);
    }

    private deserializeObject(json: any): ReechargePlanType {
        return this.jsogService.deserializeObject(json, ReechargePlanType);
    }
}
