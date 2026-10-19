
export type Photo = {
  src: string;
  alt: string;
  position?: string;
};

const HER = "[Tên nàng thơ]";
const ME = "[Tên bạn]";

export const issue = {
  masthead: "MUSE",
  herName: HER,
  yourName: ME,
  volume: "Vol. 01",
  city: "[Thành phố]",
  date: "20.10.2026",
  dateLong: "20 tháng Mười, 2026",
  price: "Vô giá",
};

export const cover = {
  kicker: "The October Issue",
  photo: {
    src: "",
    alt: "[Mô tả ảnh bìa]",
    position: "50% 50%",
  } satisfies Photo,
  summary: "[Một câu giới thiệu ngắn về người nhận]",
  photoCredit: `Ảnh: ${ME}`,
};

export const feature = {
  kicker: "Feature",
  title: "Tâm thư",
  headline: "[Tiêu đề bức thư]",
  deck: "[Lời mở đầu ngắn cho bức thư]",
  paragraphs: [
    "[Đoạn thư thứ nhất: lời chúc, lời cảm ơn, điều bạn muốn nói]",
    "[Đoạn thư thứ hai: một kỷ niệm hoặc điều bạn trân trọng ở người ấy]",
  ],
  pullQuote: "[Câu trích nổi bật lấy từ bức thư]",
  pullQuoteNote: "[Ghi chú dưới câu trích]",
};

export const lookbook = {
  kicker: "Lookbook",
  title: "Những khoảnh khắc",
  intro: "[Lời giới thiệu cho những khoảnh khắc được lưu giữ]",
  quote: "[Câu trích chen giữa các ảnh]",
  items: [
    {
      photo: { src: "", alt: "[Mô tả ảnh 1]", position: "50% 50%" },
      place: "[Địa điểm 1]",
      date: "",
      note: "[Ghi chú cho ảnh 1]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 2]", position: "50% 50%" },
      place: "[Địa điểm 2]",
      date: "",
      note: "[Ghi chú cho ảnh 2]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 3]", position: "50% 50%" },
      place: "[Địa điểm 3]",
      date: "",
      note: "[Ghi chú cho ảnh 3]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 4]", position: "50% 50%" },
      place: "[Địa điểm 4]",
      date: "",
      note: "[Ghi chú cho ảnh 4]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 5]", position: "50% 50%" },
      place: "[Địa điểm 5]",
      date: "",
      note: "[Ghi chú cho ảnh 5]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 6]", position: "50% 50%" },
      place: "[Địa điểm 6]",
      date: "",
      note: "[Ghi chú cho ảnh 6]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 7]", position: "50% 50%" },
      place: "[Địa điểm 7]",
      date: "",
      note: "[Ghi chú cho ảnh 7]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 8]", position: "50% 50%" },
      place: "[Địa điểm 8]",
      date: "",
      note: "[Ghi chú cho ảnh 8]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 9]", position: "50% 50%" },
      place: "[Địa điểm 9]",
      date: "",
      note: "[Ghi chú cho ảnh 9]",
    },
    {
      photo: { src: "", alt: "[Mô tả ảnh 10]", position: "50% 50%" },
      place: "[Địa điểm 10]",
      date: "",
      note: "[Ghi chú cho ảnh 10]",
    },
  ] satisfies { photo: Photo; place: string; date: string; note: string }[],
};

export const editorialNote = {
  kicker: "Editor’s Note",
  title: "Lời tái bút",
  body: [
    "Số tạp chí này không có quảng cáo, không có bài PR, cũng sẽ không có lần tái bản. Toàn bộ nội dung được biên tập bởi một người duy nhất, cho một độc giả duy nhất.",
    "Nếu có lỗi chính tả nào, mong em bỏ qua — tay anh hơi run vì hồi hộp.",
  ],
  ps: "[Dòng P.S., ví dụ một bất ngờ nhỏ]",
  signOff: "Yêu em,",
  signature: ME,
};

export const colophon = [
  { label: "Nàng thơ", value: HER },
  { label: "Biên tập & viết bài", value: ME },
  { label: "Nhiếp ảnh", value: `${ME} & chiếc điện thoại` },
  { label: "Số phát hành", value: "01 — chỉ một bản duy nhất" },
];


export const gate = {
  line: "Ấn bản đặc biệt · chỉ in duy nhất một bản",
  hint: "Chạm vào con dấu để mở",
};

export const anatomy = {
  kicker: "Portrait",
  title: "Giải phẫu một nàng thơ",
  intro: `Một nghiên cứu nghiêm túc về những chi tiết làm nên ${HER}. Chạm vào từng con số trên ảnh nhé.`,
  photo: {
    src: "",
    alt: "[Mô tả ảnh chân dung]",
  } satisfies Photo,
  ratio: "3 / 4",
  details: [
    {
      x: 30,
      y: 30,
      name: "[Chi tiết 1]",
      text: "[Mô tả chi tiết 1]",
    },
    {
      x: 70,
      y: 30,
      name: "[Chi tiết 2]",
      text: "[Mô tả chi tiết 2]",
    },
    {
      x: 50,
      y: 50,
      name: "[Chi tiết 3]",
      text: "[Mô tả chi tiết 3]",
    },
    {
      x: 30,
      y: 70,
      name: "[Chi tiết 4]",
      text: "[Mô tả chi tiết 4]",
    },
    {
      x: 70,
      y: 70,
      name: "[Chi tiết 5]",
      text: "[Mô tả chi tiết 5]",
    },
  ],
  file: [
    { label: "Họ tên", value: HER },
    { label: "Biệt danh", value: "[Biệt danh]" },
    { label: "Sinh nhật", value: "[dd/mm/yyyy]" },
    { label: "Màu sắc yêu thích", value: "[Màu sắc]" },
    { label: "Câu cửa miệng", value: "[Câu cửa miệng]" },
    { label: "Siêu năng lực", value: "[Siêu năng lực]" },
    { label: "Điểm yếu", value: "[Điểm yếu]" },
    { label: "Tình trạng", value: "[Tình trạng]" },
  ],
};

export const roles = {
  kicker: "Women’s Day",
  intro: "[Lời giới thiệu: hôm nay mọi trang đều nói về người nhận]",
  heading: "[Tiêu đề, ví dụ: Em là…]",
  items: [
    {
      tab: "[Vai 1]",
      phrase: "[Cụm từ cho vai 1]",
      note: "[Ghi chú cho vai 1]",
    },
    {
      tab: "[Vai 2]",
      phrase: "[Cụm từ cho vai 2]",
      note: "[Ghi chú cho vai 2]",
    },
    {
      tab: "[Vai 3]",
      phrase: "[Cụm từ cho vai 3]",
      note: "[Ghi chú cho vai 3]",
    },
    {
      tab: "[Vai 4]",
      phrase: "[Cụm từ cho vai 4]",
      note: "[Ghi chú cho vai 4]",
    },
    {
      tab: "[Vai 5]",
      phrase: "[Cụm từ cho vai 5]",
      note: "[Ghi chú cho vai 5]",
    },
  ],
};

export const quiz = {
  kicker: "Trắc nghiệm",
  title: "Em là nàng thơ kiểu nào?",
  intro:
    "Bài trắc nghiệm tâm lý cực kỳ khoa học, được kiểm chứng bởi anh. Chọn đáp án đầu tiên em nghĩ tới nhé.",
  questions: [
    {
      q: "Một sáng Chủ nhật lý tưởng của em là…",
      options: [
        "Cà phê, nhạc nhẹ và một cuốn sách",
        "Dậy sớm, ra ngoài đón nắng",
        "Đi chợ rồi nấu một bữa thật ngon",
        "Xách balo lên và đi đâu đó",
      ],
    },
    {
      q: "Khi anh lỡ quên một việc quan trọng, em sẽ…",
      options: [
        "Im lặng — đáng sợ nhất",
        "Cười xoà rồi nhắc nhẹ",
        "Giận đúng năm phút, rồi vẫn quan tâm như thường",
        "Đòi một chuyến đi chơi để bù",
      ],
    },
    {
      q: "Món quà khiến em vui nhất là…",
      options: [
        "Một lá thư viết tay",
        "Một bó hoa thật to",
        "Một bữa ăn ngon do người thương nấu",
        "Một chuyến đi bất ngờ",
      ],
    },
    {
      q: "Nếu chuyện tình mình là một bộ phim, nó sẽ là…",
      options: [
        "Phim tình cảm, có mưa và nhạc buồn",
        "Phim hài, mỗi ngày một tập",
        "Phim gia đình ấm áp, kết có hậu",
        "Phim phiêu lưu, không ai đoán được kết",
      ],
    },
  ],
  results: [
    {
      title: "Nàng thơ Mùa thu",
      text: "Dịu dàng, sâu lắng và hơi khó đoán — như một buổi chiều cuối thu. Ở cạnh em, mọi thứ chậm lại một nhịp, và anh thích nhịp ấy.",
    },
    {
      title: "Nàng thơ Ánh nắng",
      text: "Em đi tới đâu, chỗ đó sáng lên — kể cả những hôm tâm trạng anh xám xịt nhất.",
    },
    {
      title: "Nàng thơ Cà phê sữa",
      text: "Ngọt ngào, ấm áp, có chút đắng cho vừa đủ — và gây nghiện một cách đáng sợ.",
    },
    {
      title: "Nàng thơ Phiêu lưu",
      text: "Không bao giờ chán, luôn có kế hoạch mới. Anh chẳng cần biết mình đi đâu, miễn là đi cùng em.",
    },
  ],
  verdict:
    "Ghi chú của ban biên tập: bài trắc nghiệm này không có đáp án sai. Dù em là nàng thơ kiểu nào, em vẫn là kiểu anh yêu nhất.",
};

export const wishes = {
  kicker: "Wish List",
  title: "Ba điều ước của nàng",
  intro:
    "Hôm nay là ngày của em, nên em được ước. Lớn nhỏ gì cũng được — viết ra đây, ban biên tập cam kết sẽ cố gắng hết sức.",
  placeholders: [
    "Một điều em muốn mình cùng làm…",
    "Một điều nhỏ xíu cho riêng em…",
    "Một điều em ước cho năm tới…",
  ],
  sent: "Ban biên tập đã nhận được. Thời hạn thực hiện: sớm nhất có thể.",
  sendTo: "",
};

export const finale = {
  kicker: "Trang cuối",
  question: "Em có đồng ý làm nàng thơ của anh - cho tất cả những số tiếp theo không?",
  yes: "Em đồng ý",
  no: [
    "Để em nghĩ đã",
    "Chắc chưa?",
    "Nghĩ lại đi mà",
    "Nút này hỏng rồi",
    "Bấm nút bên kia đi",
    "Không bắt được đâu",
  ],
  answer: "Anh biết mà.",
  answerNote: "Hẹn em ở số tiếp theo — Vol. 02. Rồi số sau nữa. Rồi mãi mãi.",
};
