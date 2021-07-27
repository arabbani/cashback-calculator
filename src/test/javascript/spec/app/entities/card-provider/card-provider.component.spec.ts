/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { CardProviderComponent } from '../../../../../../main/webapp/app/entities/card-provider/card-provider.component';
import { CardProviderService } from '../../../../../../main/webapp/app/entities/card-provider/card-provider.service';
import { CardProvider } from '../../../../../../main/webapp/app/entities/card-provider/card-provider.model';

describe('Component Tests', () => {

    describe('CardProvider Management Component', () => {
        let comp: CardProviderComponent;
        let fixture: ComponentFixture<CardProviderComponent>;
        let service: CardProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [CardProviderComponent],
                providers: [
                    CardProviderService
                ]
            })
            .overrideTemplate(CardProviderComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardProviderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'findAll').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CardProvider(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.findAll).toHaveBeenCalled();
                expect(comp.cardProviders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
