/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { ReturnTypeComponent } from '../../../../../../main/webapp/app/entities/return-type/return-type.component';
import { ReturnTypeService } from '../../../../../../main/webapp/app/entities/return-type/return-type.service';
import { ReturnType } from '../../../../../../main/webapp/app/entities/return-type/return-type.model';

describe('Component Tests', () => {

    describe('ReturnType Management Component', () => {
        let comp: ReturnTypeComponent;
        let fixture: ComponentFixture<ReturnTypeComponent>;
        let service: ReturnTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnTypeComponent],
                providers: [
                    ReturnTypeService
                ]
            })
            .overrideTemplate(ReturnTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReturnType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.returnTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
