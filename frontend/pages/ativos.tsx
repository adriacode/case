function AtivosPage() {
    const ativos = [
      { id: 1, nome: 'Ação XYZ', valor: 100 },
      { id: 2, nome: 'Fundo ABC', valor: 150 },
      { id: 3, nome: 'Bitcoin', valor: 30000 },
    ];
  
    return (
      <div>
        <h1>Ativos</h1>
        <ul>
          {ativos.map((ativo) => (
            <li key={ativo.id}>
              {ativo.nome} - R$ {ativo.valor}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default AtivosPage;