const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  equipSalaId: { type: mongoose.Schema.Types.ObjectId, ref: 'EquipSala', required: false },
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: false },
  tipo: { type: String, required: true },
  dataReserva: { type: String, required: false },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  statusReserva: { type: String, enum: ["pendente", "confirmada", "cancelada"], default: "pendente" }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;