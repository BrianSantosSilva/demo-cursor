import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { ModalService } from './services/modal.service';
import { ModalConfig } from './interfaces/modal-component.interface';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ModalWrapperComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-world-angular';

  constructor(private modalService: ModalService) {}

  async openTestModal(): Promise<void> {
    try {
      console.log('Abrindo TestModal...');
      await this.modalService.show(TestModalComponent, {
        data: { message: 'Teste de dados' },
        size: 'small'
      });
      console.log('TestModal fechada');
    } catch (error) {
      console.error('Erro ao abrir TestModal:', error);
    }
  }

  async openConfirmModal(): Promise<void> {
    try {
      const result = await this.modalService.show(ConfirmModalComponent, {
        data: {
          title: 'Confirmar Exclusão',
          message: 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.'
        },
        size: 'small'
      });
      
      if (result) {
        console.log('Usuário confirmou a ação');
        this.showInfoModal('Sucesso!', 'Item excluído com sucesso.', '✅');
      } else {
        console.log('Usuário cancelou a ação');
        this.showInfoModal('Cancelado', 'Ação cancelada pelo usuário.', '❌');
      }
    } catch (error) {
      console.error('Erro ao abrir modal:', error);
    }
  }

  async showInfoModal(title: string, message: string, icon: string = 'ℹ️'): Promise<void> {
    try {
      await this.modalService.show(InfoModalComponent, {
        data: { title, message, icon },
        size: 'small'
      });
    } catch (error) {
      console.error('Erro ao abrir modal de informação:', error);
    }
  }

  async openLargeInfoModal(): Promise<void> {
    try {
      await this.modalService.show(InfoModalComponent, {
        data: {
          title: 'Modal Grande',
          message: 'Esta é uma modal grande para demonstração. Ela tem mais espaço para conteúdo e pode ser útil para formulários ou informações detalhadas.',
          icon: '🖥️'
        },
        size: 'large'
      });
    } catch (error) {
      console.error('Erro ao abrir modal grande:', error);
    }
  }

  showAlert(): void {
    alert('Olá! Você clicou no botão! 🚀');
  }
}