import React, { useState } from "react";

// Defina a interface para o Ativo
interface Ativo {
  id: number;
  nome: string;
  valor: number;
}

const TableExpandable = ({ clienteNome, ativos }: { clienteNome: string, ativos: Ativo[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <tr>
      <td>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {clienteNome}
        </button>
      </td>
      <td>
        {isExpanded && (
          <ul>
            {ativos.map((ativo) => (
              <li key={ativo.id}>
                {ativo.nome} - {ativo.valor}
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );
};

export default TableExpandable;

