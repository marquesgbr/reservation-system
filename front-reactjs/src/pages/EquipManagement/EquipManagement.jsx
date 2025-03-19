import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import EquipmentList from './components/EquipRoomList';
import EquipmentForm from './components/EquipForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import { equipmentService } from '../../services/equipmentService';

const EquipmentManagement = () => {
  const [equipments, setEquipments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);

  const handleDeleteClick = (equipment) => {
    setEquipmentToDelete(equipment);
    setShowDeleteDialog(true);
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    try {
      const response = await equipmentService.getAllEquipments();
      setEquipments(response.data);
    } catch (error) {
      toast.error('Erro ao carregar equipamentos');
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedEquipment) {
        await equipmentService.updateEquipmentQuantity(
          formData.salaId,
          selectedEquipment.equipamento._id,
          formData.quantidade
        );
        toast.success('Equipamento atualizado com sucesso');
      } else {
        await equipmentService.addEquipmentToRoom(formData.salaId, {
          nome: formData.nome,
          quantidade: formData.quantidade
        });
        toast.success('Equipamento adicionado com sucesso');
      }
      loadEquipments();
    } catch (error) {
      toast.error('Erro ao salvar equipamento');
    }
  };

  const handleDelete = async (equipment) => {
    try {
      await equipmentService.removeEquipmentFromRoom(
        equipment.sala._id,
        equipment.equipamento._id
      );
      toast.success('Equipamento removido com sucesso');
      loadEquipments();
    } catch (error) {
      toast.error('Erro ao remover equipamento');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestão de Equipamentos</h1>
        <Button 
          label="Adicionar Equipamento" 
          icon="pi pi-plus" 
          onClick={() => {
            setSelectedEquipment(null);
            setShowForm(true);
          }}
        />
      </div>

      <EquipmentList
        equipments={equipments}
        onEdit={(equipment) => {
          setSelectedEquipment(equipment);
          setShowForm(true);
        }}
        onDelete={handleDeleteClick}
      />

      <EquipmentForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleSave}
        selectedEquipment={selectedEquipment}
        rooms={rooms}
      />

      <DeleteConfirmation
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        equipment={equipmentToDelete}
      />
    </div>
  );
};

export default EquipmentManagement;