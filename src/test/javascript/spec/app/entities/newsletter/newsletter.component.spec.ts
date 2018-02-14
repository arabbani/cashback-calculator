/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbclTestModule } from '../../../test.module';
import { NewsletterComponent } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.component';
import { NewsletterService } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.service';
import { Newsletter } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.model';

describe('Component Tests', () => {

    describe('Newsletter Management Component', () => {
        let comp: NewsletterComponent;
        let fixture: ComponentFixture<NewsletterComponent>;
        let service: NewsletterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [NewsletterComponent],
                providers: [
                    NewsletterService
                ]
            })
            .overrideTemplate(NewsletterComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NewsletterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsletterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Newsletter(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.newsletters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
