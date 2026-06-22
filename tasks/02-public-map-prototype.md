# Task 02: Public Map Prototype

## Muc Tieu

Tao public map bang MapLibre GL JS voi data hardcode va basemap open-source dep gan cam giac Google Maps.

## Viec Can Lam

- Tach map hien tai trong `src/pages/public/PublicArea.vue` thanh component `PublicMap.vue`.
- Migrate tu Leaflet/CARTO raster tile sang MapLibre GL JS/vector tile.
- Hien thi MapLibre GL JS map.
- Dung OpenFreeMap vector tiles/style cho prototype.
- Tao file/style cau hinh de sau nay co the thay bang OpenMapTiles hoac Protomaps PMTiles self-host.
- Chinh style "Google-light": nen xam nhat, duong trang/xam nhe, cong vien xanh nhat, nuoc xanh nhat, label tiet che.
- Dat center theo area demo.
- Tao data hardcode 10-15 places.
- Hien marker/layer theo places.
- Click marker hien popup hoac bottom sheet.
- Them filter category.
- Them filter radius tu center area.
- Them nut "Chi duong" mo Google Maps link ngoai.
- Them link OpenStreetMap direction fallback.
- Hien attribution OpenStreetMap va tile/style provider dung cach.

## Data Mau

Moi place can:

```text
id
name
category
description
lat
lng
coverUrl
bestTime
localTip
```

## Acceptance Criteria

- `PublicArea.vue` khong con import `leaflet`.
- `package.json` dung `maplibre-gl`; go `leaflet` va `@types/leaflet` neu khong con dung.
- Map hien thi tot tren desktop va mobile.
- Basemap khong dung Google Maps API hoac Google tile URL.
- Giao dien map sang, sach, it roi, gan cam giac Google Maps.
- Marker hien dung vi tri.
- Loc category hoat dong.
- Loc radius hoat dong.
- Click marker thay thong tin place.
- Nut chi duong mo Google Maps tab moi.
