import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Tarefa } from "../utils/types/tarefa";

const task = {
  nome: 'Tarefa 1',
  prioridade: 'BAIXA',
  finalizada: false,
  descricao: "descricao tarefa 1descricao tarefa 1descricao tarefa 1descricao tarefa 1"
}

interface TaskCardProps {
  task: Tarefa,
  readonly: boolean
}

export const TaskCard = ({ task, readonly }: TaskCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
                <div className="flex w-full justify-end gap-x-6">
                  <button className="h-8 px-4 rounded-lg bg-blue-regular text-white text-center text-lg flex items-center gap-x-2">Editar</button>
                  <button className="h-8 px-4 rounded-lg bg-[#EFE090] text-[#2A2A2A] text-center text-lg flex items-center gap-x-2">Remover</button>
                </div>
              )
            }
          </>
        )}
      </div>
    </div>
  );
};