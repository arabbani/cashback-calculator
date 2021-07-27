/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { RechargePlanTypeComponent } from '../../../../../../main/webapp/app/entities/recharge-plan-type/recharge-plan-type.component';
import { RechargePlanTypeService } from '../../../../../../main/webapp/app/entities/recharge-plan-type/recharge-plan-type.service';
import { RechargePlanType } from '../../../../../../main/webapp/app/entities/recharge-plan-type/recharge-plan-type.model';

describe('Component Tests', () => {

    describe('RechargePlanType Management Component', () => {
        let comp: RechargePlanTypeComponent;
        let fixture: ComponentFixture<RechargePlanTypeComponent>;
        let service: RechargePlanTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [RechargePlanTypeComponent],
                providers: [
                    RechargePlanTypeService
                ]
            })
            .overrideTemplate(RechargePlanTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RechargePlanTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RechargePlanTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RechargePlanType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.rechargePlanTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
