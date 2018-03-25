/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CbclTestModule } from '../../../test.module';
import { ElectronicsInfoDialogComponent } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info-dialog.component';
import { ElectronicsInfoService } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.service';
import { ElectronicsInfo } from '../../../../../../main/webapp/app/entities/electronics-info/electronics-info.model';
import { BrandService } from '../../../../../../main/webapp/app/entities/brand';

describe('Component Tests', () => {

    describe('ElectronicsInfo Management Dialog Component', () => {
        let comp: ElectronicsInfoDialogComponent;
        let fixture: ComponentFixture<ElectronicsInfoDialogComponent>;
        let service: ElectronicsInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ElectronicsInfoDialogComponent],
                providers: [
                    BrandService,
                    ElectronicsInfoService
                ]
            })
            .overrideTemplate(ElectronicsInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ElectronicsInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ElectronicsInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ElectronicsInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.electronicsInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'electronicsInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ElectronicsInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.electronicsInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'electronicsInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
