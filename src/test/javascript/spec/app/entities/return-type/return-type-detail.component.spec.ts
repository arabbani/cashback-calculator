/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ReturnTypeDetailComponent } from '../../../../../../main/webapp/app/entities/return-type/return-type-detail.component';
import { ReturnTypeService } from '../../../../../../main/webapp/app/entities/return-type/return-type.service';
import { ReturnType } from '../../../../../../main/webapp/app/entities/return-type/return-type.model';

describe('Component Tests', () => {

    describe('ReturnType Management Detail Component', () => {
        let comp: ReturnTypeDetailComponent;
        let fixture: ComponentFixture<ReturnTypeDetailComponent>;
        let service: ReturnTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnTypeDetailComponent],
                providers: [
                    ReturnTypeService
                ]
            })
            .overrideTemplate(ReturnTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReturnType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.returnType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
