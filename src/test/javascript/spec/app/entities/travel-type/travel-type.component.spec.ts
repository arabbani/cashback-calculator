/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { TravelTypeComponent } from '../../../../../../main/webapp/app/entities/travel-type/travel-type.component';
import { TravelTypeService } from '../../../../../../main/webapp/app/entities/travel-type/travel-type.service';
import { TravelType } from '../../../../../../main/webapp/app/entities/travel-type/travel-type.model';

describe('Component Tests', () => {

    describe('TravelType Management Component', () => {
        let comp: TravelTypeComponent;
        let fixture: ComponentFixture<TravelTypeComponent>;
        let service: TravelTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [TravelTypeComponent],
                providers: [
                    TravelTypeService
                ]
            })
            .overrideTemplate(TravelTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TravelTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TravelTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TravelType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.travelTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
