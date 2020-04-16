import { TestBed } from '@angular/core/testing';
import { ConstantsService } from './constants.service';
describe('ConstantsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConstantsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=constants.service.spec.js.map