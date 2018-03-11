/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CbclTestModule } from '../../../test.module';
import { ServiceProviderDetailComponent } from '../../../../../../main/webapp/app/entities/service-provider/service-provider-detail.component';
import { ServiceProviderService } from '../../../../../../main/webapp/app/entities/service-provider/service-provider.service';
import { ServiceProvider } from '../../../../../../main/webapp/app/entities/service-provider/service-provider.model';

describe('Component Tests', () => {

    describe('ServiceProvider Management Detail Component', () => {
        let comp: ServiceProviderDetailComponent;
        let fixture: ComponentFixture<ServiceProviderDetailComponent>;
        let service: ServiceProviderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CbclTestModule],
                declarations: [ServiceProviderDetailComponent],
                providers: [
                    ServiceProviderService
                ]
            })
            .overrideTemplate(ServiceProviderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceProviderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceProviderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ServiceProvider(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceProvider).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
