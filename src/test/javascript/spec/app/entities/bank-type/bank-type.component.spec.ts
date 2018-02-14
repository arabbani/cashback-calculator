/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { BankTypeComponent } from '../../../../../../main/webapp/app/entities/bank-type/bank-type.component';
import { BankTypeService } from '../../../../../../main/webapp/app/entities/bank-type/bank-type.service';
import { BankType } from '../../../../../../main/webapp/app/entities/bank-type/bank-type.model';

describe('Component Tests', () => {

    describe('BankType Management Component', () => {
        let comp: BankTypeComponent;
        let fixture: ComponentFixture<BankTypeComponent>;
        let service: BankTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [BankTypeComponent],
                providers: [
                    BankTypeService
                ]
            })
            .overrideTemplate(BankTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BankType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bankTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
