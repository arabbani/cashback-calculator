/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ReechargeInfoDialogComponent } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info-dialog.component';
import { ReechargeInfoService } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.service';
import { ReechargeInfo } from '../../../../../../main/webapp/app/entities/reecharge-info/reecharge-info.model';
import { CircleService } from '../../../../../../main/webapp/app/entities/circle';
import { ReechargePlanTypeService } from '../../../../../../main/webapp/app/entities/reecharge-plan-type';

describe('Component Tests', () => {

    describe('ReechargeInfo Management Dialog Component', () => {
        let comp: ReechargeInfoDialogComponent;
        let fixture: ComponentFixture<ReechargeInfoDialogComponent>;
        let service: ReechargeInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargeInfoDialogComponent],
                providers: [
                    CircleService,
                    ReechargePlanTypeService,
                    ReechargeInfoService
                ]
            })
            .overrideTemplate(ReechargeInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargeInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargeInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReechargeInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reechargeInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reechargeInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReechargeInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reechargeInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reechargeInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
