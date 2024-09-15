import { bool, mixed, object, string } from "yup"
import { Subheader } from "../components/header/subheader"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentAccessToken, selectCurrentUserId } from "../redux/features/auth/authSlice"
import { createTask, getTaskById, removeTask, updateTask } from "../service/api/taskService"
import { Tarefa } from "../utils/types/tarefa"
import { toast } from "react-toastify"
import { Spinner } from "../components/spinner"

const validationSchema = object({
  name: string()
    .required('Nome é um campo obrigatório'),
  description: string()
    .max(140)
    .required('Descrição é campo obrigatório'),
  done: bool(),
  priority: mixed().oneOf(['BAIXA', 'MEDIA', 'ALTA'])
})

export const Task = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const accessToken = useAppSelector(selectCurrentAccessToken)
  const membroId = useAppSelector(selectCurrentUserId)
  const { taskId } = useParams()

  // controlador para lidar com um delecao em duas etapas
  const [confirming, setConfirming] = useState(false);

  const handleClick = async () => {
    // se houver um segundo clique e realizado a exclusao
    if (confirming) {
      try {
        if (taskId)
          await removeTask(taskId, accessToken)
        toast.success('Produto removido com sucesso!')
        navigate('/tarefas')
      } catch (error) {

      }
      // primeiro clique
    } else {
      setConfirming(true);
    }
  };

  const [isTaskAlreadyDone, setIsTaskAlreadyDone] = useState(false)

  // funcao generica para preencher o formulario caso se trate de uma edicao de tarefa
  const setFormValues = (task: any) => {
    const { nome, descricao, finalizada, prioridade } = task
    setValue('name', nome)
    setValue('description', descricao)
    setValue('done', finalizada)
    setValue('priority', prioridade)
    if (finalizada) {
      setIsTaskAlreadyDone(true)
    }
  }

  // em caso de edicao as informacoes pode serem recebidas via location.state ou requecisao ao backend
  useEffect(() => {
    if (!taskId) {
      return
    }

    if (location.state) {
      setFormValues(location.state)
      return
    }

    const getTask = async () => {
      return await getTaskById(taskId, accessToken)
    }

    try {
      getTask()
        .then(task => {
          setFormValues(task)
        })
    } catch (error) { }

  }, [])


  // lida com adicao e modificacao dos produtos
  const handleTask = async (data: any) => {
    try {
      setIsLoading(true)
      const taskData: Tarefa = {
        nome: data.name,
        descricao: data.description,
        finalizada: data.done ? true : false,
        prioridade: data.priority,
        membroId: membroId,
      }

      // verifica se esta lidando com uma adicao ou atualizacao
      const response = taskId
        ? await updateTask(taskData, taskId, accessToken)
        : await createTask(taskData, accessToken)

      toast.success(`Tarefa ${taskId ? 'salvo' : 'criado'} com sucesso!`)
      navigate(`/tarefas/editar/${response?.id}`)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'The Tarefa has already been completed and cannot be updated.') {
          toast.error('Tarefas conclúidas não podem ser editadas')
        } else {
          toast.error("um erro inesperado acontece, tente novamente em alguns minutos")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderDoneInput = () => {
    return (
      <div className="flex flex-row-reverse justify-end items-center gap-x-2">
        <label className="text-[#161616]">
          Finalizada
        </label>
        <input
          type="checkbox"
          className="px-4 bg-[#F7F7F8] rounded-lg border-black border-[1px]"
          {...register('done', { disabled: isTaskAlreadyDone })}
          autoComplete="true"
        />
        <span className="h-5 text-[#F29494]">{errors?.description?.message}</span>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl px-10">
          <Subheader />
        </div>
      </div>
      <div className="w-full flex-grow flex flex-col pb-14 px-4 pt-7 bg-[#f3f3f3]">
        <div className="flex flex-col bg-white border border-grayshade-300 rounded-xl md:p-4 max-md:p-4 lg:p-10 w-full max-w-7xl mx-auto">
          <h1 className="text-center text-xl font-semibold my-4">{taskId ? 'Editar Produto' : 'Adicionar Produto'}</h1>
          <form className="flex flex-col w-full gap-y-2" onSubmit={handleSubmit(handleTask)}>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Nome da tarefa*
              </label>
              <input
                type="text"
                className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]"
                {...register('name', { disabled: isTaskAlreadyDone })}
                autoComplete="true"
              />
              <span className="h-5 text-[#F29494]">{errors?.name?.message}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Descrição da Tarefa*
              </label>
              <input
                type="text"
                className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]"
                {...register('description', { disabled: isTaskAlreadyDone })}
                autoComplete="true"
              />
              <span className="h-5 text-[#F29494]">{errors?.description?.message}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Prioridade
              </label>
              <select id="nivel" {...register("priority", { disabled: isTaskAlreadyDone })} className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]">
                <option value=""></option>
                <option value="BAIXA">Baixo</option>
                <option value="MEDIA">Médio</option>
                <option value="ALTA">Alto</option>
              </select>
              <span className="h-5 text-[#F29494]">{errors?.priority?.message}</span>
            </div>
            {taskId ? renderDoneInput() : ''}
            {(taskId && !isTaskAlreadyDone) && (
              <button
                type='button'
                className={`${!confirming ? 'bg-rose-600' : 'bg-orange-400'} text-white w-full h-10 rounded-lg flex justify-center items-center max-w-96 mx-auto mt-4`}
                onClick={handleClick}
              >
                {confirming ? 'Clique novamente para confirmar' : 'Remover'}
              </button>
            )}
            <button
              className="bg-blue-regular text-white w-full h-10 rounded-lg flex justify-center items-center max-w-96 mx-auto"
              type={isTaskAlreadyDone ? 'button' : 'submit'}
              {...(isTaskAlreadyDone && { onClick: () => { navigate('/tarefas') } })}
            >
              {isLoading ? <Spinner /> : `${isTaskAlreadyDone ? 'Voltar' : (taskId ? 'Salvar' : 'Cadastrar')}`}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}