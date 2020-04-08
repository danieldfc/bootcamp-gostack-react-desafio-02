import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get('repositories')

        setRepositories(response.data);
      } catch(err) {
        console.error(err);
      }
    }
    loadRepositories()
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Repo ${Date.now()}`,
        url: 'https://github.com/danieldfc/bootcamp-gostack-react-desafio-02',
        techs: ['ReactJS'],
      });

      setRepositories([...repositories, response.data]);
    } catch(err) {
      console.error(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const results = repositories.filter(repository => repository.id !== id);

      setRepositories(results);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => (
          <li key={repository.id}>
            <h1>{repository.title}</h1>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
