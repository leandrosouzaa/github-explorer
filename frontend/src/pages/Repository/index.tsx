import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
   repository: string;
}

interface Repository {
   full_name: string;
   description: string;
   stargazers_count: number;
   forks_count: number;
   open_issues_count: number;
   owner: {
      login: string;
      avatar_url: string;
   };
}

interface Issue {
   id: number;
   title: string;
   user: {
      login: string;
   };
   html_url: string;
}

const Repository: React.FC = () => {
   const { params } = useRouteMatch<RepositoryParams>();
   const [repository, setRepository] = useState<Repository | null>(null);
   const [issues, setIssues] = useState<Issue[]>([]);

   useEffect(() => {
      api.get(`repos/${params.repository}`).then((r) => {
         setRepository(r.data);
      });

      api.get(`repos/${params.repository}/issues`).then((r) => {
         setIssues(r.data);
      });
   }, []); // eslint-disable-line

   return (
      <>
         <Header>
            <img src={logoImg} alt="GitHub exlorer" />
            <Link to="/">
               <FiChevronLeft size={16} />
               Voltar
            </Link>
         </Header>
         {repository && (
            <RepositoryInfo>
               <header>
                  <img
                     src={repository.owner.avatar_url}
                     alt={repository.owner.login}
                  />
                  <div>
                     <strong>{repository.full_name}</strong>
                     <p>{repository.description}</p>
                  </div>
               </header>
               <ul>
                  <li>
                     <strong>{repository.stargazers_count}</strong>
                     <span>Stars</span>
                  </li>
                  <li>
                     <strong>{repository.forks_count}</strong>
                     <span>Forks</span>
                  </li>
                  <li>
                     <strong>{repository.open_issues_count}</strong>
                     <span>Issues</span>
                  </li>
               </ul>
            </RepositoryInfo>
         )}
         <Issues>
            {issues.map((i) => (
               <a key={i.id} href={i.html_url}>
                  <div>
                     <strong>{i.title}</strong>
                     <p>{i.user.login}</p>
                  </div>

                  <FiChevronRight size={20} />
               </a>
            ))}
         </Issues>
      </>
   );
};

export default Repository;
