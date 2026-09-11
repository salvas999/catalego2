# PACK24 — catálogo + potenciais clientes

## Onde ficam os contactos

O formulário “Receber promoções” envia os dados diretamente para o backend já usado pelo portal de operações. O backend guarda-os na tabela PostgreSQL `promotion_leads`.

No `operacoes.pack24.pt`, apenas um utilizador autenticado como gestor consegue abrir a nova página **Potenciais clientes**. É possível alterar cada contacto entre **Novo**, **Contactado**, **Convertido** e **Arquivado**.

Não são enviados para WhatsApp, não ficam apenas no navegador e a ligação à base de dados nunca é exposta no catálogo.

## Publicar primeiro o dashboard/backend

Substitua os ficheiros do projeto de operações pelos do ZIP atualizado e faça o deploy do backend. O comando existente `npm start` executa automaticamente a migração `003_promotion_leads.sql` antes de iniciar o servidor.

No serviço do backend (por exemplo Railway), mantenha as variáveis atuais e acrescente:

```env
CATALOG_URL=https://pack24.pt
```

O backend aceita pedidos do catálogo apenas das origens autorizadas. Para testar num preview do Vercel, use temporariamente o URL completo desse preview em `CATALOG_URL`.

## Publicar o catálogo

No projeto Vercel do catálogo, crie esta variável usando exatamente o mesmo endereço que já está configurado como `VITE_API_URL` no dashboard:

```env
VITE_OPERATIONS_API_URL=https://api.pack24.pt
```

Se o backend tiver outro endereço público, use esse endereço em vez do exemplo.

Depois faça o deploy. O Vercel usa `npm run build` e publica a pasta `dist`.

## Teste obrigatório antes do domínio público

1. Abra o preview do catálogo.
2. Preencha “Receber promoções” com um contacto de teste e aceite o consentimento.
3. Confirme a mensagem “Contacto guardado. Obrigado!”.
4. Entre em `operacoes.pack24.pt` como gestor.
5. Abra **Potenciais clientes** e confirme o registo.
6. Altere o estado para **Contactado** e atualize a página.
7. Teste também pesquisa, filtros, carrinho persistente, quantidades, IVA, depósito VOLTA e WhatsApp.

## GitHub

Em cada projeto, no terminal aberto na pasta correta:

```bash
git status
git add -A
git commit -m "Integra catalogo e potenciais clientes PACK24"
git push origin main
```

Nunca faça commit do ficheiro `.env`, da pasta `node_modules` ou das credenciais da base de dados.
