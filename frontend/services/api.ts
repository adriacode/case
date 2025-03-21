
// Definindo as interfaces
interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

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

// Função para pegar a lista de clientes
export const getClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await fetch("http://localhost:3001/clientes");  // Usando fetch para fazer a requisição
    if (!response.ok) {  // Verificando se a resposta foi bem-sucedida
      throw new Error(`Erro ao buscar clientes: ${response.statusText}`);
    }
    const data = await response.json();  // Convertendo a resposta para JSON
    return data;  // Retorna a lista de clientes
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw new Error("Erro ao buscar clientes");
  }
};

// Função para pegar os clientes e seus ativos
export const getClientesAtivos = async (): Promise<ClienteAtivo[]> => {
  try {
    const response = await fetch("http://localhost:3001/clientes-ativos");  // Usando fetch para fazer a requisição
    if (!response.ok) {  // Verificando se a resposta foi bem-sucedida
      throw new Error(`Erro ao buscar clientes e ativos: ${response.statusText}`);
    }
    const data = await response.json();  // Convertendo a resposta para JSON
    return data;  // Retorna os dados com clientes e ativos
  } catch (error) {
    console.error("Erro ao buscar clientes e ativos:", error);
    throw new Error("Erro ao buscar clientes e ativos");
  }
};
