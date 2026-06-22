# Product Spec: Ban Do Ke Chuyen Dia Phuong

## 1. Dinh Vi San Pham

San pham khong phai "Google Maps phien ban nho".

Dinh vi dung:

```text
Nen tang tao ban do ke chuyen bang anh, video, audio va tuyen tham quan cho dia phuong nho.
```

Gia tri cot loi:

- Bien cac diem dia phuong thanh cau chuyen de kham pha.
- Giu noi dung o cap rat nho: thon, lang, xa, lang nghe, khu du lich cong dong.
- Giup dia phuong/homestay/truong hoc/quy hoach tour co mot link public dep de chia se.

## 2. Nguoi Dung

### Admin

Co the la:

- Nguoi lam du lich dia phuong.
- Chu homestay.
- Can bo van hoa/du lich xa.
- Giao vien lam du an lich su dia phuong.
- Nhom sinh vien/creator lam noi dung dia phuong.
- Quan ly khu du lich nho.

Nhu cau:

- Tao ban do dia phuong nhanh.
- Them diem noi bat ma khong can biet code.
- Dua video/audio/anh vao tung diem.
- Tao tuyen tham quan co thu tu.
- Co link public de gui/gan QR/chia se.

### Nguoi Xem

Co the la:

- Khach du lich.
- Nguoi moi den dia phuong.
- Hoc sinh/sinh vien.
- Nguoi dan dia phuong muon tim hieu lai ve que minh.
- Khach cua homestay/khu du lich.

Nhu cau:

- Biet gan day co gi hay.
- Xem cau chuyen ngan cua tung diem.
- Loc nhanh theo danh muc.
- Xem tuyen goi y trong 1-2 gio.
- Chi duong bang app ban do quen thuoc.

## 3. Pham Vi MVP

### Co Trong MVP

- Trang public area.
- Ban do MapLibre GL JS voi OpenStreetMap vector data/style open-source.
- Marker dia diem.
- Loc danh muc.
- Loc ban kinh tu tam khu vuc hoac vi tri user neu cho phep location.
- Trang chi tiet dia diem.
- Anh cover, gallery anh.
- Video URL hoac upload video.
- Audio URL hoac upload audio.
- Mo ta ngan.
- Tuyen tham quan.
- Admin CRUD co ban.

### Khong Co Trong MVP

- Review/rating.
- Comment cong khai.
- Booking/thanh toan.
- Tai khoan nguoi xem.
- AI tao noi dung.
- Ban do offline.
- App mobile native.
- Tu ve ranh gioi xa/thon.
- Du lieu toan quoc.

## 4. Public Page Can Tao Cam Giac Gi

Nguoi xem mo vao phai thay ngay:

- Noi nay la dau.
- Co gi dang xem.
- Cac diem nao nen ghe.
- Nen di theo tuyen nao.
- Noi dung co that, co anh/video ro rang.

Trang public can uu tien:

- Mobile-first.
- Anh cover dep.
- Map ro.
- Card dia diem gon.
- Video/audio de mo.
- Mo ta ngan, co cau chuyen.

## 5. Gia Tri Khac Biet

Khac voi Google Maps:

- Google Maps manh ve tim duong, review, tim dia diem dai tra.
- San pham nay manh ve noi dung chon loc, cau chuyen, video/audio va tuyen dia phuong.

Khac voi YouTube/TikTok:

- YouTube/TikTok manh ve video rieng le.
- San pham nay gan video vao ban do va loi trinh thuc dia.

Khac voi website du lich:

- Website du lich thuong la bai viet tinh.
- San pham nay la map-based, co loc theo khoang cach va route.
