create table if not exists cart_items
(
    id
    uuid
    primary
    key
    default
    gen_random_uuid
(
),
    user_id uuid not null,
    product_id uuid references products
(
    id
) on delete cascade,
    quantity int default 1,
    added_at timestamp
  with time zone default now()
    );