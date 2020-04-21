import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
   repository: string;
}

const Repository: React.FC = () => {
   const { params } = useRouteMatch<RepositoryParams>();

   return (
      <>
         <Header>
            <img src={logoImg} alt="GitHub exlorer" />
            <Link to="/">
               <FiChevronLeft size={16} />
               Voltar
            </Link>
         </Header>
         <RepositoryInfo>
            <header>
               <img
                  src="https://avatars0.githubusercontent.com/u/51727533?s=460&u=db66dcd045f5e01193f7e162c4bbc193886ae348&v=4"
                  alt="leandrosouzaa"
               />
               <div>
                  <strong>leandrosouzaa/habbap</strong>
                  <p>descrição do repositório.</p>
               </div>
            </header>
            <ul>
               <li>
                  <strong>10000</strong>
                  <span>Stars</span>
               </li>
               <li>
                  <strong>10000</strong>
                  <span>Forks</span>
               </li>
               <li>
                  <strong>10000</strong>
                  <span>Issues abertas</span>
               </li>
            </ul>
         </RepositoryInfo>
         <Issues>
            <Link key={1} to="/repository/">
               <div>
                  <strong>asdasdf</strong>
                  <p>asdadsads</p>
               </div>

               <FiChevronRight size={20} />
            </Link>
         </Issues>
      </>
   );
};

export default Repository;
