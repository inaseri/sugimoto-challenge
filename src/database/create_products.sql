create table if not exists products
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    title text not null,
    description text,
    price numeric not null,
    additional_data jsonb,
    created_at timestamp with time zone default now()
    );