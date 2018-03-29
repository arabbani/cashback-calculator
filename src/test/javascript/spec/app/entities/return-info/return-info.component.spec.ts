/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReturnInfoComponent } from '../../../../../../main/webapp/app/entities/return-info/return-info.component';
import { ReturnInfoService } from '../../../../../../main/webapp/app/entities/return-info/return-info.service';
import { ReturnInfo } from '../../../../../../main/webapp/app/entities/return-info/return-info.model';

describe('Component Tests', () => {

    describe('ReturnInfo Management Component', () => {
        let comp: ReturnInfoComponent;
        let fixture: ComponentFixture<ReturnInfoComponent>;
        let service: ReturnInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnInfoComponent],
                providers: [
                    ReturnInfoService
                ]
            })
            .overrideTemplate(ReturnInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReturnInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.returnInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
