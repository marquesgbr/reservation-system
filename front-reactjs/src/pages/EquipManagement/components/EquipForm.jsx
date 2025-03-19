import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const EquipmentForm = ({ visible, onHide, onSave, selectedEquipment, rooms }) => {
  const [formData, setFormData] = useState({
    salaId: '',
    nome: '',
    quantidade: 1
  });

  useEffect(() => {
    if (selectedEquipment) {
      setFormData({
        salaId: selectedEquipment.sala._id,
        nome: selectedEquipment.equipamento.nome,
        quantidade: selectedEquipment.quantidade
      });
    }
  }, [selectedEquipment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onHide();
  };

  return (
    <Dialog 
      visible={visible} 
      onHide={onHide}
      header={selectedEquipment ? "Editar Equipamento" : "Adicionar Equipamento"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <label>Sala</label>
          <Dropdown
            value={formData.salaId}
            options={rooms}
            onChange={(e) => setFormData({...formData, salaId: e.value})}
            optionLabel="identificador"
            optionValue="_id"
            placeholder="Selecione uma sala"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Nome do Equipamento</label>
          <InputText
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Quantidade</label>
          <InputNumber
            value={formData.quantidade}
            onValueChange={(e) => setFormData({...formData, quantidade: e.value})}
            min={1}
          />
        </div>

        <Button type="submit" label="Salvar" />
      </form>
    </Dialog>
  );
};

export default EquipmentForm;