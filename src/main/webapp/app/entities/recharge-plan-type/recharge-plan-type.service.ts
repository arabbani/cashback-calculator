import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { RechargePlanType } from './recharge-plan-type.model';

type EntityResponseType = HttpResponse<RechargePlanType>;

@Injectable()
export class RechargePlanTypeService {

    private resourceUrl = SERVER_API_URL + 'api/recharge-plan-types';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(rechargePlanType: RechargePlanType): Observable<EntityResponseType> {
        const copy = this.convert(rechargePlanType);
        return this.http.post<RechargePlanType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rechargePlanType: RechargePlanType): Observable<EntityResponseType> {
        const copy = this.convert(rechargePlanType);
        return this.http.put<RechargePlanType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RechargePlanType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<RechargePlanType[]>> {
        const options = createRequestOption(req);
        return this.http.get<RechargePlanType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RechargePlanType[]>) => this.convertArrayResponse(res));
    }

    findAllDataPlans(): Observable<HttpResponse<RechargePlanType[]>> {
        return this.http.get<RechargePlanType[]>(`${this.resourceUrl}/data-plans`, { observe: 'response' })
            .map((res: HttpResponse<RechargePlanType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RechargePlanType = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<RechargePlanType[]>): HttpResponse<RechargePlanType[]> {
        const body: RechargePlanType[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a RechargePlanType to a JSON which can be sent to the server.
     */
    private convert(rechargePlanType: RechargePlanType): RechargePlanType {
        const copy: RechargePlanType = Object.assign({}, rechargePlanType);
        return copy;
    }

    private deserializeArray(json: any): RechargePlanType[] {
        return this.jsogService.deserializeArray(json, RechargePlanType);
    }

    private deserializeObject(json: any): RechargePlanType {
        return this.jsogService.deserializeObject(json, RechargePlanType);
    }
}
