# Technical Architecture

## 1. Stack MVP

Khuyen nghi:

```text
Vue 3 + Vite
Vue Router
Pinia
MapLibre GL JS
OpenStreetMap data
OpenFreeMap vector tiles/style cho prototype
Maputnik de chinh style map
Supabase Free hoac Firebase Free
Supabase Storage hoac link media ngoai
```

Neu muon chi phi gan 0 va lam nhanh:

```text
Frontend: Vue 3 + Vite
Map engine: MapLibre GL JS
Map data: OpenStreetMap
Vector tiles/style: OpenFreeMap
Backend/BaaS: Supabase Free
Database: Supabase Postgres
Auth: Supabase Auth
Storage: Supabase Storage
Deploy: Cloudflare Pages/Vercel/Netlify free tier
```

Khi san pham co traffic that hoac can tu chu hon:

```text
Vector tiles: OpenMapTiles self-host hoac Protomaps PMTiles
Style: custom MapLibre style JSON, chinh bang Maputnik
Geocoding: Nominatim/Photon/Pelias
Routing: OSRM/Valhalla
```

## 2. Kien Truc Tong Quan

```text
Vue Web App
  |
  | Supabase client
  v
Supabase
  - Auth
  - Postgres
  - Storage

MapLibre GL JS
  |
  v
Open-source vector tile/style layer
  - OpenFreeMap cho prototype
  - OpenMapTiles/Protomaps PMTiles khi self-host
```

## 3. Ly Do Chon MapLibre GL JS

MapLibre GL JS phu hop muc tieu moi vi:

- Render vector tiles bang WebGL, muot va hien dai hon raster tile.
- Cho phep custom style sau: mau nen, duong, label, POI, building.
- De tao giao dien "Google-light" bang style JSON ma khong dung Google tile.
- Ho tro markers, popups, clusters, GeoJSON sources va layers.
- Co he sinh thai open-source va migration path ro sang self-host.

Leaflet van co the dung cho prototype cuc nhanh, nhung khong phu hop muc tieu giao dien dep nhu Google Maps vi:

- Raster tile kho style lai sau tren client.
- Phu thuoc tile style co san cua provider.
- Hieu ung zoom/label/building khong linh hoat bang vector map.

## 4. Map Style Dinh Huong Google-Light

Style nen uu tien:

- Land background: xam rat nhat.
- Road minor: trang/xam nhat, stroke mem.
- Road major: trang voi casing xam nhe.
- Park/green: xanh nhat, giam saturation.
- Water: xanh lam rat nhat.
- Building: xam nhat, chi hien ro o zoom cao.
- Label: xam trung tinh, hierarchy ro, khong qua day.
- POI: hien tiet che, uu tien POI noi dung cua ung dung.

Dung Maputnik de chinh file `style.json`; khong hardcode Google tile URL.

## 5. Chi Phi

De toi uu chi phi:

- Khong dung Google Maps API.
- Khong dung Google tile URL truc tiep.
- Prototype co the dung OpenFreeMap.
- Production nen dung OpenMapTiles/Protomaps self-host neu can tu chu.
- Upload video nen uu tien link YouTube truoc.
- Anh nen resize truoc khi upload.
- Audio nen gioi han dung luong.
- Khong can server rieng trong MVP.

Luu y:

- Public OSM raster tile server khong nen dung cho production traffic.
- Vector tiles co the host bang provider open-data hoac tu host.
- Luon hien attribution OpenStreetMap va tile/style provider dung cach.

## 6. Routing De Xuat

```text
/                         Landing hoac redirect den area demo
/a/:areaSlug              Public area page
/a/:areaSlug/place/:slug  Public place detail
/a/:areaSlug/route/:slug  Public route detail

/admin/login
/admin
/admin/areas
/admin/areas/:id
/admin/areas/:id/places
/admin/areas/:id/routes
```

## 7. Folder Structure De Xuat

```text
src/
  app/
  assets/
  components/
    map/
      PublicMap.vue
      MapControls.vue
      MapLayerSwitcher.vue
      PlaceMarker.vue
    media/
    place/
    route/
    admin/
  composables/
    useMap.ts
    useMapStyle.ts
    useGeoDistance.ts
    useSupabase.ts
  layouts/
    AdminLayout.vue
    PublicLayout.vue
  pages/
    public/
    admin/
  router/
  stores/
  types/
  utils/
```

## 8. Media Strategy

MVP nen ho tro 2 cach:

1. Gan URL ngoai:
   - YouTube video.
   - Facebook video public neu embed duoc.
   - Link audio ngoai.

2. Upload file:
   - Anh cover.
   - Gallery images.
   - Audio file ngan.

Video upload truc tiep nen de sau vi ton storage/bandwidth.

## 9. Geolocation Va Distance Filter

Loc theo ban kinh co 2 che do:

1. Loc quanh trung tam area:
   - Don gian.
   - Khong can quyen location.

2. Loc quanh vi tri user:
   - Can xin browser geolocation permission.
   - Neu user tu choi, fallback ve center area.

Tinh khoang cach bang Haversine formula.

## 10. Direct Navigation

Khong dung Google Maps API. Chi mo link ngoai:

```text
https://www.google.com/maps/dir/?api=1&destination={lat},{lng}
```

Hoac:

```text
https://www.google.com/maps/search/?api=1&query={lat},{lng}
```

Co the them link thay the open-source:

```text
https://www.openstreetmap.org/directions?to={lat},{lng}
```
