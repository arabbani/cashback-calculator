import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Category } from './category.model';

type EntityResponseType = HttpResponse<Category>;

@Injectable()
export class CategoryService {

    private resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(category: Category): Observable<EntityResponseType> {
        const copy = this.convert(category);
        return this.http.post<Category>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(category: Category): Observable<EntityResponseType> {
        const copy = this.convert(category);
        return this.http.put<Category>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Category>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(req?: any): Observable<HttpResponse<Category[]>> {
        const options = createRequestOption(req);
        return this.http.get<Category[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Category[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Category = this.deserializeObject(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Category[]>): HttpResponse<Category[]> {
        const body: Category[] = this.deserializeArray(res.body);
        return res.clone({ body });
    }

    /**
     * Convert a Category to a JSON which can be sent to the server.
     */
    private convert(category: Category): Category {
        const copy: Category = Object.assign({}, category);
        return copy;
    }

    private deserializeArray(json: any): Category[] {
        return this.jsogService.deserializeArray(json, Category);
    }

    private deserializeObject(json: any): Category {
        return this.jsogService.deserializeObject(json, Category);
    }
}
