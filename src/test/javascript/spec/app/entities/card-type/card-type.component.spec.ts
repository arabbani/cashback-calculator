/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { CardTypeComponent } from '../../../../../../main/webapp/app/entities/card-type/card-type.component';
import { CardTypeService } from '../../../../../../main/webapp/app/entities/card-type/card-type.service';
import { CardType } from '../../../../../../main/webapp/app/entities/card-type/card-type.model';

describe('Component Tests', () => {

    describe('CardType Management Component', () => {
        let comp: CardTypeComponent;
        let fixture: ComponentFixture<CardTypeComponent>;
        let service: CardTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CardTypeComponent],
                providers: [
                    CardTypeService
                ]
            })
            .overrideTemplate(CardTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cardTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
