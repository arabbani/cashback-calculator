import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { State } from './state.model';

export type EntityResponseType = HttpResponse<State>;

@Injectable()
export class StateService {

    private resourceUrl = SERVER_API_URL + 'api/states';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(state: State): Observable<EntityResponseType> {
        const copy = this.convert(state);
        return this.http.post<State>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(state: State): Observable<EntityResponseType> {
        const copy = this.convert(state);
        return this.http.put<State>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<State>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<State[]>> {
        const options = createRequestOption(req);
        return this.http.get<State[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<State[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: State = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<State[]>): HttpResponse<State[]> {
        const jsonResponse: State[] = this.deserializeArray(res.body);
        const body: State[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to State.
     */
    private convertItemFromServer(state: State): State {
        const copy: State = Object.assign({}, state);
        return copy;
    }

    /**
     * Convert a State to a JSON which can be sent to the server.
     */
    private convert(state: State): State {
        const copy: State = Object.assign({}, state);
        return copy;
    }

    private deserializeArray(json: any): State[] {
        return this.jsogService.deserializeArray(json, State);
    }

    private deserializeObject(json: any): State {
        return this.jsogService.deserializeObject(json, State);
    }
}
