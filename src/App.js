import React, { useState, useEffect } from "react";
import api from "../src/services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadData(){
      const response = await  api.get("/repositories");

      const loadedRepositories = response.data;
      setRepositories(loadedRepositories)
    }
    loadData();
  }, [repositories]);

  async function handleAddRepository() {
    const newRepository = {
      title: "New Repository",
      url: "www.github.com",
      techs: ["Node.js", "React.js"]
    };
    const response = await api.post("/repositories", newRepository);

    if(response.status === '201'){
      setRepositories([...repositories, newRepository]);
    }
  }
  async function handleRemoveRepository(id) {
  const response = await api.delete(`/repositories/${id}`);

  if(response.status === '204' ){
    const filtredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filtredRepositories);
  }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
