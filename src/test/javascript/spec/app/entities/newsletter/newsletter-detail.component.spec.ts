/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { NewsletterDetailComponent } from '../../../../../../main/webapp/app/entities/newsletter/newsletter-detail.component';
import { NewsletterService } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.service';
import { Newsletter } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.model';

describe('Component Tests', () => {

    describe('Newsletter Management Detail Component', () => {
        let comp: NewsletterDetailComponent;
        let fixture: ComponentFixture<NewsletterDetailComponent>;
        let service: NewsletterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [NewsletterDetailComponent],
                providers: [
                    NewsletterService
                ]
            })
            .overrideTemplate(NewsletterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NewsletterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsletterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Newsletter(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.newsletter).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
