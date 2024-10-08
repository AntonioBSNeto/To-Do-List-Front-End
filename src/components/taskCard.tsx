import { useState } from "react";
import { Tarefa } from "../utils/types/tarefa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentAccessToken } from "../redux/features/auth/authSlice";
import { removeTask, updateTask } from "../service/api/taskService";
import { DropdownCard } from "./dropdownCard";

interface TaskCardProps {
  task: Tarefa,
  readonly: boolean,
  deleteTask: any
}

export const TaskCard = ({ task, readonly, deleteTask }: TaskCardProps) => {
  const navigate = useNavigate()

  const accessToken = useAppSelector(selectCurrentAccessToken)

  // controlador para lidar com um delecao em duas etapas
  const [confirming, setConfirming] = useState(false);

  const handleClick = async () => {
    // se houver um segundo clique e realizado a exclusao
    if (confirming) {
      try {
        await removeTask(task.id + '', accessToken)
        deleteTask(task.id)
        toast.success('Tarefa removido com sucesso!')
      } catch (error) {

      }
      // primeiro clique
    } else {
      setConfirming(true);
    }
  };

  const completeTask = async () => {
    try {
      await updateTask({ finalizada: true }, task.id + '', accessToken)
      toast.success('Tarefa conclída!')
    } catch (error) {

    }
  }

  const children = () => (
    <>
      <p className=""><b>Prioridade:</b> {task.prioridade}</p>
      <p className=""><b>Status:</b> {task.finalizada ? 'Concluída' : 'Pendenete'}</p>
    </>
  )

  const dropdownContent = () => (
    <>
      <p className="">
        <b>Descrição: </b>
        {task.descricao}
      </p>
      {
        readonly ? '' : (
          <div className="flex w-full flex-wrap justify-end gap-6 mt-3">
            <button className="h-8 min-w-[105px] px-4 rounded-lg bg-blue-regular text-white text-center text-lg items-center gap-x-2" onClick={() => navigate(`editar/${task.id}`, { state: task })}>Editar</button>
            <button
              type='button'
              className={`${!confirming ? 'bg-[#EFE090]' : 'bg-rose-600'} h-8 min-w-[105px] px-4 rounded-lg bg-[#EFE090] text-[#2A2A2A] text-center text-lg items-center gap-x-2`}
              onClick={handleClick}
            >
              {confirming ? 'Confirme' : 'Remover'}
            </button>
            {
              !task.finalizada && (
                <button className="h-8 min-w-[105px] px-4 rounded-lg bg-[#7CFF81] text-[#09090B] text-center text-lg  items-center gap-x-2" onClick={() => completeTask()}>Concluir</button>
              )
            }
          </div>
        )
      }
    </>
  )

  return (
    <DropdownCard title={task.nome} children={children()} dropdownContent={dropdownContent()} />
  )
};