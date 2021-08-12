import {
  SELECIONAR_AMBIENTE,
  SET_AMBIENTE_ATUAL,
} from "../actions/ambienteAtualActions";

const ambienteAtualReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case SELECIONAR_AMBIENTE:
      return action.ambiente;
    case SET_AMBIENTE_ATUAL:
      return { ...state, [action.ambiente]: action.valor };
    default:
      return state;
  }
};

export default ambienteAtualReducer;
