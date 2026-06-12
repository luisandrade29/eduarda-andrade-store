# Eduarda Andrade — Loja Online

Loja de moda, acessórios e decoração, construída em React + Vite, com
Supabase (Postgres + Storage) como backend.

## Stack

- **React 19** + **Vite** + **react-router-dom**
- **Supabase**: tabela `products` (Postgres) + bucket `product-images` (Storage)
- Deploy: **Vercel**

## Configuração

1. Copia `.env.example` para `.env` e preenche com as credenciais do projeto
   Supabase (Settings → API):

   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_ADMIN_PASSWORD=...   # password do /admin (default: lumiere2025)
   ```

2. No **SQL Editor** do Supabase, corre o script `supabase/schema.sql`.
   Isto cria:
   - a tabela `products` (com a coluna `images` em formato `jsonb`,
     guardando `[{ id, label, url, path }]` — URLs do Storage, não base64);
   - o bucket público `product-images`;
   - políticas de acesso (leitura pública, escrita para o painel admin).

3. Instala as dependências e arranca o servidor de desenvolvimento:

   ```bash
   npm install
   npm run dev
   ```

## Migrar imagens base64 existentes

Se já tens produtos com imagens em base64 (campo `images[].src`), usa o
script `scripts/migrate-images.mjs` para as enviar para o Storage e
substituir por URLs:

```bash
SUPABASE_URL=https://ujftpbcqypijcsnooogf.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=xxxx \
node scripts/migrate-images.mjs
```

## Painel Admin

Acessível em `/admin`, protegido por password (definida em
`VITE_ADMIN_PASSWORD`). Permite adicionar, editar, apagar e destacar
artigos, e faz upload das imagens directamente para o Supabase Storage.

## Categorias

Mulher Casual, Mulher Moda, Homem, Criança, Calçado Mulher, Calçado Homem,
Carteiras, Bijuteria, Mobília, Louças.

## Deploy no Vercel

1. Importa o repositório no Vercel.
2. Define as variáveis de ambiente `VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY` e `VITE_ADMIN_PASSWORD` no projeto Vercel.
3. Build command: `npm run build` · Output directory: `dist`
   (o `vercel.json` já configura o rewrite para SPA).
