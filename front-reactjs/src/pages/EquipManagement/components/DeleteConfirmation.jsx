import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DeleteConfirmation = ({ visible, onHide, onConfirm, equipment }) => {
  const footer = (
    <div>
      <Button 
        label="Não" 
        icon="pi pi-times" 
        className="p-button-text" 
        onClick={onHide} 
      />
      <Button 
        label="Sim" 
        icon="pi pi-check" 
        className="p-button-danger" 
        onClick={() => {
          onConfirm(equipment);
          onHide();
        }} 
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header="Confirmar Exclusão"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="flex align-items-center justify-content-center">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        <span>
          Você tem certeza que deseja remover o equipamento 
          <b>{equipment ? ` "${equipment.equipamento.nome}"` : ''}</b> da sala 
          <b>{equipment ? ` "${equipment.sala.identificador}"` : ''}</b>?
        </span>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmation;