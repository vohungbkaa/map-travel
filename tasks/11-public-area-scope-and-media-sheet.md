# Task 11: Public Area Scope And Media Sheet

## Muc Tieu

Khi nguoi xem mo ung dung, vao thang trang public cua khu vuc da cau hinh va chi thay ban do/landmarks thuoc dung tinh, phuong hoac xa mong muon. Khi click chi tiet landmark, hien panel dang bottom sheet khong co overlay nen den, co gallery anh/video vuot ngang va media viewer rieng khi click vao media.

## Viec Can Lam

- Doi route mac dinh `/` redirect thang den `/a/ha-noi`.
- Them cau hinh public area mac dinh, vi du `defaultAreaSlug: 'ha-noi'`.
- Them cau hinh scope co the chon theo tinh hoac phuong/xa cu the.
- Cau hinh scope can co `slug`, `name`, `level`, `center`, `zoom`, va `bounds` hoac `boundaryGeoJson`.
- Neu cau hinh la tinh, map chi fit/lock trong bounds cua tinh do.
- Neu cau hinh la phuong/xa, map chi fit/lock trong bounds cua phuong/xa do.
- Loc danh sach landmarks theo area/scope da cau hinh.
- An hoac khong render marker nam ngoai scope.
- Neu co boundary GeoJSON, ve polygon boundary len map voi style nhe de nguoi xem biet pham vi hien thi.
- Gioi han pan/zoom bang `maxBounds` de nguoi xem khong keo map ra khoi khu vuc cau hinh.
- Cap nhat empty state khi scope khong co landmark.
- Click vao 1 item trong `Key Landmarks` mo detail view dang sheet noi tren man hinh.
- Detail sheet khong dung backdrop/overlay mau den va khong chan thao tac map ngoai phan sheet.
- Sheet co nut dong ro rang va dong khi chon landmark khac thi cap nhat noi dung.
- Sheet hien thong tin co ban cua landmark: ten, category, mo ta, best time, local tip, nut chi duong.
- Sheet hien media carousel gom anh va video cua dia diem.
- Neu co nhieu media, cho vuot slide tu phai sang trai tren mobile va click/drag tren desktop.
- Media carousel can hien indicator hoac thumbnail de biet dang o slide nao.
- Click vao anh thi mo image viewer phu hop man hinh.
- Click vao video thi mo video viewer va phat video.
- Ho tro video URL ngoai nhu YouTube/Vimeo va video file URL neu co.
- Khi viewer media mo, co nut dong, phim Esc tren desktop va khong lam vo layout mobile.
- Neu landmark khong co media, sheet van hien thong tin gon va khong de khoang trong xau.

## Data Can Bo Sung

Area/scope config:

```text
slug
name
level: province | ward
parentSlug
center: [lng, lat]
zoom
bounds: [[west, south], [east, north]]
boundaryGeoJson
```

Place media:

```text
media[]
  id
  type: image | video
  url
  thumbnailUrl
  title
  provider
```

## Acceptance Criteria

- Mo `http://localhost:5173/` tu dong vao `http://localhost:5173/a/ha-noi`.
- Doi config area/scope thi public page vao dung khu vuc moi ma khong can sua nhieu file.
- Map fit dung tinh/phuong/xa duoc cau hinh.
- Map khong hien marker ngoai scope.
- Nguoi xem khong keo map ra ngoai pham vi cau hinh.
- Click landmark trong `Key Landmarks` mo sheet chi tiet khong co nen den overlay.
- Sheet hoat dong tot tren mobile va desktop.
- Carousel vuot ngang duoc khi co nhieu anh/video.
- Click anh mo viewer anh.
- Click video mo viewer video va phat duoc.
- Dong sheet/viewer khong lam mat state map/filter dang co.
