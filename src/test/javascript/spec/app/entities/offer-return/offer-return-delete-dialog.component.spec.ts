/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { OfferReturnDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/offer-return/offer-return-delete-dialog.component';
import { OfferReturnService } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.service';

describe('Component Tests', () => {

    describe('OfferReturn Management Delete Component', () => {
        let comp: OfferReturnDeleteDialogComponent;
        let fixture: ComponentFixture<OfferReturnDeleteDialogComponent>;
        let service: OfferReturnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferReturnDeleteDialogComponent],
                providers: [
                    OfferReturnService
                ]
            })
            .overrideTemplate(OfferReturnDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferReturnDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferReturnService);
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
