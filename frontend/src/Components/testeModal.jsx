import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function PositionDemo() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          label="Left"
          icon="pi pi-arrow-right"
          onClick={() => show('left')}
          className="p-button-help"
          style={{ minWidth: '10rem' }}
        />
        <Button
          label="Right"
          icon="pi pi-arrow-left"
          onClick={() => show('right')}
          className="p-button-help"
          style={{ minWidth: '10rem' }}
        />
      </div>
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          label="TopLeft"
          icon="pi pi-arrow-down-right"
          onClick={() => show('top-left')}
          className="p-button-warning"
          style={{ minWidth: '10rem' }}
        />
        <Button
          label="Top"
          icon="pi pi-arrow-down"
          onClick={() => show('top')}
          className="p-button-warning"
          style={{ minWidth: '10rem' }}
        />
        <Button
          label="TopRight"
          icon="pi pi-arrow-down-left"
          onClick={() => show('top-right')}
          className="p-button-warning"
          style={{ minWidth: '10rem' }}
        />
      </div>
      <div className="flex flex-wrap justify-content-center gap-2">
        <Button
          label="BottomLeft"
          icon="pi pi-arrow-up-right"
          onClick={() => show('bottom-left')}
          className="p-button-success"
          style={{ minWidth: '10rem' }}
        />
        <Button
          label="Bottom"
          icon="pi pi-arrow-up"
          onClick={() => show('bottom')}
          className="p-button-success"
          style={{ minWidth: '10rem' }}
        />
        <Button
          label="BottomRight"
          icon="pi pi-arrow-up-left"
          onClick={() => show('bottom-right')}
          className="p-button-success"
          style={{ minWidth: '10rem' }}
        />
      </div>

      <Dialog
          header="Cadastrar fornecedor"
          visible={visible}
          position={position}
          style={{ width: '70vw' }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
          draggable={false}
          resizable={false}
        >
          <p className="m-0">
            <div className="formsSistemaGeral">
  
              <FornecedorForm />
            </div>
          </p>
        </Dialog>
    </div>
  );
}
