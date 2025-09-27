import { Injectable, ComponentRef, ViewContainerRef, Type, Injector, ComponentFactoryResolver, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalConfig, ModalComponentInterface } from '../interfaces/modal-component.interface';

export interface ModalInstance {
  componentType: Type<any>;
  config: ModalConfig;
  onClose?: (result?: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new BehaviorSubject<{ isOpen: boolean; instance?: ModalInstance }>({
    isOpen: false
  });

  public modal$: Observable<{ isOpen: boolean; instance?: ModalInstance }> = this.modalSubject.asObservable();

  private currentModalInstance: ModalInstance | null = null;
  private viewContainerRef: ViewContainerRef | null = null;

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  /**
   * Configura o ViewContainerRef para renderizar a modal
   */
  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  /**
   * Mostra uma modal com um componente específico
   */
  show<T extends ModalComponentInterface>(
    component: Type<T>, 
    config: ModalConfig = {}
  ): Promise<any> {
    console.log('ModalService.show chamado com:', component, config);
    return new Promise((resolve, reject) => {
      try {
        // Fecha modal anterior se existir
        this.hide();

        const defaultConfig: ModalConfig = {
          size: 'medium',
          closeOnBackdrop: true,
          showCloseButton: true,
          ...config
        };

        console.log('ModalService - Config final:', defaultConfig);

        // Configura o callback de fechamento
        const onClose = (result?: any) => {
          console.log('ModalService - onClose chamado com:', result);
          this.hide();
          resolve(result);
        };

        // Cria a instância da modal
        const modalInstance: ModalInstance = {
          componentType: component,
          config: defaultConfig,
          onClose
        };

        this.currentModalInstance = modalInstance;
        console.log('ModalService - Instance criada:', modalInstance);

        // Emite o estado da modal
        console.log('ModalService - Emitindo estado isOpen=true');
        this.modalSubject.next({
          isOpen: true,
          instance: modalInstance
        });

      } catch (error) {
        console.error('ModalService - Erro no show:', error);
        reject(error);
      }
    });
  }

  /**
   * Fecha a modal atual
   */
  hide(): void {
    console.log('ModalService.hide chamado');
    this.currentModalInstance = null;

    this.modalSubject.next({
      isOpen: false
    });
  }

  /**
   * Verifica se a modal está aberta
   */
  isOpen(): boolean {
    return this.modalSubject.value.isOpen;
  }

  /**
   * Obtém a instância atual da modal
   */
  getCurrentInstance(): ModalInstance | null {
    return this.currentModalInstance;
  }

  /**
   * Obtém a configuração atual da modal
   */
  getCurrentConfig(): ModalConfig | undefined {
    return this.currentModalInstance?.config;
  }
}