/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ReechargePlanTypeDialogComponent } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type-dialog.component';
import { ReechargePlanTypeService } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.service';
import { ReechargePlanType } from '../../../../../../main/webapp/app/entities/reecharge-plan-type/reecharge-plan-type.model';

describe('Component Tests', () => {

    describe('ReechargePlanType Management Dialog Component', () => {
        let comp: ReechargePlanTypeDialogComponent;
        let fixture: ComponentFixture<ReechargePlanTypeDialogComponent>;
        let service: ReechargePlanTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ReechargePlanTypeDialogComponent],
                providers: [
                    ReechargePlanTypeService
                ]
            })
            .overrideTemplate(ReechargePlanTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReechargePlanTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReechargePlanTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReechargePlanType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reechargePlanType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reechargePlanTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReechargePlanType();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reechargePlanType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reechargePlanTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
