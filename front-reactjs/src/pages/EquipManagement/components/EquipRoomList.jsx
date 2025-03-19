import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const EquipmentList = ({ equipments, onEdit, onDelete }) => {
  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-success" 
          onClick={() => onEdit(rowData)}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-danger" 
          onClick={() => onDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <DataTable value={equipments} paginator rows={10}>
      <Column field="sala.identificador" header="Sala" />
      <Column field="equipamento.nome" header="Equipamento" />
      <Column field="quantidade" header="Quantidade" />
      <Column body={actionTemplate} header="Ações" />
    </DataTable>
  );
};

export default EquipmentList;