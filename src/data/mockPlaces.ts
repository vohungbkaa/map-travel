export interface PlaceMedia {
  id: string | number;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title?: string;
  provider?: 'youtube' | 'vimeo' | 'local';
}

export interface ExploreSection {
  text: string;
  imgUrl?: string;
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
  exploreSections?: ExploreSection[];
}

export const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Đình Bạch Trữ',
    category: 'Kiến trúc',
    summary: 'Đình Bạch Trữ xây vào cuối thế kỷ 17, thờ phụng Mỵ Nương (phu nhân Sơn Thánh Tản Viên) và Hoàng Cống tức danh tướng Cống Sơn, quân sư của Nhị vua Hai Bà Trưng) làm thành hoàng làng.',
    description: 'Đình Bạch Trữ thờ Công chúa Thiên Tiên Mỵ Nương và Hoàng Cống Sơn (tướng Hai Bà Trưng). Đây là công trình kiến trúc nghệ thuật điêu khắc gỗ tinh xảo thời Lê Trung Hưng còn lưu giữ được nguyên vẹn.',
    lat: 21.2018,
    lng: 105.6925,
    coverUrl: '/images/image_4.jpeg',
    bestTime: 'Sáng sớm hoặc dịp Lễ hội truyền thống đầu xuân.',
    localTip: 'Hãy chiêm ngưỡng những nét chạm khắc đầu đao gỗ thời Lê cổ kính ẩn sâu dưới mái đình.',
    media: [
      {
        id: '1-video',
        type: 'video',
        url: 'https://youtu.be/dRn20b1Y6To?si=QO8oyMgJnwyugW3T',
        provider: 'youtube',
        title: 'Video giới thiệu Đình Bạch Trữ'
      },
      {
        id: '1-photo-1',
        type: 'image',
        url: '/images/image_4.jpeg',
        title: 'Cổng đình Bạch Trữ cổ kính'
      },
      {
        id: '1-photo-2',
        type: 'image',
        url: '/images/image_5.jpeg',
        title: 'Sân đình và mái ngói'
      },
      {
        id: '1-photo-3',
        type: 'image',
        url: '/images/image_6.jpeg',
        title: 'Bên trong chính điện thờ tự'
      }
    ],
    exploreSections: [
      {
        text: 'Đình Bạch Trữ xây vào cuối thế kỷ 17, thờ phụng Mỵ Nương (phu nhân Sơn Thánh Tản Viên) và Hoàng Cống tức danh tướng Cống Sơn, quân sư của Nhị vua Hai Bà Trưng) làm thành hoàng làng.',
        imgUrl: '/images/image_4.jpeg'
      },
      {
        text: 'Nằm ở phía bắc huyện Mê Linh, ven sông Cà Lồ bốn mùa nước biếc, ranh giới tự nhiên của 2 huyện Mê Linh - Hà Nội và Bình Xuyên - Vĩnh Phúc, xã Tiến Thắng là một địa danh được nhiều người biết đến không chỉ nơi đây là một vùng quê với những trại vải ngon nổi tiếng, mà chính nơi đây dấu tích lịch sử đã in đậm ở mỗi thôn làng.',
        imgUrl: '/images/image_5.jpeg'
      },
      {
        text: 'Từ Quốc lộ 2 đến ngã ba Tiền Châu (thuộc thị xã Phúc Yên - tỉnh Vĩnh Phúc) đi theo đường 35 chừng 1km là đến thôn đầu tiên của xã Tiến Thắng - làng Bạch Trữ.'
      },
      {
        text: 'Các cụ già ở đây truyền lại cho con cháu rằng: Vào thời Hùng Vương dựng nước, Ngọc Hoa công chúa con vua Hùng Duệ Vương nhân một chuyến đi du ngoạn thăm cảnh nước biếc non xanh, đến nơi này thấy ngút ngàn một màu hoa cỏ Trữ trắng ngọc, trắng ngà, bèn đặt tên cho làng là Bạch Trữ. Bà dạy dân Bạch Trữ cấy lúa, trồng bông, chăn tằm, dệt vải. Ơn người đã tạo nghiệp cho dân làng, khi bà mất đi, dân Bạch Trữ lập miếu thờ.',
        imgUrl: '/images/image_6.jpeg'
      },
      {
        text: 'Các cụ còn truyền lại cho con cháu rằng: Vào năm 40 sau Công nguyên khi Hai Bà Trưng phất cờ khởi nghĩa, bên cạnh các tướng tài ba như Lê Chân, Thánh Thiên, Ả Tắc, Ả Di, Vĩnh Huy, Liễu Giáp, Nàng Tía, Bát Nàn... còn có một người đã hiến dâng trọn vẹn cuộc đời cho cuộc khởi nghĩa - đó là mưu sĩ Cống Sơn.'
      },
      {
        text: 'Theo Ngọc phả đình Bạch Trữ, Cống Sơn sinh ngày 10 tháng giêng năm thứ 3 sau Công nguyên quê ở đất Ái Châu, phủ Trường An, động Hoa Lư. Vốn là người thông minh xuất chúng, lại tinh thông võ nghệ, luôn lấy điều nhân đức để răn mình. Khi phất cờ khởi nghĩa, Trưng Trắc đã vời ông làm quân sư, cậy việc ngày đêm rèn binh mã, thảo hịch đi khắp các phủ huyện kêu gọi hào kiệt 4 phương về tụ nghĩa dưới cờ. Khởi nghĩa thắng lợi, Trưng Trắc lên ngôi vua, ban thưởng cho tướng sĩ, muốn dân. Bà đã phong cho Cống Sơn là Cống Sơn quân sư, thực ấp ở Bạch Trữ trang, huyện Chu Diên. Bà dạy dân Bạch Trữ rằng: Cống Sơn quân sư sống làm thầy dạy, chết làm Thành hoàng làng, cho đón gia quyến ông về đây lập nghiệp, chuẩn miễn cho dân Bạch Trữ không phải đi phu và các dịch khác.'
      },
      {
        text: 'Tưởng nhớ đến công lao của Ngọc Hoa công chúa và Cống Sơn quân sư, về sau dân Bạch Trữ đã lập đình thờ hai vị.'
      }
    ]
  },
  {
    id: 2,
    name: 'Đình làng Phú Mỹ',
    category: 'Kiến trúc',
    summary: 'Đình Phú Mỹ thuộc xã Tự Lập, huyện Mê Linh cũ nay thuộc xã Tiến Thắng, TP Hà Nội. Đình thờ nhị vị tướng quân của Hai Bà Trưng là cặp vợ chồng Hùng Bảo, Trần Nương.',
    description: 'Đình làng Phú Mỹ là một di tích lịch sử cấp Quốc gia nổi bật, thờ cúng nhị vị tướng quân Hùng Bảo và Trần Nương dưới trướng Hai Bà Trưng.',
    lat: 21.2085,
    lng: 105.6525,
    coverUrl: '/images/image_7.jpeg',
    bestTime: 'Sáng sớm hoặc chiều mát các ngày trong tuần.',
    localTip: 'Quý khách nên mặc trang phục trang nghiêm và đi nhẹ nói khẽ khi tham quan di tích lịch sử.',
    media: [
      {
        id: '2-video',
        type: 'video',
        url: 'https://youtu.be/LrazeOS3WGY?si=qTY_DyCjWLgTaird',
        provider: 'youtube',
        title: 'Video giới thiệu Đình Phú Mỹ'
      },
      {
        id: '2-photo-1',
        type: 'image',
        url: '/images/image_7.jpeg',
        title: 'Mặt tiền đình Phú Mỹ cổ kính'
      },
      {
        id: '2-photo-2',
        type: 'image',
        url: '/images/image_8.jpeg',
        title: 'Mái ngói điêu khắc cổ'
      },
      {
        id: '2-photo-3',
        type: 'image',
        url: '/images/image_9.jpeg',
        title: 'Sân đình rộng lớn'
      }
    ],
    exploreSections: [
      {
        text: 'Đình Phú Mỹ thuộc xã Tự Lập, huyện Mê Linh cũ nay thuộc xã Tiến Thắng, TP Hà Nội. Đình thờ nhị vị tướng quân của Hai Bà Trưng là cặp vợ chồng Hùng Bảo, Trần Nương.',
        imgUrl: '/images/image_7.jpeg'
      },
      {
        text: 'Trong cuốn “Việt thường thị Trưng vương công thần Bảo Vương Hải bộ chủ phụ đạo đại vương Ngọc phả” do Nguyễn Bính viết vào năm 1572 và Nguyễn Hiền sao lại vào năm 1737 có đoạn nói về vợ chồng Hùng Bảo như sau:',
        imgUrl: '/images/image_8.jpeg'
      },
      {
        text: 'Vào thời Hán Nguyên Đế, ở nước ta, bộ chủ bộ Hải Dương là Hùng Trọng, kết duyên cùng bà Trương Quyền. Hai ông bà sinh hạ được một người con trai đặt tên là Hùng Bảo. Năm Hùng Bảo lên 10 tuổi thì cha là Hùng Trọng, bộ chủ bộ Hải Dương qua đời. An táng cha xong, Hùng Bảo thay cha làm bộ chủ Hải Dương. Đến năm ông 19 tuổi với tài năng, đức độ của mình, các bậc anh hùng, hào kiệt khắp nơi tìm về quy phục. Năm ông 21 tuổi thì mẹ qua đời, ông an táng mẹ cẩn thận. Một năm sau, Hùng Bảo đi tuần du đất nước ngắm cảnh núi sông. Đến huyện Chu Diên, nhân dân bái tạ và lập một cung để ông nghỉ. Bấy giờ huyện tể Chu Diên là Trần Công có con gái là Trần Thị Nương hết sức xinh đẹp, nết na lại tài giỏi. Nàng là bậc hào kiệt trong giới nữ nhi. Trong huyện có một người tên là Đinh Công Dũng vốn là một hào phú, dũng lược và có thế lực muốn dạm hỏi Trần Nương làm vợ, nhưng Trần Công không gả vì đã hứa gả con gái mình cho con trai ông Hùng Trọng. Nay, thấy Hùng Bảo đích thân đến thật xứng đôi, liền gả cho. Hùng Bảo tổ chức lễ cưới Trần Nương. Được tin ấy, Đinh Công Dũng vô cùng tức tối, đem hơn 100 gia binh thân thuộc đến đánh phá đám cưới, cướp lại Trần Nương. Đinh Công Dũng đã bị Hùng Bảo chém chết, đám cưới tiếp tục được tiến hành. Sau đó, Hùng Bảo khao thưởng quân sĩ, dân làng rồi đưa Trần Nương về Hải Dương.',
        imgUrl: '/images/image_9.jpeg'
      }
    ]
  },
  {
    id: 3,
    name: 'Mô hình dưa lưới',
    category: 'Ẩm thực',
    summary: 'Mô hình trồng dưa lưới tại thôn Thanh Vân, xã Tiến Thắng là một trong những điểm sáng về ứng dụng nông nghiệp công nghệ cao, mang lại hiệu quả kinh tế vượt trội cho người nông dân địa phương.',
    description: 'Mô hình ứng dụng nông nghiệp công nghệ cao độc đáo của bà con xã Tiến Thắng, mang lại quả dưa lưới chất lượng chuẩn VietGAP.',
    lat: 21.2025,
    lng: 105.6770,
    coverUrl: '/images/image_10.png',
    bestTime: 'Trưa muộn hoặc chiều để tham quan nhà màng công nghệ cao.',
    localTip: 'Trực tiếp mua dưa tại vườn làm quà biếu, rất thơm ngon và giòn ngọt.',
    media: [
      {
        id: '3-photo-1',
        type: 'image',
        url: '/images/image_10.png',
        title: 'Mô hình dưa lưới tại thôn Thanh Vân'
      },
      {
        id: '3-photo-2',
        type: 'image',
        url: '/images/image_11.png',
        title: 'Công nghệ tưới tiêu nhỏ giọt trong nhà màng'
      },
      {
        id: '3-photo-3',
        type: 'image',
        url: '/images/image_12.png',
        title: 'Sản xuất dưa lưới ứng dụng chuyển đổi số'
      }
    ],
    exploreSections: [
      {
        text: 'Mô hình trồng dưa lưới tại thôn Thanh Vân, xã Tiến Thắng (thuộc huyện Mê Linh, Hà Nội) là một trong những điểm sáng về ứng dụng nông nghiệp công nghệ cao, mang lại hiệu quả kinh tế vượt trội cho người nông dân tại địa phương.',
        imgUrl: '/images/image_10.png'
      },
      {
        text: 'Dưới đây là các thông tin chi tiết, đặc điểm nổi bật và định hướng phát triển của mô hình này:'
      },
      {
        text: 'Đặc điểm kỹ thuật áp dụng:\n• Hệ thống nhà màng khép kín: Giúp cách ly cây trồng khỏi các loại sâu bệnh, côn trùng phá hoại, hạn chế tối đa việc sử dụng thuốc bảo vệ thực vật nhằm tạo ra sản phẩm sạch, an toàn cho người tiêu dùng.\n• Công nghệ tưới nhỏ giọt tự động: Áp dụng hệ thống tưới tiêu hiện đại (thường theo công nghệ Israel), đưa trực tiếp nước và chất dinh dưỡng đến từng gốc cây, giúp tiết kiệm nước và tối ưu hóa lượng phân bón sử dụng.\n• Giá thể sạch: Dưa được trồng trong các bầu giá thể xơ dừa đã qua xử lý thay vì trồng trực tiếp xuống đất, kiểm soát tốt nguồn bệnh từ đất và giúp rễ phát triển tối đa.',
        imgUrl: '/images/image_11.png'
      },
      {
        text: 'Hiệu quả kinh tế và ưu điểm:\n• Năng suất cao: Nhờ kiểm soát tốt các yếu tố nhiệt độ, độ ẩm và dinh dưỡng trong nhà màng, tỷ lệ cây sống đạt rất cao, quả đồng đều, cho năng suất ổn định.\n• Sản xuất quanh năm: Việc canh tác trong nhà màng giúp người dân tránh được các tác động tiêu cực của thời tiết (như mưa lớn, nắng gắt), có thể làm liên tục từ 3 - 4 vụ/năm thay vì phụ thuộc vào tính mùa vụ như nông nghiệp truyền thống.\n• Giá trị thương mại lớn: Dưa lưới công nghệ cao có độ đường (Brix) đạt chuẩn, mẫu mã quả có vân lưới đẹp mắt, đáp ứng tiêu chuẩn cung ứng cho các siêu thị, cửa hàng nông sản sạch với mức giá ổn định.'
      },
      {
        text: 'Định hướng phát triển tại địa phương:\n• Gắn liền với chuyển đổi số: Xã Tiến Thắng đang đẩy mạnh xây dựng mô hình "Thôn số" tại thôn Thanh Vân. Các sản phẩm nông sản như dưa lưới đang từng bước được đưa lên các sàn thương mại điện tử, kênh tiêu thụ trực tuyến để mở rộng thị trường, nâng cao thu nhập và hạn chế phụ thuộc vào thương lái.\n• Hỗ trợ từ Hợp tác xã: Hợp tác xã dịch vụ nông nghiệp Thanh Vân đóng vai trò đồng hành cùng bà con trong việc chuyển giao tiến bộ khoa học kỹ thuật, định hướng quy trình sản xuất đạt chuẩn an toàn thực phẩm',
        imgUrl: '/images/image_12.png'
      }
    ]
  }
];
