/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { CardTypeDetailComponent } from '../../../../../../main/webapp/app/entities/card-type/card-type-detail.component';
import { CardTypeService } from '../../../../../../main/webapp/app/entities/card-type/card-type.service';
import { CardType } from '../../../../../../main/webapp/app/entities/card-type/card-type.model';

describe('Component Tests', () => {

    describe('CardType Management Detail Component', () => {
        let comp: CardTypeDetailComponent;
        let fixture: ComponentFixture<CardTypeDetailComponent>;
        let service: CardTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CardTypeDetailComponent],
                providers: [
                    CardTypeService
                ]
            })
            .overrideTemplate(CardTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardType(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cardType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
