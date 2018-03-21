import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsogService } from 'jsog-typescript';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { UserInfo } from './user-info.model';

type EntityResponseType = HttpResponse<UserInfo>;

@Injectable()
export class UserInfoService {

    private resourceUrl = SERVER_API_URL + 'api/user-infos';

    constructor(private http: HttpClient, private jsogService: JsogService) { }

    create(userInfo: UserInfo): Observable<EntityResponseType> {
        const copy = this.convert(userInfo);
        return this.http.post<UserInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userInfo: UserInfo): Observable<EntityResponseType> {
        const copy = this.convert(userInfo);
        return this.http.put<UserInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserInfo = this.convertItemFromServer(this.deserializeObject(res.body));
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<UserInfo[]>): HttpResponse<UserInfo[]> {
        const jsonResponse: UserInfo[] = this.deserializeArray(res.body);
        const body: UserInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to UserInfo.
     */
    private convertItemFromServer(userInfo: UserInfo): UserInfo {
        const copy: UserInfo = Object.assign({}, userInfo);
        return copy;
    }

    /**
     * Convert a UserInfo to a JSON which can be sent to the server.
     */
    private convert(userInfo: UserInfo): UserInfo {
        const copy: UserInfo = Object.assign({}, userInfo);
        return copy;
    }

    private deserializeArray(json: any): UserInfo[] {
        return this.jsogService.deserializeArray(json, UserInfo);
    }

    private deserializeObject(json: any): UserInfo {
        return this.jsogService.deserializeObject(json, UserInfo);
    }
}
