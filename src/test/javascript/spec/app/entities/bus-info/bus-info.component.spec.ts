/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { BusInfoComponent } from '../../../../../../main/webapp/app/entities/bus-info/bus-info.component';
import { BusInfoService } from '../../../../../../main/webapp/app/entities/bus-info/bus-info.service';
import { BusInfo } from '../../../../../../main/webapp/app/entities/bus-info/bus-info.model';

describe('Component Tests', () => {

    describe('BusInfo Management Component', () => {
        let comp: BusInfoComponent;
        let fixture: ComponentFixture<BusInfoComponent>;
        let service: BusInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [BusInfoComponent],
                providers: [
                    BusInfoService
                ]
            })
            .overrideTemplate(BusInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BusInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BusInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.busInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
