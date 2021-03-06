import { combineReducers } from "redux";

import userReducer from "./userReducer";
import ambientesReducer from "./ambientesReducer";
import formularioNovoAmbienteReducer from "./fomularioNovoAmbienteReducer";
import ambienteAtualReducer from "./ambienteAtualReducer";
import reservasReducer from "./reservasReducer";

export default combineReducers({
  user: userReducer,
  ambiente: ambientesReducer,
  ambienteAtual: ambienteAtualReducer,
  formularioNovoAmbiente: formularioNovoAmbienteReducer,
  reservas: reservasReducer,
});
