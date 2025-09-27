import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ModalService } from './services/modal.service';

describe('AppComponent', () => {
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['show']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'hello-world-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hello-world-angular');
  });

  it('should render title in header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header h1')?.textContent).toContain('🎉 Bem-vindo ao Angular 18!');
  });

  it('should render the card with correct content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.card h2')?.textContent).toContain('Hello World Angular 18');
    expect(compiled.querySelector('.card p')?.textContent).toContain('Este é um projeto Hello World usando:');
  });

  it('should render the list of technologies including ModalService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const listItems = compiled.querySelectorAll('.card ul li');
    expect(listItems.length).toBe(6);
    expect(listItems[0].textContent).toContain('Angular 18');
    expect(listItems[1].textContent).toContain('TypeScript');
    expect(listItems[2].textContent).toContain('SCSS');
    expect(listItems[3].textContent).toContain('Standalone Components');
    expect(listItems[4].textContent).toContain('ModalService');
    expect(listItems[5].textContent).toContain('Reactive Programming');
  });

  it('should render all modal buttons with correct text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const primaryButton = compiled.querySelector('.btn-primary');
    const infoButton = compiled.querySelector('.btn-info');
    const successButton = compiled.querySelector('.btn-success');
    const secondaryButton = compiled.querySelector('.btn-secondary');
    
    expect(primaryButton?.textContent).toContain('🚀 Modal Padrão');
    expect(infoButton?.textContent).toContain('📱 Modal Pequena');
    expect(successButton?.textContent).toContain('🖥️ Modal Grande');
    expect(secondaryButton?.textContent).toContain('📢 Mostrar Alert');
  });

  it('should call modalService.show() when primary button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    
    fixture.detectChanges();
    const primaryButton = fixture.nativeElement.querySelector('.btn-primary');
    primaryButton.click();
    
    expect(modalService.show).toHaveBeenCalledWith({
      title: 'Modal de Teste Angular 18',
      content: 'Esta é uma modal de teste criada usando ModalService! Agora você pode abrir modais de forma programática.',
      showCloseButton: true,
      showFooter: true,
      closeOnBackdrop: true,
      size: 'medium'
    });
  });

  it('should call modalService.show() with small config when info button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    
    fixture.detectChanges();
    const infoButton = fixture.nativeElement.querySelector('.btn-info');
    infoButton.click();
    
    expect(modalService.show).toHaveBeenCalledWith({
      title: 'Modal Pequena',
      content: 'Esta é uma modal pequena para demonstração.',
      size: 'small'
    });
  });

  it('should call modalService.show() with large config when success button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    
    fixture.detectChanges();
    const successButton = fixture.nativeElement.querySelector('.btn-success');
    successButton.click();
    
    expect(modalService.show).toHaveBeenCalledWith({
      title: 'Modal Grande',
      content: 'Esta é uma modal grande para demonstração. Ela tem mais espaço para conteúdo e pode ser útil para formulários ou informações detalhadas.',
      size: 'large'
    });
  });

  it('should call showAlert when secondary button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(component, 'showAlert');
    
    fixture.detectChanges();
    const secondaryButton = fixture.nativeElement.querySelector('.btn-secondary');
    secondaryButton.click();
    
    expect(component.showAlert).toHaveBeenCalled();
  });

  it('should show alert when showAlert method is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(window, 'alert');
    
    component.showAlert();
    
    expect(window.alert).toHaveBeenCalledWith('Olá! Você clicou no botão! 🚀');
  });

  it('should render modal component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const modalComponent = compiled.querySelector('app-modal');
    expect(modalComponent).toBeTruthy();
  });

  it('should render modal demo section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const demoSection = compiled.querySelector('.modal-demo-section');
    expect(demoSection).toBeTruthy();
    expect(demoSection?.querySelector('h3')?.textContent).toContain('🎭 Demonstração de Modais:');
  });
});