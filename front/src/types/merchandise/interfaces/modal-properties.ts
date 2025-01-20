import React from 'react';
export interface ModalProperties {
  title: string;
  description: string;
  onButtonClick: (event: React.MouseEvent) => void;
}