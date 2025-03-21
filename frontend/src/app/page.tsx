"use client";

import { useEffect, useState } from "react";

interface Cliente {
  id: number;
  nome: string;
  email: string;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editandoCliente, setEditandoCliente] = useState<number | null>(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/clientes")
      .then((res) => res.json())
      .then((data: Cliente[]) => setClientes(data))
      .catch((error) => console.error("Erro ao buscar clientes:", error));
  }, []);

  const adicionarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoCliente = { nome, email };

    try {
      const resposta = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente),
      });

      if (!resposta.ok) throw new Error("Erro ao adicionar cliente");

      const clienteCriado = await resposta.json();
      setClientes([...clientes, clienteCriado]);
      setNome("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  const atualizarCliente = async (id: number) => {
    try {
      const resposta = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, email: novoEmail }),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar cliente");

      setClientes((clientes) =>
        clientes.map((cliente) =>
          cliente.id === id ? { ...cliente, nome: novoNome, email: novoEmail } : cliente
        )
      );
      setEditandoCliente(null);
    } catch (error) {
      console.error(error);
    }
  };

  const removerCliente = async (id: number) => {
    try {
      const resposta = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) throw new Error("Erro ao remover cliente");

      setClientes((clientes) => clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Clientes e Ativos</h1>

      <form onSubmit={adicionarCliente} className="mb-4 flex gap-2">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded w-1/3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Cliente
        </button>
      </form>

      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border">
              <td className="border p-2">{cliente.id}</td>
              <td className="border p-2">
                {editandoCliente === cliente.id ? (
                  <input
                    type="text"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  cliente.nome
                )}
              </td>
              <td className="border p-2">
                {editandoCliente === cliente.id ? (
                  <input
                    type="email"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  cliente.email
                )}
              </td>
              <td className="border p-2">
                {editandoCliente === cliente.id ? (
                  <button
                    onClick={() => atualizarCliente(cliente.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditandoCliente(cliente.id);
                        setNovoNome(cliente.nome);
                        setNovoEmail(cliente.email);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removerCliente(cliente.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </>
                )}
                <button
                  onClick={() => toggleExpand(cliente.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded ml-2"
                >
                  {expanded === cliente.id ? "Recolher" : "Expandir"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
