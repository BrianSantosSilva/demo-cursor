export interface ModalComponentInterface {
  /**
   * Dados que serão passados para o componente da modal
   */
  data?: any;
  
  /**
   * Callback chamado quando a modal é fechada
   */
  onClose?: (result?: any) => void;
}

export interface ModalConfig {
  /**
   * Dados a serem passados para o componente
   */
  data?: any;
  
  /**
   * Configurações de estilo da modal
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Se deve fechar ao clicar no backdrop
   */
  closeOnBackdrop?: boolean;
  
  /**
   * Se deve mostrar o botão de fechar
   */
  showCloseButton?: boolean;
  
  /**
   * Classe CSS adicional para o container
   */
  containerClass?: string;
}
