/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReechargeInfoComponent } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.component';
import { ReechargeInfoService } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.service';
import { ReechargeInfo } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.model';

describe('Component Tests', () => {

    describe('ReechargeInfo Management Component', () => {
        let comp: ReechargeInfoComponent;
        let fixture: ComponentFixture<ReechargeInfoComponent>;
        let service: ReechargeInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargeInfoComponent],
                providers: [
                    ReechargeInfoService
                ]
            })
            .overrideTemplate(ReechargeInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargeInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargeInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReechargeInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reechargeInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
