// src/pages/RelacionamentoClientesAtivos.tsx
import React, { useState, useEffect } from "react";
import { getClientesAtivos } from "../services/api";  // Função que vamos criar para fazer o GET
import TableExpandable from "../components/TableExpandable";  // Componente para tabela expansível

// Definindo os tipos para os dados
interface Ativo {
  id: number;
  nome: string;
  valor: number;
}

interface ClienteAtivo {
  id: number;
  clienteNome: string;
  ativos: Ativo[];
}

const RelacionamentoClientesAtivos = () => {
  const [clientesAtivos, setClientesAtivos] = useState<ClienteAtivo[]>([]);

  useEffect(() => {
    // Chama o backend para obter a relação de clientes e ativos
    const fetchClientesAtivos = async () => {
      try {
        const response = await getClientesAtivos(); // Chama a API que retorna a relação
        setClientesAtivos(response);  // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar clientes e ativos", error);
      }
    };

    fetchClientesAtivos();
  }, []);

  return (
    <div>
      <h1>Relacionamento entre Clientes e Ativos</h1>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Ativos Relacionados</th>
          </tr>
        </thead>
        <tbody>
          {clientesAtivos.map((clienteAtivo) => (
            <TableExpandable
              key={clienteAtivo.id}
              clienteNome={clienteAtivo.clienteNome}
              ativos={clienteAtivo.ativos}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelacionamentoClientesAtivos;
