# Tạp chí ngày Phụ nữ — template

Một trang "tạp chí" tặng riêng cho ngày 20/10. Toàn bộ nội dung nằm trong một file duy nhất, `app/content.ts`. Bạn chỉ cần thay chữ và ảnh, không cần sửa code.

Code không có comment. Mọi hướng dẫn nằm ở file này.

## 1. Chạy thử

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Mỗi lần lưu `app/content.ts`, trang tự cập nhật.

## 2. Điền nội dung

Mọi chỗ cần thay đều nằm trong ngoặc vuông `[...]`. Trước khi gửi cho người nhận, tìm ký tự `[` trong `app/content.ts` (Ctrl+F) để chắc chắn không còn chỗ nào bị sót.

Hai hằng số ở đầu file `HER` và `ME` là tên người nhận và tên bạn. Đổi chúng một lần là đủ cho cả trang.

Bảng dưới đây liệt kê từng mục trong `content.ts`:

| Mục | Hiển thị ở đâu | Cần điền |
| --- | --- | --- |
| `issue` | Đầu trang, tên tạp chí | `city` (thành phố); `masthead`, `volume`, `date` nếu muốn đổi |
| `cover` | Ảnh bìa và lời giới thiệu | `photo`, `summary` (một câu), `photoCredit` (dòng ghi ảnh) |
| `feature` | Bức thư "Tâm thư" | `headline`, `deck`, `paragraphs` (mỗi phần tử là một đoạn), `pullQuote`, `pullQuoteNote` |
| `lookbook` | Lưới 10 khoảnh khắc | `intro`, `quote` (câu trích chèn sau ảnh thứ 4), `items` |
| `editorialNote` | Lời tái bút | `body` (hai đoạn), `ps`, `signOff`, `signature` |
| `colophon` | Phần ghi thông tin số báo | Danh sách `label` và `value` |
| `gate` | Phong bì mở đầu | `line` (dòng chữ trên phong bì), `hint` (gợi ý khi chưa mở) |
| `anatomy` | "Giải phẫu một nàng thơ" | Ảnh chân dung, các điểm chạm, hồ sơ (xem mục 4) |
| `roles` | Trang "Em là…" với 5 vai trò | `heading`; với mỗi vai: `tab`, `phrase`, `note` |
| `quiz` | Trắc nghiệm | `title`, `intro`, `questions`, `results`, `verdict` (xem mục 5) |
| `wishes` | "Ba điều ước" | `title`, `intro`, `placeholders` (ba gợi ý), `sent`, `sendTo` |
| `finale` | Trang cuối | `question`, `yes`, `no`, `answer`, `answerNote` |

Bạn có thể thêm hoặc bớt phần tử trong các danh sách như `lookbook.items`, `anatomy.details`, `anatomy.file`, `roles.items`. Lưới lookbook tự sắp lại theo số ảnh.

## 3. Ảnh

1. Đặt ảnh vào thư mục `public/photos/`. Nên dùng đúng tên gợi ý hiện trên khung chỗ trống:
   - `cover.jpg` cho ảnh bìa
   - `lookbook-1.jpg` đến `lookbook-10.jpg` cho lưới ảnh
   - `anatomy.jpg` cho ảnh chân dung
2. Điền đường dẫn vào `src`, ví dụ `src: "/photos/cover.jpg"`.
3. Chưa có ảnh thì để `src: ""`. Trang sẽ hiện khung FPO đúng tỉ lệ, nên bạn vẫn xem được bố cục. Khi chưa có ảnh, nút xem toàn ảnh trong lookbook bị tắt.
4. Nếu ảnh bị cắt lệch, chỉnh `position` (ví dụ `"50% 30%"`) để chọn điểm lấy nét. Giá trị giống CSS `object-position`: `"50% 30%"` nghĩa là căn giữa theo chiều ngang, hơi lệch lên trên.

Lưới lookbook được sắp bố cục riêng cho 10 ảnh theo đúng thứ tự. Nếu bạn có nhiều hơn 10 ảnh, bố cục sẽ lặp lại.

Trường `date` trong mỗi khoảnh khắc của lookbook không bắt buộc. Để trống thì chú thích chỉ hiện địa điểm.

## 4. Mục "Giải phẫu"

Mục này là một ảnh chân dung có các điểm chạm. Mỗi điểm là một chi tiết với mô tả riêng.

1. **Đặt ảnh**: lưu ảnh vào `public/photos/anatomy.jpg`, rồi đặt `src: "/photos/anatomy.jpg"` trong `anatomy.photo`.
2. **Tỉ lệ khung**: đặt `ratio` bằng đúng tỉ lệ rộng / cao của ảnh. Ví dụ ảnh 1200 × 1600 px thì `ratio: "3 / 4"`. Nếu tỉ lệ sai, các điểm sẽ lệch khỏi chi tiết thật.
3. **Vị trí điểm chạm**: `x` là % từ mép trái, `y` là % từ mép trên của ảnh (từ 0 đến 100). Mở ảnh, chọn chi tiết, ước lượng % rồi điền. Sau đó chạy `npm run dev` để kiểm tra và chỉnh cho đến khi số nằm đúng chỗ. Các toạ độ mặc định hiện tại chỉ là vị trí tạm.
4. **Nội dung từng điểm**: điền `name` (tên ngắn, ví dụ "Đôi mắt") và `text` (một đến hai câu mô tả).
5. **Hồ sơ**: `anatomy.file` là danh sách `label` và `value`. Sửa `value` theo người nhận; có thể thêm hoặc bớt dòng.

Điểm chạm chỉ đúng với một ảnh cụ thể. Nếu đổi ảnh, hãy kiểm tra lại toạ độ và tỉ lệ.

## 5. Trắc nghiệm

- Mỗi câu hỏi có đúng 4 đáp án.
- Đáp án thứ nhất của mỗi câu tính cho kết quả thứ nhất, đáp án thứ hai cho kết quả thứ hai, và cứ thế.
- Vì vậy `results` cần có đúng 4 phần tử, đúng thứ tự với đáp án.
- Kết quả được chọn là kết quả có nhiều lượt nhất. Nếu hai kết quả bằng nhau, kết quả đứng trước trong danh sách sẽ được chọn.

## 6. Ba điều ước

Người nhận viết điều ước, và các ô nhập được lưu trong trình duyệt của họ để không mất khi tải lại trang.

Để nhận được điều ước, điền `sendTo` bằng link nhắn tin, ví dụ:

- `"https://m.me/ten-cua-ban"` cho Messenger
- `"https://zalo.me/09xxxxxxxx"` cho Zalo

Khi có link, sau khi gửi sẽ có nút mở link này. Khi để trống, trang chỉ hiện thông báo đã nhận.

## 7. Giọng văn

Nội dung có sẵn trong một số mục (trang "Em là…", trắc nghiệm, trang cuối) được viết theo giọng "anh viết cho em". Nếu muốn giọng khác, sửa các câu trong `content.ts`. Các nhãn cố định trên giao diện như tên mục "Em là…" nằm trong `app/_components/sections.ts`.

## 8. Kiểm tra trước khi gửi

1. Tìm ký tự `[` trong `app/content.ts` và đảm bảo không còn chỗ nào.
2. Chạy `npm run build` để chắc chắn dự án biên dịch được.
3. Mở trang trên điện thoại để kiểm tra bố cục.

## 9. Triển khai

Có thể đưa lên Vercel hoặc bất kỳ nền tảng nào hỗ trợ Next.js. Xem [tài liệu triển khai của Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## Dành cho nhà phát triển

Dự án dùng [Next.js](https://nextjs.org) với App Router. Các lệnh chính:

- `npm run dev`: chạy môi trường phát triển.
- `npm run build`: build production.
- `npm run lint`: kiểm tra code bằng ESLint.
