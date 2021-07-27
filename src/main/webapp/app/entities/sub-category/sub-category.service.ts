import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { SubCategory } from './sub-category.model';

type EntityResponseType = HttpResponse<SubCategory>;

@Injectable()
export class SubCategoryService {

    private resourceUrl = SERVER_API_URL + 'api/sub-categories';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(subCategory: SubCategory): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.post<SubCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subCategory: SubCategory): Observable<EntityResponseType> {
        const copy = this.convert(subCategory);
        return this.http.put<SubCategory>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByCode(code: string): Observable<EntityResponseType> {
        return this.http.get<SubCategory>(`${this.resourceUrl}/code/${code}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<SubCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubCategory[]>) => this.convertArrayResponse(res));
    }

    findWithCategory(req?: any): Observable<HttpResponse<SubCategory[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubCategory[]>(`${this.resourceUrl}/with/category`, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubCategory[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubCategory = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<SubCategory[]>): HttpResponse<SubCategory[]> {
        const body: SubCategory[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a SubCategory to a JSON which can be sent to the server.
     */
    private convert(subCategory: SubCategory): SubCategory {
        const copy: SubCategory = Object.assign({}, subCategory);
        return copy;
    }

    private deserializeArray(json: any): SubCategory[] {
        return this.jsogService.deserializeArray(json, SubCategory);
    }

    private deserializeObject(json: any): SubCategory {
        return this.jsogService.deserializeObject(json, SubCategory);
    }
}
