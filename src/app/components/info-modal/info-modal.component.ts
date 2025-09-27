import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentInterface } from '../../interfaces/modal-component.interface';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit, ModalComponentInterface {
  private _data: any;
  onClose?: (result?: any) => void;

  title = 'Informação';
  message = 'Esta é uma mensagem informativa.';
  icon = 'ℹ️';

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
    this.updateContent();
  }

  ngOnInit(): void {
    console.log('InfoModalComponent ngOnInit - data:', this.data);
    this.updateContent();
  }

  private updateContent(): void {
    if (this._data) {
      this.title = this._data.title || 'Informação';
      this.message = this._data.message || 'Esta é uma mensagem informativa.';
      this.icon = this._data.icon || 'ℹ️';
      console.log('InfoModalComponent - title:', this.title, 'message:', this.message, 'icon:', this.icon);
    }
  }

  close(): void {
    console.log('InfoModalComponent - close clicked');
    this.onClose?.();
  }
}