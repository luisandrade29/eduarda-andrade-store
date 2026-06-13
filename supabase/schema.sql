-- Run this once in the Supabase SQL editor of your project
-- (https://supabase.com/dashboard/project/ujftpbcqypijcsnooogf/sql/new)

-- 1. Products table -----------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  subcategory text,
  price numeric,
  description text,
  images jsonb not null default '[]'::jsonb, -- [{ id, label, url, path }]
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Public read access (storefront)
create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- Public write access (matches the original app, which has no real auth
-- and gates the admin panel client-side with a password).
create policy "Anyone can insert products"
  on public.products for insert
  with check (true);

create policy "Anyone can update products"
  on public.products for update
  using (true);

create policy "Anyone can delete products"
  on public.products for delete
  using (true);

-- 2. Storage bucket for product images ----------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Anyone can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "Anyone can update product images"
  on storage.objects for update
  using (bucket_id = 'product-images');

create policy "Anyone can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images');
