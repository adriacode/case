export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de Gerenciamento de Clientes e Ativos</title>
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
          Sistema de Gerenciamento de Clientes e Ativos
        </header>

        <main className="flex-1 container mx-auto p-4">{children}</main>

        <footer className="bg-gray-800 text-white text-center p-2">
          &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
