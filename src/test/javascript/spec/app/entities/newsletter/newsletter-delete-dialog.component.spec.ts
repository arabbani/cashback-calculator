/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { NewsletterDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/newsletter/newsletter-delete-dialog.component';
import { NewsletterService } from '../../../../../../main/webapp/app/entities/newsletter/newsletter.service';

describe('Component Tests', () => {

    describe('Newsletter Management Delete Component', () => {
        let comp: NewsletterDeleteDialogComponent;
        let fixture: ComponentFixture<NewsletterDeleteDialogComponent>;
        let service: NewsletterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [NewsletterDeleteDialogComponent],
                providers: [
                    NewsletterService
                ]
            })
            .overrideTemplate(NewsletterDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NewsletterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsletterService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
