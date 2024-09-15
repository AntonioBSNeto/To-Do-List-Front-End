export interface Tarefa {
  id?: string;
  nome: string;
  descricao: string;
  finalizada: boolean;
  dataFinalizada?: Date;
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
  membroId: string;
}
