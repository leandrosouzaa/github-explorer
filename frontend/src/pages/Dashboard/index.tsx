import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
   full_name: string;
   description: string;
   owner: {
      login: string;
      avatar_url: string;
   };
}

const Dashboard: React.FC = () => {
   const [newRepo, setNewRepo] = useState('');
   const [repositories, setRepositories] = useState<Repository[]>([]);

   async function handleAddRepository(
      e: FormEvent<HTMLFormElement>,
   ): Promise<void> {
      e.preventDefault();

      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
   }

   return (
      <>
         <img src={logoImg} alt="GitHub Explorer" />
         <Title>Explore Repositórios no GitHub</Title>
         <Form onSubmit={handleAddRepository}>
            <input
               placeholder="Digite o nome do repositório"
               value={newRepo}
               onChange={(e) => setNewRepo(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
         </Form>
         <Repositories>
            {repositories.map((r) => (
               <a key={r.full_name} href="teste">
                  <img src={r.owner.avatar_url} alt={r.owner.login} />
                  <div>
                     <strong>{r.full_name}</strong>
                     <p>{r.description}</p>
                  </div>

                  <FiChevronRight size={20} />
               </a>
            ))}
         </Repositories>
      </>
   );
};
export default Dashboard;
