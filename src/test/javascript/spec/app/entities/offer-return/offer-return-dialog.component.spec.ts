/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { OfferReturnDialogComponent } from '../../../../../../main/webapp/app/entities/offer-return/offer-return-dialog.component';
import { OfferReturnService } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.service';
import { OfferReturn } from '../../../../../../main/webapp/app/entities/offer-return/offer-return.model';
import { ReturnExtrasService } from '../../../../../../main/webapp/app/entities/return-extras';
import { OfferPaymentService } from '../../../../../../main/webapp/app/entities/offer-payment';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer';

describe('Component Tests', () => {

    describe('OfferReturn Management Dialog Component', () => {
        let comp: OfferReturnDialogComponent;
        let fixture: ComponentFixture<OfferReturnDialogComponent>;
        let service: OfferReturnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [OfferReturnDialogComponent],
                providers: [
                    ReturnExtrasService,
                    OfferPaymentService,
                    OfferService,
                    OfferReturnService
                ]
            })
            .overrideTemplate(OfferReturnDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfferReturnDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfferReturnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfferReturn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.offerReturn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'offerReturnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfferReturn();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.offerReturn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'offerReturnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
