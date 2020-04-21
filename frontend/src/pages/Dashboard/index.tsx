import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

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
   const [inputError, setInputError] = useState('');
   const [repositories, setRepositories] = useState<Repository[]>(() => {
      const storagedRepositories = localStorage.getItem(
         '@githubexplorer:repositories',
      );

      if (storagedRepositories) {
         return JSON.parse(storagedRepositories);
      }
      return [];
   });

   useEffect(() => {
      localStorage.setItem(
         '@githubexplorer:repositories',
         JSON.stringify(repositories),
      );
   }, [repositories]);

   async function handleAddRepository(
      e: FormEvent<HTMLFormElement>,
   ): Promise<void> {
      e.preventDefault();

      if (!newRepo) {
         setInputError('Digite o autor/nome do repositório');

         return;
      }

      try {
         const response = await api.get<Repository>(`repos/${newRepo}`);

         const repository = response.data;

         setRepositories([...repositories, repository]);
         setInputError('');
         setNewRepo('');
      } catch (err) {
         setInputError('Erro na busca por esse repositório.');
      }
   }

   return (
      <>
         <img src={logoImg} alt="GitHub Explorer" />
         <Title>Explore Repositórios no GitHub</Title>
         <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input
               placeholder="Digite o nome do repositório (autor/nome)"
               value={newRepo}
               onChange={(e) => setNewRepo(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
         </Form>
         {inputError && <Error>{inputError}</Error>}
         <Repositories>
            {repositories.map((r) => (
               <Link key={r.full_name} to={`/repository/${r.full_name}`}>
                  <img src={r.owner.avatar_url} alt={r.owner.login} />
                  <div>
                     <strong>{r.full_name}</strong>
                     <p>{r.description}</p>
                  </div>

                  <FiChevronRight size={20} />
               </Link>
            ))}
         </Repositories>
      </>
   );
};
export default Dashboard;
