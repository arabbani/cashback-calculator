/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReturnInfoDetailComponent } from '../../../../../../main/webapp/app/entities/return-info/return-info-detail.component';
import { ReturnInfoService } from '../../../../../../main/webapp/app/entities/return-info/return-info.service';
import { ReturnInfo } from '../../../../../../main/webapp/app/entities/return-info/return-info.model';

describe('Component Tests', () => {

    describe('ReturnInfo Management Detail Component', () => {
        let comp: ReturnInfoDetailComponent;
        let fixture: ComponentFixture<ReturnInfoDetailComponent>;
        let service: ReturnInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnInfoDetailComponent],
                providers: [
                    ReturnInfoService
                ]
            })
            .overrideTemplate(ReturnInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReturnInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.returnInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
