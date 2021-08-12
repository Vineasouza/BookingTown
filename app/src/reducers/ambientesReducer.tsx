import {
  CRIAR_AMBIENTE,
  LISTAR_AMBIENTE,
  ATUALIZAR_AMBIENTE,
  DELETAR_AMBIENTE,
} from "../actions/ambientesActions";

const ambientesReducer = (state = [], action: any) => {
  switch (action.type) {
    case LISTAR_AMBIENTE:
      return action.ambiente;
    case ATUALIZAR_AMBIENTE:
      return state.map((ambiente: any) =>
        ambiente.id === action.ambiente.id ? action.ambiente : ambiente
      );
    case DELETAR_AMBIENTE:
      return state.filter((ambiente: any) => ambiente.id !== action.ambienteId);
    case CRIAR_AMBIENTE:
      return [...state, action.ambiente];
    default:
      return state;
  }
};

export default ambientesReducer;
