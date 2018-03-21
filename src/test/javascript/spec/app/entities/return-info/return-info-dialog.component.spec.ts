/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ReturnInfoDialogComponent } from '../../../../../../main/webapp/app/entities/return-info/return-info-dialog.component';
import { ReturnInfoService } from '../../../../../../main/webapp/app/entities/return-info/return-info.service';
import { ReturnInfo } from '../../../../../../main/webapp/app/entities/return-info/return-info.model';
import { MainReturnService } from '../../../../../../main/webapp/app/entities/main-return';
import { ReturnExtrasService } from '../../../../../../main/webapp/app/entities/return-extras';
import { OfferPaymentService } from '../../../../../../main/webapp/app/entities/offer-payment';
import { ReturnTypeService } from '../../../../../../main/webapp/app/entities/return-type';
import { OfferService } from '../../../../../../main/webapp/app/entities/offer';
import { OfferReturnService } from '../../../../../../main/webapp/app/entities/offer-return';

describe('Component Tests', () => {

    describe('ReturnInfo Management Dialog Component', () => {
        let comp: ReturnInfoDialogComponent;
        let fixture: ComponentFixture<ReturnInfoDialogComponent>;
        let service: ReturnInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReturnInfoDialogComponent],
                providers: [
                    MainReturnService,
                    ReturnExtrasService,
                    OfferPaymentService,
                    ReturnTypeService,
                    OfferService,
                    OfferReturnService,
                    ReturnInfoService
                ]
            })
            .overrideTemplate(ReturnInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReturnInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReturnInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReturnInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.returnInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'returnInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReturnInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.returnInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'returnInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
