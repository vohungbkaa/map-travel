# Data Model

## 1. areas

Dai dien cho mot khu vuc: thon, xa, lang nghe, homestay area, khu du lich.

```sql
id uuid primary key
name text not null
slug text unique not null
description text
cover_url text
center_lat numeric not null
center_lng numeric not null
default_radius_km numeric default 3
published boolean default false
created_at timestamptz
updated_at timestamptz
```

## 2. places

Dai dien cho mot dia diem tren ban do.

```sql
id uuid primary key
area_id uuid references areas(id)
name text not null
slug text not null
category text not null
description text
local_tip text
best_time text
price_range text
address text
lat numeric not null
lng numeric not null
cover_url text
video_url text
audio_url text
published boolean default false
sort_order int default 0
created_at timestamptz
updated_at timestamptz
```

Category de xuat:

```text
landmark
historic
food
cafe
specialty
craft_village
homestay
viewpoint
activity
market
```

## 3. place_images

```sql
id uuid primary key
place_id uuid references places(id)
image_url text not null
caption text
sort_order int default 0
created_at timestamptz
```

## 4. routes

Dai dien cho tuyen tham quan.

```sql
id uuid primary key
area_id uuid references areas(id)
name text not null
slug text not null
description text
duration_minutes int
distance_km numeric
cover_url text
published boolean default false
created_at timestamptz
updated_at timestamptz
```

## 5. route_places

Bang lien ket dia diem vao tuyen theo thu tu.

```sql
id uuid primary key
route_id uuid references routes(id)
place_id uuid references places(id)
sort_order int not null
note text
created_at timestamptz
```

## 6. media_assets

Tuy chon. Dung neu muon quan ly media tap trung.

```sql
id uuid primary key
area_id uuid references areas(id)
place_id uuid null references places(id)
type text not null
url text not null
title text
caption text
mime_type text
size_bytes int
created_at timestamptz
```

type:

```text
image
video
audio
document
```

## 7. admins

Neu dung Supabase Auth, co the map auth user vao admin profile.

```sql
id uuid primary key
auth_user_id uuid unique not null
name text
email text
created_at timestamptz
```

## 8. area_admins

Cho phep mot admin quan ly nhieu area.

```sql
id uuid primary key
area_id uuid references areas(id)
admin_id uuid references admins(id)
role text default 'owner'
created_at timestamptz
```

## 9. Chi Muc Nen Co

```sql
create index places_area_id_idx on places(area_id);
create index places_category_idx on places(category);
create index places_location_idx on places(lat, lng);
create index routes_area_id_idx on routes(area_id);
create index route_places_route_id_idx on route_places(route_id);
```

