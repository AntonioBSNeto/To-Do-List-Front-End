import { useLocation } from 'react-router-dom';
import { NavbarItem } from './navbarItem';

interface SubheaderProps {
  href1?: string;
  href2?: string;
  subheaderItemSelection?: 'tarefas' | 'membros';
  setSubheaderItem?: any
}

export const Subheader = ({ subheaderItemSelection, setSubheaderItem }: SubheaderProps) => {

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="flex justify-between items-end ">
      <nav>
        <ul className="flex">
          <li className='flex gap-2 items-center border-r-2 pr-4' {...(setSubheaderItem && { onClick: () => setSubheaderItem('tarefas')})}>
            <NavbarItem {...(!subheaderItemSelection && { href: '/tarefas' })} isSelected={currentPath === "/tarefas" || subheaderItemSelection === 'tarefas'}>Tarefas</NavbarItem>
          </li>

          <li className='flex gap-2 items-center border-r-2 px-4 ' {...(setSubheaderItem && { onClick: () =>  setSubheaderItem('membros') })}>
            <NavbarItem {...(!subheaderItemSelection && { href: '/membros' })} isSelected={currentPath === "/membros" || subheaderItemSelection === 'membros'}>Membros</NavbarItem>
          </li>
        </ul>
      </nav>
    </div>
  );
};

