import React, { useState, useEffect } from "react";
import { getClientes } from "../services/api";  // Função que vamos criar para fazer o GET

// Definindo os tipos para os dados
interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    // Chama o backend para obter a lista de clientes
    const fetchClientes = async () => {
      try {
        const response = await getClientes(); // Chama a API que retorna a lista de clientes
        setClientes(response);  // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
