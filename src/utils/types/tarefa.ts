export interface Tarefa {
  id: string;
  nome: string;
  descricao: string;
  finalizada: boolean;
  dataFinalizada: Date;
  prioridade: Prioridade;
  membroId: string;
}

enum Prioridade {
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA"
}