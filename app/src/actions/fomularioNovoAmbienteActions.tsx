export const SET_NOVO_AMBIENTE = "SET_NOVO_AMBIENTE";
export const setNovoAmbiente = (campo: any, valor: any) => ({
  type: SET_NOVO_AMBIENTE,
  campo,
  valor,
});

export const LIMPAR_NOVO_AMBIENTE = "LIMPAR_NOVO_AMBIENTE";
export const limparNovoAmbiente = () => ({
  type: LIMPAR_NOVO_AMBIENTE,
});
