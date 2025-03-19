import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const equipmentService = {
  // Buscar todos os equipamentos de todas as salas
  getAllEquipments: async () => {
    const response = await axios.get(`${API_URL}/equipsala`);
    return response.data;
  },

  // Adicionar equipamento a uma sala
  addEquipmentToRoom: async (salaId, equipData) => {
    const response = await axios.post(`${API_URL}/equipsala`, {
      salaId,
      equipNome: equipData.nome,
      quantidade: equipData.quantidade
    });
    return response.data;
  },

  // Remover equipamento de uma sala
  removeEquipmentFromRoom: async (salaId, equipamentoId) => {
    const response = await axios.delete(`${API_URL}/equipsala/${salaId}/${equipamentoId}`);
    return response.data;
  },

  // Atualizar quantidade de um equipamento
  updateEquipmentQuantity: async (salaId, equipamentoId, quantidade) => {
    const response = await axios.put(`${API_URL}/equipsala/${salaId}/${equipamentoId}`, {
      quantidade
    });
    return response.data;
  }
};