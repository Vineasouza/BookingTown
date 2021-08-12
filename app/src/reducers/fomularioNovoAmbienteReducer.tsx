import {
  SET_NOVO_AMBIENTE,
  LIMPAR_NOVO_AMBIENTE,
} from "../actions/fomularioNovoAmbienteActions";

const INITIAL_STATE = {
  nome: "",
  descricao: "",
  lotacaoMaxima: "",
};

const formularioNovoAmbienteReducer = (
  state: any = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case SET_NOVO_AMBIENTE:
      return { ...state, [action.campo]: action.valor };
    case LIMPAR_NOVO_AMBIENTE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default formularioNovoAmbienteReducer;
