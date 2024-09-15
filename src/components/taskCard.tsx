import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Tarefa } from "../utils/types/tarefa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentAccessToken } from "../redux/features/auth/authSlice";
import { removeTask, updateTask } from "../service/api/taskService";

interface TaskCardProps {
  task: Tarefa,
  readonly: boolean,
  deleteTask: any
}

export const TaskCard = ({ task, readonly, deleteTask }: TaskCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between p-4 h-24 border-gray-regular">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-2 w-56">
              <span
                className="font-semibold text-2xl leading-none w-56 truncate"
                title={task.nome}
              >
                {task.nome}
              </span>
            </div>
          </div>
        </div>

        <div className="w-auto flex items-center p-4 gap-5">
          <button onClick={toggleDropdown} className="text-4xl">
            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
      </div>

      <div className="flex flex-col px-5 mb-4 ml-3 gap-y-2">
        <p className=""><b>Prioridade:</b> {task.prioridade}</p>
        <p className=""><b>Status:</b> {task.finalizada ? 'Concluída' : 'Pendenete'}</p>
        {isDropdownOpen && (
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
        )}
      </div>
    </div>
  );
};