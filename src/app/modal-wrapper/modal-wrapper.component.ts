import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewContainerRef, ComponentRef, Type, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService, ModalInstance } from '../services/modal.service';
import { ModalConfig } from '../interfaces/modal-component.interface';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isOpen = false;
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() containerClass = '';
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponentRef!: ViewContainerRef;

  private subscription: Subscription = new Subscription();
  private currentComponentRef: ComponentRef<any> | null = null;

  constructor(
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    console.log('ModalWrapperComponent ngOnInit');
    // Subscreve ao estado da modal do serviço
    this.subscription.add(
      this.modalService.modal$.subscribe(modalState => {
        console.log('ModalWrapper - Estado da modal mudou:', modalState);
        this.isOpen = modalState.isOpen;
        
        if (modalState.instance) {
          const instance = modalState.instance;
          console.log('ModalWrapper - Instance recebida:', instance);
          this.showCloseButton = instance.config.showCloseButton ?? this.showCloseButton;
          this.closeOnBackdrop = instance.config.closeOnBackdrop ?? this.closeOnBackdrop;
          this.size = instance.config.size || this.size;
          this.containerClass = instance.config.containerClass || this.containerClass;
          
          // Agenda a renderização para o próximo ciclo, quando o *ngIf já estiver ativo
          setTimeout(() => {
            if (this.dynamicComponentRef) {
              console.log('ModalWrapper - Renderizando componente (setTimeout)');
              this.renderComponent(instance);
            } else {
              console.log('ModalWrapper - dynamicComponentRef ainda não disponível');
            }
          }, 0);
        } else {
          console.log('ModalWrapper - Limpando componente');
          // Limpa quando a modal é fechada
          this.clearComponent();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    console.log('ModalWrapper - ngAfterViewInit, dynamicComponentRef:', this.dynamicComponentRef);
    // Não precisa configurar o ViewContainerRef no serviço aqui
    // porque ele será configurado quando a modal for aberta
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.clearComponent();
  }

  private renderComponent(instance: ModalInstance): void {
    // Limpa componente anterior
    this.clearComponent();
    
    if (this.dynamicComponentRef && instance.componentType) {
      try {
        // Cria o novo componente
        this.currentComponentRef = this.dynamicComponentRef.createComponent(
          instance.componentType
        );
        
        // Injeta as dependências
        if (this.currentComponentRef.instance) {
          this.currentComponentRef.instance.data = instance.config.data;
          this.currentComponentRef.instance.onClose = (result?: any) => {
            this.modalService.hide();
            if (instance.onClose) {
              instance.onClose(result);
            }
          };
          
          // Força a detecção de mudanças após injetar os dados
          this.currentComponentRef.changeDetectorRef.detectChanges();
        }
        
        console.log('Componente renderizado:', this.currentComponentRef.instance);
        console.log('Dados injetados:', this.currentComponentRef.instance.data);
      } catch (error) {
        console.error('Erro ao renderizar componente:', error);
      }
    }
  }

  private clearComponent(): void {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
      this.currentComponentRef = null;
    }
    if (this.dynamicComponentRef) {
      this.dynamicComponentRef.clear();
    }
  }

  onClose(): void {
    this.modalService.hide();
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.onClose();
    }
  }

  get modalSizeClass(): string {
    return `modal-${this.size}`;
  }

  get containerClasses(): string {
    return `${this.modalSizeClass} ${this.containerClass}`.trim();
  }
}