import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Newsletter } from './newsletter.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Newsletter>;

@Injectable()
export class NewsletterService {

    private resourceUrl =  SERVER_API_URL + 'api/newsletters';

    constructor(private http: HttpClient) { }

    create(newsletter: Newsletter): Observable<EntityResponseType> {
        const copy = this.convert(newsletter);
        return this.http.post<Newsletter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(newsletter: Newsletter): Observable<EntityResponseType> {
        const copy = this.convert(newsletter);
        return this.http.put<Newsletter>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Newsletter>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Newsletter[]>> {
        const options = createRequestOption(req);
        return this.http.get<Newsletter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Newsletter[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Newsletter = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Newsletter[]>): HttpResponse<Newsletter[]> {
        const jsonResponse: Newsletter[] = res.body;
        const body: Newsletter[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Newsletter.
     */
    private convertItemFromServer(newsletter: Newsletter): Newsletter {
        const copy: Newsletter = Object.assign({}, newsletter);
        return copy;
    }

    /**
     * Convert a Newsletter to a JSON which can be sent to the server.
     */
    private convert(newsletter: Newsletter): Newsletter {
        const copy: Newsletter = Object.assign({}, newsletter);
        return copy;
    }
}
