import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut, selectCurrentAccessToken } from "../redux/features/auth/authSlice";
import { DropdownCard } from "./dropdownCard";
import { Membro } from "../utils/types/membro";
import { removeMember } from "../service/api/memberService";

interface MemberCardProps {
  member: Membro,
  readonly: boolean,
  deleteMember: any
}

export const MemberCard = ({ member, readonly, deleteMember }: MemberCardProps) => {
  const navigate = useNavigate()

  const accessToken = useAppSelector(selectCurrentAccessToken)
  const dispatch = useAppDispatch()

  // controlador para lidar com um delecao em duas etapas
  const [confirming, setConfirming] = useState(false);

  const handleClick = async () => {
    // se houver um segundo clique e realizado a exclusao
    if (confirming) {
      try {
        await removeMember(member.id + '', accessToken)
        deleteMember(member.id)
        dispatch(logOut())
        toast.success('Membro removido com sucesso!')
      } catch (error) {

      }
      // primeiro clique
    } else {
      setConfirming(true);
    }
  };

  const children = () => (
    <>
      <p className=""><b>Prioridade:</b> {member.email}</p>
      <p className=""><b>Status:</b>{member.id}</p>
    </>
  )

  const dropdownContent = () => (
    <>
      {
        readonly ? '' : (
          <div className="flex w-full flex-wrap justify-end gap-6 mt-3">
            <button className="h-8 min-w-[105px] px-4 rounded-lg bg-blue-regular text-white text-center text-lg items-center gap-x-2" onClick={() => navigate(`editar/${member.id}`, { state: member })}>Editar</button>
            <button
              type='button'
              className={`${!confirming ? 'bg-[#EFE090]' : 'bg-rose-600'} h-8 min-w-[105px] px-4 rounded-lg bg-[#EFE090] text-[#2A2A2A] text-center text-lg items-center gap-x-2`}
              onClick={handleClick}
            >
              {confirming ? 'Confirme' : 'Remover'}
            </button>
          </div>
        )
      }
    </>
  )

  return (
    <DropdownCard title={member.nome} children={children()} dropdownContent={dropdownContent()} dropdown={!readonly} />
  )
};