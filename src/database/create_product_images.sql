create table if not exists product_images
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
    image_url text not null,
    position int default 0
    );
