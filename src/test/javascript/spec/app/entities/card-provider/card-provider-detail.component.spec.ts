/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { CardProviderDetailComponent } from '../../../../../../main/webapp/app/entities/card-provider/card-provider-detail.component';
import { CardProviderService } from '../../../../../../main/webapp/app/entities/card-provider/card-provider.service';
import { CardProvider } from '../../../../../../main/webapp/app/entities/card-provider/card-provider.model';

describe('Component Tests', () => {

    describe('CardProvider Management Detail Component', () => {
        let comp: CardProviderDetailComponent;
        let fixture: ComponentFixture<CardProviderDetailComponent>;
        let service: CardProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CardProviderDetailComponent],
                providers: [
                    CardProviderService
                ]
            })
            .overrideTemplate(CardProviderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardProviderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CardProvider(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cardProvider).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
