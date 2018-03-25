/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { BusInfoDetailComponent } from '../../../../../../main/webapp/app/entities/bus-info/bus-info-detail.component';
import { BusInfoService } from '../../../../../../main/webapp/app/entities/bus-info/bus-info.service';
import { BusInfo } from '../../../../../../main/webapp/app/entities/bus-info/bus-info.model';

describe('Component Tests', () => {

    describe('BusInfo Management Detail Component', () => {
        let comp: BusInfoDetailComponent;
        let fixture: ComponentFixture<BusInfoDetailComponent>;
        let service: BusInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [BusInfoDetailComponent],
                providers: [
                    BusInfoService
                ]
            })
            .overrideTemplate(BusInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BusInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BusInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.busInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
