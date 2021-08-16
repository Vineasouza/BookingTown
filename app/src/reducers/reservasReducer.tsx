import {
  CRIAR_RESERVA,
  LISTAR_RESERVAS,
  ATUALIZAR_RESERVA,
  LISTAR_TODAS_RESERVAS,
  DELETAR_RESERVA,
} from "../actions/reservasActions";

const reservasReducer = (state = [], action: any) => {
  switch (action.type) {
    case LISTAR_RESERVAS:
      return action.reservas;
    case LISTAR_TODAS_RESERVAS:
      return action.reservas;
    case ATUALIZAR_RESERVA:
      return state.map((reserva: any) =>
        reserva.id === action.reserva.id ? action.reserva : reserva
      );
    case DELETAR_RESERVA:
      return state.filter((reserva: any) => reserva.id !== action.reservaId);
    case CRIAR_RESERVA:
      return [...state, action.reserva];
    default:
      return state;
  }
};

export default reservasReducer;
