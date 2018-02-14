/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReechargeInfoDetailComponent } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info-detail.component';
import { ReechargeInfoService } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.service';
import { ReechargeInfo } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.model';

describe('Component Tests', () => {

    describe('ReechargeInfo Management Detail Component', () => {
        let comp: ReechargeInfoDetailComponent;
        let fixture: ComponentFixture<ReechargeInfoDetailComponent>;
        let service: ReechargeInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargeInfoDetailComponent],
                providers: [
                    ReechargeInfoService
                ]
            })
            .overrideTemplate(ReechargeInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargeInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargeInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReechargeInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reechargeInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
