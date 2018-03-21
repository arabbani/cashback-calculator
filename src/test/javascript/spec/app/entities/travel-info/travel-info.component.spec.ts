/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { TravelInfoComponent } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.component';
import { TravelInfoService } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.service';
import { TravelInfo } from '../../../../../../main/webapp/app/entities/travel-info/travel-info.model';

describe('Component Tests', () => {

    describe('TravelInfo Management Component', () => {
        let comp: TravelInfoComponent;
        let fixture: ComponentFixture<TravelInfoComponent>;
        let service: TravelInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [TravelInfoComponent],
                providers: [
                    TravelInfoService
                ]
            })
            .overrideTemplate(TravelInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TravelInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TravelInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TravelInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.travelInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
