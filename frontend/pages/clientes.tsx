import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Esquema de validação com Zod
const ClienteFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  status: z.boolean(),
});

// Tipos
type Cliente = {
  id: number;
  nome: string;
  email: string;
  status: boolean;
};

// Tipo para criação de cliente (sem id)
type ClienteCreate = Omit<Cliente, 'id'>;

function ClientesPage() {
  // Estado para armazenar o id do cliente em edição (se houver)
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Query para buscar clientes
  const { data: clientes, refetch, isLoading, error } = useQuery('clientes', async () => {
    const res = await fetch('http://localhost:3000/clientes');
    if (!res.ok) throw new Error('Erro ao carregar os clientes');
    return res.json();
  });

  // Mutation para adicionar um cliente
  const addMutation = useMutation({
    mutationFn: async (data: ClienteCreate) => {
      const res = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erro ao adicionar cliente');
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Mutation para atualizar um cliente
  const updateMutation = useMutation({
    mutationFn: async (data: Cliente) => {
      const res = await fetch(`http://localhost:3000/clientes/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erro ao atualizar cliente');
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Mutation para deletar um cliente
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao deletar cliente');
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  // useForm para criação/edição (utilizando ClienteCreate, sem id)
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ClienteCreate>({
    resolver: zodResolver(ClienteFormSchema),
  });

  // Função de submissão do formulário
  const onSubmit = (data: ClienteCreate) => {
    if (currentId !== null) {
      // Atualiza o cliente, incluindo o id
      updateMutation.mutate({ ...data, id: currentId });
      setCurrentId(null);
    } else {
      // Cria um novo cliente
      addMutation.mutate(data);
    }
    reset();
  };

  // Preenche o formulário para edição
  const handleEdit = (cliente: Cliente) => {
    setCurrentId(cliente.id);
    setValue('nome', cliente.nome);
    setValue('email', cliente.email);
    setValue('status', cliente.status);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h1>Clientes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('nome')} placeholder="Nome" />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            <input {...register('status')} type="checkbox" /> Ativo
          </label>
        </div>
        <button type="submit">Salvar Cliente</button>
      </form>
      <ul>
        {clientes?.map((cliente: Cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.email} - {cliente.status ? 'Ativo' : 'Inativo'}
            <button onClick={() => handleEdit(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientesPage;
