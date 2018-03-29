import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServiceProvider } from './service-provider.model';
import { createRequestOption } from '../../shared';

type EntityResponseType = HttpResponse<ServiceProvider>;

@Injectable()
export class ServiceProviderService {

    private resourceUrl =  SERVER_API_URL + 'api/service-providers';

    constructor(private http: HttpClient) { }

    create(serviceProvider: ServiceProvider): Observable<EntityResponseType> {
        const copy = this.convert(serviceProvider);
        return this.http.post<ServiceProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(serviceProvider: ServiceProvider): Observable<EntityResponseType> {
        const copy = this.convert(serviceProvider);
        return this.http.put<ServiceProvider>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServiceProvider>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ServiceProvider[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceProvider[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServiceProvider[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    bySubCategoryCode(subCategoryCode: string): Observable<HttpResponse<ServiceProvider[]>> {
        return this.http.get<ServiceProvider[]>(`${this.resourceUrl}/by-sub-category-code/${subCategoryCode}`, { observe: 'response' })
            .map((res: HttpResponse<ServiceProvider[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServiceProvider = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServiceProvider[]>): HttpResponse<ServiceProvider[]> {
        const jsonResponse: ServiceProvider[] = res.body;
        const body: ServiceProvider[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServiceProvider.
     */
    private convertItemFromServer(serviceProvider: ServiceProvider): ServiceProvider {
        const copy: ServiceProvider = Object.assign({}, serviceProvider);
        return copy;
    }

    /**
     * Convert a ServiceProvider to a JSON which can be sent to the server.
     */
    private convert(serviceProvider: ServiceProvider): ServiceProvider {
        const copy: ServiceProvider = Object.assign({}, serviceProvider);
        return copy;
    }
}
