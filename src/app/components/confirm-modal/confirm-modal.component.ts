import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentInterface } from '../../interfaces/modal-component.interface';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, ModalComponentInterface {
  private _data: any;
  onClose?: (result?: any) => void;

  title = 'Confirmar Ação';
  message = 'Tem certeza que deseja continuar?';

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.updateContent();
  }

  ngOnInit(): void {
    console.log('ConfirmModalComponent ngOnInit - data:', this.data);
    this.updateContent();
  }

  private updateContent(): void {
    if (this._data) {
      this.title = this._data.title || 'Confirmar Ação';
      this.message = this._data.message || 'Tem certeza que deseja continuar?';
      console.log('ConfirmModalComponent - title:', this.title, 'message:', this.message);
    }
  }

  confirm(): void {
    console.log('ConfirmModalComponent - confirm clicked');
    this.onClose?.(true);
  }

  cancel(): void {
    console.log('ConfirmModalComponent - cancel clicked');
    this.onClose?.(false);
  }
}