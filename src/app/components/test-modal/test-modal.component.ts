import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentInterface } from '../../interfaces/modal-component.interface';

@Component({
  selector: 'app-test-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; text-align: center;">
      <h2>Teste Modal</h2>
      <p>Este é um teste simples da modal.</p>
      <p>Dados recebidos: {{ data | json }}</p>
      <button (click)="close()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px;">
        Fechar
      </button>
    </div>
  `
})
export class TestModalComponent implements OnInit, ModalComponentInterface {
  private _data: any;
  onClose?: (result?: any) => void;

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    console.log('TestModalComponent setter - data being set:', value);
    this._data = value;
  }

  ngOnInit(): void {
    console.log('TestModalComponent ngOnInit - data:', this.data);
  }

  close(): void {
    console.log('TestModalComponent - close clicked');
    this.onClose?.();
  }
}
