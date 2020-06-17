import React, { useState, useEffect } from "react";
import api from './services/api';
import { FiThumbsUp, FiXCircle } from 'react-icons/fi';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `ReactJs ${Date.now()}`,
      url: "www.github.com",
      techs: [
        "ReactJs", "NodeJs", "TypeScript"
      ] 
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const attRepositories = repositories;
    attRepositories.splice(repositoryIndex, 1);

    setRepositories([...attRepositories]);
  }

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const attRepositories = repositories;
    attRepositories[repositoryIndex].likes++;

    setRepositories([...attRepositories]);
  }

  return (
    <div>
      <div className="title">Repositórios</div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <button className="remove" onClick={() => handleRemoveRepository(repository.id)}><FiXCircle /> Remover</button>
            {repository.title}
            <button className="like" onClick={() => handleLikeRepository(repository.id)}><FiThumbsUp /> Curtidas: {repository.likes}</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
