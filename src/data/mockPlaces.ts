export interface PlaceMedia {
  id: string | number;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title?: string;
  provider?: 'youtube' | 'vimeo' | 'local';
}

export interface Place {
  id: number;
  name: string;
  category: string;
  summary: string;
  description: string;
  lat: number;
  lng: number;
  coverUrl: string;
  bestTime: string;
  localTip: string;
  media?: PlaceMedia[];
}

export const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Hồ Hoàn Kiếm (Hồ Gươm)',
    category: 'Văn Hóa',
    summary: 'Trái tim xanh của thủ đô Hà Nội, gắn liền với truyền thuyết trả gươm thần.',
    description: 'Nằm giữa trung tâm Hà Nội cổ kính, là biểu tượng du lịch lịch sử với cầu Thê Húc đỏ tươi dẫn vào đền Ngọc Sơn trên đảo ngọc nhỏ giữa hồ. Nơi đây là điểm tụ hội văn hóa và đi bộ thư giãn quen thuộc của người dân thủ đô vào mỗi dịp cuối tuần.',
    lat: 21.0285,
    lng: 105.8521,
    coverUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Sáng sớm hoặc hoàng hôn từ Thứ Sáu đến Chủ Nhật (khi có phố đi bộ).',
    localTip: 'Hãy ghé qua quán Cafe Đinh gần đó để thưởng thức ly cafe trứng chuẩn vị Hà Nội cổ.',
    media: [
      {
        id: '1-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
        title: 'Hồ Gươm sáng sớm'
      },
      {
        id: '1-2',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        provider: 'youtube',
        title: 'Giới thiệu về Hà Nội'
      },
      {
        id: '1-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80',
        title: 'Tháp Rùa lung linh đêm về'
      }
    ]
  },
  {
    id: 2,
    name: 'Văn Miếu - Quốc Tử Giám',
    category: 'Lịch Sử',
    summary: 'Trường đại học đầu tiên của Việt Nam lập năm 1076 dưới triều Lý.',
    description: 'Một quần thể kiến trúc Nho giáo cổ kính tiêu biểu, thờ Khổng Tử và lưu giữ 82 tấm bia Tiến sĩ vinh danh những người đỗ đạt. Khuôn viên chia làm 5 lớp không gian mang kiến trúc phong kiến độc đáo với Khuê Văn Các làm biểu tượng.',
    lat: 21.0293,
    lng: 105.8360,
    coverUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    bestTime: '8:00 - 10:00 sáng, tránh những ngày lễ hội đông đúc.',
    localTip: 'Thuê hướng dẫn viên audio guide tại cổng để hiểu chi tiết lịch sử và ý nghĩa của từng khu nhà và bia đá.',
    media: [
      {
        id: '2-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        title: 'Khuê Văn Các'
      },
      {
        id: '2-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
        title: 'Nhà bia Tiến sĩ cổ kính'
      }
    ]
  },
  {
    id: 3,
    name: 'Nhà Thờ Lớn Hà Nội',
    category: 'Kiến Trúc',
    summary: 'Công trình kiến trúc Gothic đặc trưng hoàn thành vào năm 1887.',
    description: 'Tên chính thức là Nhà thờ chính tòa Thánh Giuse, được xây dựng theo hình mẫu Nhà thờ Đức Bà Paris với hai tháp chuông cao vút và bức tường nhuốm màu thời gian. Đây là điểm check-in cực hot của giới trẻ.',
    lat: 21.0288,
    lng: 105.8490,
    coverUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Chiều tối muộn hoặc khi nhà thờ lên đèn.',
    localTip: 'Trải nghiệm văn hóa "trà chanh Nhà Thờ" tại các quán vỉa hè xung quanh để cảm nhận nhịp sống Hà thành.',
    media: [
      {
        id: '3-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
        title: 'Nhà Thờ Lớn Hà Nội'
      },
      {
        id: '3-2',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        provider: 'local',
        title: 'Video test mẫu file MP4'
      }
    ]
  },
  {
    id: 4,
    name: 'Phố Bia Tạ Hiện',
    category: 'Ẩm Thực',
    summary: 'Trung tâm vui chơi giải trí về đêm tấp nập của giới trẻ và du khách.',
    description: 'Con phố ẩm thực ngắn nhưng cực kỳ nổi tiếng trong lòng phố cổ. Về đêm, nơi đây bày kín bàn ghế nhựa, phục vụ bia hơi mát lạnh cùng các món nhậu đường phố như nem chua rán, khoai tây chiên, chim quay.',
    lat: 21.0347,
    lng: 105.8525,
    coverUrl: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Sau 20:00 tối, đặc biệt đông vui vào ngày cuối tuần.',
    localTip: 'Hãy chọn một bàn nhỏ sát lối đi để vừa uống bia vừa ngắm dòng người tấp nập qua lại.',
    media: [
      {
        id: '4-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=800&q=80',
        title: 'Bàn ghế nhựa đặc trưng tại Tạ Hiện'
      }
    ]
  },
  {
    id: 5,
    name: 'Chùa Một Cột',
    category: 'Kiến Trúc',
    summary: 'Chùa Liên Hoa Đài có kiến trúc độc đáo tựa như một đóa hoa sen mọc lên từ nước.',
    description: 'Được xây dựng vào năm 1049 dưới thời vua Lý Thái Tông, ngôi chùa có kết cấu bằng gỗ đặt trên một cột đá duy nhất giữa hồ linh chi. Đây là một trong những biểu tượng văn hóa tâm linh và kiến trúc độc bản của Việt Nam.',
    lat: 21.0358,
    lng: 105.8336,
    coverUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Sáng sớm trước 9:00 để cảm nhận sự thanh tịnh.',
    localTip: 'Nằm ngay trong quần thể Lăng Bác nên bạn có thể kết hợp tham quan Lăng và Bảo tàng Hồ Chí Minh.',
    media: []
  },
  {
    id: 6,
    name: 'Hoàng Thành Thăng Long',
    category: 'Lịch Sử',
    summary: 'Khu di sản văn hóa thế giới UNESCO lưu giữ dấu vết hoàng cung qua nhiều triều đại.',
    description: 'Quần thể di tích lịch sử rộng lớn phản ánh lịch sử kinh đô Thăng Long - Hà Nội từ thế kỷ thứ VII đến thế kỷ XXI. Điểm nhấn là Đoan Môn, Kỳ Đài và các hầm chỉ huy quân sự thời kỳ kháng chiến chống Mỹ.',
    lat: 21.0345,
    lng: 105.8398,
    coverUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Mùa thu (tháng 9 - tháng 11) khi thời tiết khô ráo và lá vàng rơi tuyệt đẹp.',
    localTip: 'Có tour đêm Hoàng Thành Thăng Long rất đặc sắc nếu bạn muốn trải nghiệm giải mã di sản dưới ánh đèn lung linh.',
    media: [
      {
        id: '6-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        title: 'Đoan Môn Hoàng Thành Thăng Long'
      }
    ]
  },
  {
    id: 7,
    name: 'Cầu Long Biên',
    category: 'Lịch Sử',
    summary: 'Cây cầu thép lịch sử vắt qua sông Hồng, nhân chứng lịch sử kiên cường.',
    description: 'Được xây dựng bởi người Pháp từ năm 1898 đến 1902, cây cầu mang dấu vết bom đạn của các cuộc chiến tranh. Hiện nay cầu chỉ dành cho xe máy, xe đạp, tàu hỏa và người đi bộ.',
    lat: 21.0435,
    lng: 105.8564,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Bình minh hoặc hoàng hôn buông xuống sông Hồng.',
    localTip: 'Xuống bãi đá sông Hồng dưới chân cầu để chụp những bức ảnh đồng quê hoang sơ thơ mộng.',
    media: [
      {
        id: '7-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        title: 'Hoàng hôn trên Cầu Long Biên'
      }
    ]
  },
  {
    id: 8,
    name: 'Chùa Trấn Quốc (Hồ Tây)',
    category: 'Văn Hóa',
    summary: 'Ngôi chùa cổ nhất Hà Nội với lịch sử hơn 1500 năm nằm cạnh Hồ Tây.',
    description: 'Nằm trên một bán đảo nhỏ phía đông Hồ Tây, chùa Trấn Quốc nổi bật với bảo tháp lục độ đài sen cao nhiều tầng cùng cây bồ đề linh thiêng được chiết từ cây bồ đề gốc tại Ấn Độ.',
    lat: 21.0482,
    lng: 105.8369,
    coverUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Khoảng 16:30 chiều để vừa tham quan vừa đón hoàng hôn rực rỡ trên Hồ Tây.',
    localTip: 'Chú ý mặc trang phục lịch sự, kín đáo khi vào lễ chùa để tôn trọng chốn tôn nghiêm.',
    media: [
      {
        id: '8-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80',
        title: 'Chùa Trấn Quốc lung linh lúc hoàng hôn'
      }
    ]
  },
  {
    id: 9,
    name: 'Nhà Hát Lớn Hà Nội',
    category: 'Kiến Trúc',
    summary: 'Tác phẩm nghệ thuật kiến trúc Tân cổ điển Pháp tại ngã sáu Tràng Tiền.',
    description: 'Xây dựng năm 1901 theo hình mẫu Nhà hát Opera Garnier của Paris. Đây là trung tâm tổ chức các sự kiện văn hóa nghệ thuật hàn lâm lớn của quốc gia.',
    lat: 21.0253,
    lng: 105.8567,
    coverUrl: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Buổi tối khi toàn bộ hệ thống đèn chiếu sáng ngoài trời được bật rực rỡ.',
    localTip: 'Thưởng thức kem Tràng Tiền nổi tiếng chỉ cách nhà hát vài bước đi bộ.',
    media: [
      {
        id: '9-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80',
        title: 'Kiến trúc cổ kính của Nhà Hát Lớn'
      }
    ]
  },
  {
    id: 10,
    name: 'Chợ Đồng Xuân',
    category: 'Ẩm Thực',
    summary: 'Khu chợ sầm uất và lâu đời nhất khu phố cổ Hà Nội.',
    description: 'Chợ bán buôn hàng hóa lớn nhất miền Bắc nhưng sở hữu ngõ ẩm thực cực kỳ đa dạng phía bên hông. Bạn có thể tìm thấy mọi đặc sản Hà Nội từ bún chả, bánh tôm, bún ốc cho tới chè các loại.',
    lat: 21.0384,
    lng: 105.8496,
    coverUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Trưa muộn khi các quầy ẩm thực hoạt động đầy đủ nhất.',
    localTip: 'Món bún ốc nguội và bánh tôm tại ngõ chợ Đồng Xuân rất đáng để thử với giá cực bình dân.',
    media: [
      {
        id: '10-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        title: 'Chợ Đồng Xuân nhộn nhịp'
      }
    ]
  },
  {
    id: 11,
    name: 'Đền Quán Thánh',
    category: 'Văn Hóa',
    summary: 'Một trong "Thăng Long Tứ Trấn" bảo vệ phía Bắc kinh thành xưa.',
    description: 'Nằm bên bờ Hồ Tây lịch sử, đền thờ Huyền Thiên Trấn Vũ, nổi tiếng với pho tượng đồng đen đúc nguyên khối nặng gần 4 tấn cùng kiến trúc chạm khắc tinh xảo gỗ thếp vàng cổ kính.',
    lat: 21.0428,
    lng: 105.8341,
    coverUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Sáng mát lành hoặc chiều muộn kết hợp đi dạo đường Thanh Niên.',
    localTip: 'Hãy chiêm ngưỡng pho tượng cổ đồng đen tinh xảo nằm sâu trong hậu điện để thấy tài năng đúc đồng cổ Việt xưa.',
    media: [
      {
        id: '11-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
        title: 'Hồ sen trước đền Quán Thánh'
      }
    ]
  },
  {
    id: 12,
    name: 'Đình Bạch Trữ',
    category: 'Lịch Sử',
    summary: 'Di tích lịch sử cấp Quốc gia có từ thế kỷ 17 với kiến trúc điêu khắc chạm trổ tinh xảo.',
    description: 'Đình Bạch Trữ thờ Công chúa Thiên Tiên Mỵ Nương và Hoàng Cống Sơn (tướng Hai Bà Trưng). Đây là công trình kiến trúc nghệ thuật điêu khắc gỗ tinh xảo thời Lê Trung Hưng còn lưu giữ được nguyên vẹn.',
    lat: 21.2018,
    lng: 105.6925,
    coverUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    bestTime: 'Sáng sớm hoặc dịp Lễ hội truyền thống đầu xuân.',
    localTip: 'Hãy chiêm ngưỡng những nét chạm khắc đầu đao gỗ thời Lê cổ kính ẩn sâu dưới mái đình.',
    media: [
      {
        id: '12-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        title: 'Nghệ thuật chạm khắc gỗ cổ tại đình'
      }
    ]
  },
  {
    id: 13,
    name: 'Đình Diến Táo',
    category: 'Kiến Trúc',
    summary: 'Ngôi đình cổ thờ Lý Nam Đế (Lý Bôn), mang đậm phong cách kiến trúc dân gian thời Nguyễn.',
    description: 'Di tích kiến trúc nghệ thuật thờ vua Lý Nam Đế (Lý Bôn) bảo vệ đất nước. Ngôi đình lưu giữ nhiều tác phẩm điêu khắc rồng, mây cầu kỳ cùng nhiều bảo vật, sắc phong bằng đồng cổ kính vô giá.',
    lat: 21.2085,
    lng: 105.6812,
    coverUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80',
    bestTime: '8:00 - 11:00 sáng khi có ánh nắng rọi qua sân đình.',
    localTip: 'Nên ghé thăm nhà văn hóa gần đó để tìm hiểu thêm giai thoại sáp nhập xã Tiến Thắng.',
    media: [
      {
        id: '13-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=800&q=80',
        title: 'Mái ngói vảy rồng cổ kính'
      },
      {
        id: '13-2',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        provider: 'youtube',
        title: 'Lễ hội làng cổ Mê Linh'
      }
    ]
  }
];
