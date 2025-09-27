import { TestBed } from '@angular/core/testing';
import { ModalService, ModalConfig } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have modal closed by default', () => {
    expect(service.isOpen()).toBeFalse();
  });

  it('should open modal with default config when show() is called without parameters', () => {
    service.show();
    
    expect(service.isOpen()).toBeTrue();
    
    const config = service.getCurrentConfig();
    expect(config).toBeDefined();
    expect(config?.title).toBe('Modal de Teste');
    expect(config?.content).toBe('Esta é uma modal de teste criada com Angular 18!');
    expect(config?.showCloseButton).toBeTrue();
    expect(config?.showFooter).toBeTrue();
    expect(config?.closeOnBackdrop).toBeTrue();
    expect(config?.size).toBe('medium');
  });

  it('should open modal with custom config when show() is called with parameters', () => {
    const customConfig: ModalConfig = {
      title: 'Custom Title',
      content: 'Custom Content',
      showCloseButton: false,
      showFooter: false,
      closeOnBackdrop: false,
      size: 'large'
    };

    service.show(customConfig);
    
    expect(service.isOpen()).toBeTrue();
    
    const config = service.getCurrentConfig();
    expect(config).toEqual(customConfig);
  });

  it('should close modal when hide() is called', () => {
    service.show();
    expect(service.isOpen()).toBeTrue();
    
    service.hide();
    expect(service.isOpen()).toBeFalse();
  });

  it('should toggle modal state when toggle() is called', () => {
    // Initially closed
    expect(service.isOpen()).toBeFalse();
    
    // Toggle to open
    service.toggle();
    expect(service.isOpen()).toBeTrue();
    
    // Toggle to close
    service.toggle();
    expect(service.isOpen()).toBeFalse();
  });

  it('should toggle modal with config when toggle() is called with parameters', () => {
    const customConfig: ModalConfig = {
      title: 'Toggle Test',
      size: 'small'
    };

    service.toggle(customConfig);
    expect(service.isOpen()).toBeTrue();
    
    const config = service.getCurrentConfig();
    expect(config?.title).toBe('Toggle Test');
    expect(config?.size).toBe('small');
  });

  it('should emit modal state changes through observable', (done) => {
    let emissionCount = 0;
    
    service.modal$.subscribe(state => {
      emissionCount++;
      
      if (emissionCount === 1) {
        // Initial state
        expect(state.isOpen).toBeFalse();
      } else if (emissionCount === 2) {
        // After show()
        expect(state.isOpen).toBeTrue();
        expect(state.config?.title).toBe('Test Title');
        done();
      }
    });

    service.show({ title: 'Test Title' });
  });

  it('should merge custom config with default config', () => {
    const partialConfig: ModalConfig = {
      title: 'Partial Config',
      size: 'large'
    };

    service.show(partialConfig);
    
    const config = service.getCurrentConfig();
    expect(config?.title).toBe('Partial Config');
    expect(config?.size).toBe('large');
    expect(config?.content).toBe('Esta é uma modal de teste criada com Angular 18!'); // Default
    expect(config?.showCloseButton).toBeTrue(); // Default
    expect(config?.showFooter).toBeTrue(); // Default
    expect(config?.closeOnBackdrop).toBeTrue(); // Default
  });
});

