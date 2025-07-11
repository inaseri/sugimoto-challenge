create table if not exists comments
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    product_id uuid references products
(
    id
) on delete cascade,
    user_id uuid not null,
    content text not null,
    created_at timestamp
  with time zone default now()
    );