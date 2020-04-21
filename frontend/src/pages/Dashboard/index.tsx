import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
   <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore Repositórios no GitHub</Title>
      <Form>
         <input placeholder="Digite o nome do repositório" />
         <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
         <a href="teste">
            <img
               src="https://avatars0.githubusercontent.com/u/51727533?s=460&u=db66dcd045f5e01193f7e162c4bbc193886ae348&v=4"
               alt="Leandro Ribeiro"
            />
            <div>
               <strong>leandrosouzaa/habbap</strong>
               <p>Repositório para a documentação do meu TCC</p>
            </div>

            <FiChevronRight size={20} />
         </a>
      </Repositories>
   </>
);
export default Dashboard;
