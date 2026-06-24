# Local Map Story - Vue MVP Plan

## Muc Tieu

Xay dung mot web app Vue.js cho phep tao va xuat ban "ban do ke chuyen dia phuong".

Admin co the:

- Tao khu vuc, vi du mot thon, xa, lang nghe, khu du lich nho.
- Them diem noi bat tren ban do.
- Upload hoac gan link anh/video/audio.
- Viet mo ta ngan va meo dia phuong.
- Tao tuyen tham quan.
- Xuat ban trang public.

Nguoi xem co the:

- Mo link public cua khu vuc.
- Xem ban do va danh sach diem noi bat.
- Loc theo danh muc va ban kinh.
- Bam vao dia diem de xem anh/video/audio/mo ta.
- Xem tuyen tham quan goi y.
- Mo chi duong bang Google Maps link.

## Nguyen Tac MVP

- Web-first, mobile-first.
- Khong lam mobile native app.
- Khong dung Google Maps API de tranh chi phi.
- Dung OpenStreetMap data + MapLibre GL JS + vector tiles/style open-source.
- Uu tien giao dien ban do sang, nhe, gan cam giac Google Maps nhung khong dung Google tile.
- Khong can tai khoan nguoi xem.
- Khong lam du lieu toan quoc.
- Chi lam noi dung mau that dep cho 1 khu vuc nho.
- Cong nghe phai phuc vu noi dung, khong phai diem ban chinh.

## Cong Nghe Ban Do Chon

```text
Map engine: MapLibre GL JS
Map data: OpenStreetMap
Vector tiles: OpenFreeMap de prototype; OpenMapTiles hoac Protomaps PMTiles khi tu host
Style editor: Maputnik
Geocoding: Nominatim/Photon/Pelias neu can search dia diem
Routing: OSRM/Valhalla neu can chi duong noi bo
```

Nguyen tac: khong dung Google Maps API, khong dung Google tile URL truc tiep, khong phu thuoc public OSM raster tile server cho production.

## Cau Truc Tai Lieu

- [product.md](./product.md): bai toan, nguoi dung, pham vi MVP.
- [architecture.md](./architecture.md): kien truc cong nghe de trien khai.
- [data-model.md](./data-model.md): data model va schema de xuat.
- [roadmap.md](./roadmap.md): roadmap theo phase.
- [content-sample-plan.md](./content-sample-plan.md): ke hoach tao noi dung mau dep cho 1 dia phuong.
- [tasks/](./tasks): cac task tach rieng de code.

## Thu Tu Lam Khuyen Nghi

1. Lam prototype public map bang data hardcode.
2. Tao noi dung mau cho 1 khu vuc that.
3. Lam admin CRUD cho khu vuc/dia diem.
4. Lam tuyen tham quan.
5. Them upload media/storage.
6. Toi uu mobile, chia se link, SEO co ban.


## run build
 npm run build 

## run ngrok
npm run preview:public -- --port 4173