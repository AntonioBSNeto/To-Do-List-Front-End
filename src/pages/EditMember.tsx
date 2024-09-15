import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { Subheader } from "../components/header/subheader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, selectCurrentAccessToken } from "../redux/features/auth/authSlice";
import { getMemberById, removeMember, updateMember } from "../service/api/memberService";
import { toast } from "react-toastify";
import { Spinner } from "../components/spinner";
import { Membro } from "../utils/types/membro";

const validationSchema = object({
  name: string()
    .required('Nome é um campo obrigatório'),
  email: string()
    .email('Forma inválido')
    .required('Descrição é campo obrigatório'),
  password: string().required('Senha é campo obrigatório')
    .min(6, 'A senha precisa ter ao menos 6 caracteres')
})

export const EditMember = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const location = useLocation()
  const navigate = useNavigate()
  const { memberId } = useParams()

  const accessToken = useAppSelector(selectCurrentAccessToken)

  // funcao generica para preencher o formulario caso se trate de uma edicao de tarefa
  const setFormValues = (member: any) => {
    const { nome, email } = member
    setValue('name', nome)
    setValue('email', email)
  }

  // em caso de edicao as informacoes pode serem recebidas via location.state ou requecisao ao backend
  useEffect(() => {
    if (!memberId) {
      return
    }

    if (location.state) {
      setFormValues(location.state)
      return
    }

    const getTask = async () => {
      return await getMemberById(memberId, accessToken)
    }

    try {
      getTask()
        .then(task => {
          setFormValues(task)
        })
    } catch (error) { }

  }, [])

  // controlador para lidar com um delecao em duas etapas
  const [confirming, setConfirming] = useState(false);

  const handleClick = async () => {
    // se houver um segundo clique e realizado a exclusao
    if (confirming) {
      try {
        await removeMember(memberId + '', accessToken)
        dispatch(logOut())
        toast.success('Membro excluído com sucesso!')
        navigate('/')
      } catch (error) {

      }
      // primeiro clique
    } else {
      setConfirming(true);
    }
  };

  const handleMember = async (data: any) => {
    try {
      setIsLoading(true)
      const taskData: Membro = {
        nome: data.name,
        email: data.description,
        senha: data.done
      }

      await updateMember(taskData, memberId+'', accessToken)

      toast.success(`Membro alterado com sucesso!`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error("um erro inesperado acontece, tente novamente em alguns minutos")
      }
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-center text-xl font-semibold my-4">Editar Membro</h1>
          <form className="flex flex-col w-full gap-y-2" onSubmit={handleSubmit(handleMember)}>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Nome*
              </label>
              <input
                type="text"
                className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]"
                {...register('name')}
                autoComplete="true"
              />
              <span className="h-5 text-[#F29494]">{errors?.name?.message}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Email*
              </label>
              <input
                type="text"
                className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]"
                {...register('email')}
                autoComplete="true"
              />
              <span className="h-5 text-[#F29494]">{errors?.email?.message}</span>
            </div>
            <div className="flex flex-col">
              <label className="text-[#161616]">
                Descrição da Tarefa*
              </label>
              <input
                type="password"
                placeholder="************"
                className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]"
                {...register('password')}
                autoComplete="true"
              />
              <span className="h-5 text-[#F29494]">{errors?.email?.message}</span>
            </div>
            <button
              type='button'
              className={`${!confirming ? 'bg-rose-600' : 'bg-orange-400'} text-white w-full h-10 rounded-lg flex justify-center items-center max-w-96 mx-auto mt-4`}
              onClick={handleClick}
            >
              {confirming ? 'Clique novamente para confirmar' : 'Remover'}
            </button>
            <button
              className="bg-blue-regular text-white w-full h-10 rounded-lg flex justify-center items-center max-w-96 mx-auto">
              {isLoading ? <Spinner /> : `Salvar`}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}