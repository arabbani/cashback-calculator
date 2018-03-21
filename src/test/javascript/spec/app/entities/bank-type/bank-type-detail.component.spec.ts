/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { BankTypeDetailComponent } from '../../../../../../main/webapp/app/entities/bank-type/bank-type-detail.component';
import { BankTypeService } from '../../../../../../main/webapp/app/entities/bank-type/bank-type.service';
import { BankType } from '../../../../../../main/webapp/app/entities/bank-type/bank-type.model';

describe('Component Tests', () => {

    describe('BankType Management Detail Component', () => {
        let comp: BankTypeDetailComponent;
        let fixture: ComponentFixture<BankTypeDetailComponent>;
        let service: BankTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [BankTypeDetailComponent],
                providers: [
                    BankTypeService
                ]
            })
            .overrideTemplate(BankTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BankType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bankType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
