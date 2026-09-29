import type { GameData, Lesson, Question } from "./types";

/**
 * ============================================================
 *  DỮ LIỆU GAME — CHỈNH SỬA TẠI ĐÂY
 * ============================================================
 *
 * Đây là nguồn dữ liệu duy nhất của trò chơi. Giáo viên / biên tập
 * chỉ cần sửa mảng `gameData.lessons` bên dưới.
 *
 * THÊM BÀI HỌC:
 *   Copy một object { id, title, questions } rồi dán vào cuối mảng lessons.
 *   `id` phải là chuỗi không trùng (vd: "bai-5").
 *
 * THÊM CÂU HỎI / CỔ VẬT:
 *   Copy một object trong `questions` và chỉnh các trường:
 *     id        — số nguyên DUY NHẤT trên toàn bộ game (gắn ô Thư viện)
 *     q         — nội dung câu hỏi
 *     a         — đúng 4 đáp án, theo thứ tự A, B, C, D
 *     correct   — chỉ số đáp án đúng: 0 = A, 1 = B, 2 = C, 3 = D
 *     artifact  — tên cổ vật (có thể kèm emoji)
 *     exp       — giải thích lịch sử, hiện khi trả lời đúng (khoảng 2–3 câu)
 *
 * Đổi thời gian đếm ngược: sửa QUESTION_TIME_MS (đơn vị mili-giây).
 * ============================================================
 */

/** Thời gian đếm ngược mỗi câu hỏi (ms). */
export const QUESTION_TIME_MS = 45_000;

export const gameData: GameData = {
  lessons: [
    {
      id: "bai-1",
      title: "Bài 1: Một số vấn đề chung về cách mạng tư sản",
      questions: [
        {
          id: 1,
          q: "Lực lượng lãnh đạo Cách mạng tư sản Anh ở thế kỉ XVII là liên minh giữa:",
          a: [
            "A. Tư sản và Quần chúng nông dân",
            "B. Tư sản và Quý tộc mới",
            "C. Chủ nô và Tư sản",
            "D. Quý tộc phong kiến và Giáo sĩ",
          ],
          correct: 1,
          artifact: "⚔️ Thanh Gươm Quý Tộc Mới",
          exp: "Được khắc chữ biểu trưng cho sự liên minh giữa tư sản và quý tộc mới Anh, lật đổ phong kiến chuyên chế.",
        },
        {
          id: 2,
          q: "Lý do chính khiến người dân tại 13 thuộc địa Anh ở Bắc Mỹ nổi giận và 'tẩy chay' Anh từ năm 1770 là gì?",
          a: [
            "A. Chính quốc Anh cấm người dân Bắc Mỹ theo đạo Công giáo",
            "B. Hàng hóa từ chính quốc Anh có chất lượng quá kém",
            "C. Chính sách thuế má nặng nề và cấm đoán kinh tế độc quyền từ Anh",
            "D. Người dân Bắc Mỹ muốn mở rộng thương mại với Châu Á",
          ],
          correct: 2,
          artifact: "📦 Thùng Trà Boston",
          exp: "Biểu tượng phản kháng chính sách thuế vô lý của thực dân Anh, châm ngòi cho cuộc chiến giành độc lập.",
        },
        {
          id: 5,
          q: "Cách mạng Hà Lan thế kỉ XVI được xem là cuộc cách mạng tư sản sớm vì:",
          a: [
            "A. Lật đổ ách thống trị của Tây Ban Nha, xác lập nền cộng hòa tư sản",
            "B. Thành lập Đế quốc thuộc địa xuyên lục địa",
            "C. Phát minh ra máy hơi nước",
            "D. Ban hành luật ruộng đất xã hội chủ nghĩa",
          ],
          correct: 0,
          artifact: "🌷 Hoa Tulip Hà Lan",
          exp: "Cách mạng Hà Lan là cuộc cách mạng tư sản đầu tiên ở châu Âu, giành độc lập khỏi Tây Ban Nha và mở đường cho chủ nghĩa tư bản.",
        },
        {
          id: 6,
          q: "Hiến pháp Mỹ năm 1787 xác lập hình thức nhà nước nào?",
          a: [
            "A. Quân chủ chuyên chế",
            "B. Cộng hòa liên bang tư sản",
            "C. Nhà nước Xô viết",
            "D. Quân chủ lập hiến",
          ],
          correct: 1,
          artifact: "🦅 Đại Bàng Hiến Pháp 1787",
          exp: "Hiến pháp 1787 đặt nền cho thể chế cộng hòa liên bang, phân quyền lập pháp – hành pháp – tư pháp của Hợp chúng quốc.",
        },
      ],
    },
    {
      id: "bai-2",
      title: "Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản",
      questions: [
        {
          id: 3,
          q: "Đại diện tiêu biểu cho phong trào 'Triết học Ánh sáng' là những ai?",
          a: [
            "A. S. Mông-te-xki-ơ, Vôn-te, G. G. Rút-xô",
            "B. C. Mác, Ph. Ăng-ghen, V. I. Lê-nin",
            "C. Nê-đéc-lan, O. Crôm-oa, G. Oa-sinh-tơn",
            "D. Lu-i XVI, S. Mông-te-xki-ơ, Vôn-te",
          ],
          correct: 0,
          artifact: "📜 Sách Triết Học Ánh Sáng",
          exp: "Tập hợp tư tưởng của các triết gia Ánh sáng Pháp, đập tan hệ tư tưởng phong kiến lỗi thời.",
        },
        {
          id: 4,
          q: "Hai nhiệm vụ cơ bản của tất cả các cuộc cách mạng tư sản là gì?",
          a: [
            "A. Nhiệm vụ Kinh tế và Nhiệm vụ Xã hội",
            "B. Nhiệm vụ Dân tộc và Nhiệm vụ Dân chủ",
            "C. Nhiệm vụ Độc lập và Nhiệm vụ Hòa bình",
            "D. Nhiệm vụ Quân sự và Nhiệm vụ Tôn giáo",
          ],
          correct: 1,
          artifact: "🧭 La Bàn Định Hướng Dân Chủ",
          exp: "Khắc ghi hai hướng đi cốt lõi của mọi cuộc cách mạng tư sản: Giải phóng Dân tộc và Thiết lập Dân chủ.",
        },
        {
          id: 7,
          q: "Cuộc cách mạng công nghiệp bắt đầu từ nước nào vào giữa thế kỉ XVIII?",
          a: ["A. Pháp", "B. Đức", "C. Anh", "D. Mỹ"],
          correct: 2,
          artifact: "⚙️ Bánh Răng Công Nghiệp Anh",
          exp: "Cách mạng công nghiệp khởi phát ở Anh giữa thế kỉ XVIII, chuyển sản xuất thủ công sang đại công nghiệp cơ khí.",
        },
        {
          id: 8,
          q: "Đến cuối thế kỉ XIX, chủ nghĩa tư bản tự do cạnh tranh chuyển sang giai đoạn nào?",
          a: [
            "A. Chủ nghĩa xã hội",
            "B. Chủ nghĩa đế quốc (chủ nghĩa tư bản độc quyền)",
            "C. Chế độ phong kiến trở lại",
            "D. Nền kinh tế tự nhiên",
          ],
          correct: 1,
          artifact: "🏦 Con Dấu Độc Quyền Tư Bản",
          exp: "Giai đoạn độc quyền / đế quốc hình thành khi tư bản tập trung thành các tổ chức độc quyền, tranh giành thuộc địa.",
        },
      ],
    },
    {
      id: "bai-3",
      title: "Bài 3: Cách mạng tư sản Pháp cuối thế kỉ XVIII",
      questions: [
        {
          id: 9,
          q: "Ngày 14/7/1789, nhân dân Pa-ri đã làm gì?",
          a: [
            "A. Tuyên bố độc lập khỏi Anh",
            "B. Tấn công ngục Ba-xti",
            "C. Đưa Na-pô-lê-ông lên ngôi hoàng đế",
            "D. Thành lập Quốc tế Cộng sản",
          ],
          correct: 1,
          artifact: "🏰 Viên Gạch Ba-xti",
          exp: "Ngày 14/7/1789 nhân dân Pa-ri tấn công ngục Bastille — sự kiện mở đầu Cách mạng Pháp, nay là Quốc khánh Pháp.",
        },
        {
          id: 10,
          q: "Tuyên ngôn Nhân quyền và Dân quyền (1789) khẳng định điều cốt lõi nào?",
          a: [
            "A. Quyền thiêng liêng bất khả xâm phạm của nhà vua",
            "B. Đặc quyền của quý tộc và tăng lữ",
            "C. Quyền tự do, bình đẳng và sở hữu của con người",
            "D. Độc quyền thương mại của tư sản Pháp",
          ],
          correct: 2,
          artifact: "🗽 Tuyên Ngôn Nhân Quyền",
          exp: "Văn kiện nền tảng của cách mạng, tuyên bố con người sinh ra tự do, bình đẳng về quyền — ảnh hưởng sâu rộng toàn châu Âu.",
        },
        {
          id: 11,
          q: "Giai cấp lãnh đạo Cách mạng tư sản Pháp là:",
          a: [
            "A. Giai cấp tư sản",
            "B. Giai cấp vô sản công nghiệp",
            "C. Nông nô lệ thuộc",
            "D. Quý tộc cũ và tăng lữ",
          ],
          correct: 0,
          artifact: "⚜️ Huy Hiệu Đệ Tam Đẳng Cấp",
          exp: "Tư sản Pháp — lực lượng tiên tiến nhất của Đệ tam đẳng cấp — lãnh đạo quần chúng lật đổ chế độ quân chủ chuyên chế.",
        },
        {
          id: 12,
          q: "Ý nghĩa lịch sử nổi bật của Cách mạng Pháp 1789 là gì?",
          a: [
            "A. Chỉ lật đổ một ông vua, không đổi chế độ",
            "B. Cuộc cách mạng tư sản triệt để, ảnh hưởng sâu rộng châu Âu và thế giới",
            "C. Thiết lập chủ nghĩa xã hội khoa học",
            "D. Khôi phục chế độ phong kiến tập quyền",
          ],
          correct: 1,
          artifact: "⚖️ Cán Cân Công Lý 1789",
          exp: "Cách mạng Pháp được xem là cuộc cách mạng tư sản triệt để nhất thời kỳ này, lan tỏa tư tưởng tự do – bình đẳng khắp châu Âu.",
        },
      ],
    },
    // Người dùng có thể thêm bài học mới ngay dưới đây, theo đúng khuôn dạng trên.
  ],
};

export const allQuestions: Question[] = gameData.lessons.flatMap(
  (lesson) => lesson.questions,
);

export function getLesson(id: string): Lesson | undefined {
  return gameData.lessons.find((lesson) => lesson.id === id);
}

export function getQuestion(id: number): Question | undefined {
  return allQuestions.find((item) => item.id === id);
}

export function lessonProgress(lesson: Lesson, unlocked: ReadonlySet<number>) {
  const total = lesson.questions.length;
  const cleared = lesson.questions.filter((item) => unlocked.has(item.id)).length;
  return { total, cleared };
}

export function artifactGlyph(label: string): string {
  const match = label.match(
    /\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*/u,
  );
  return match?.[0] ?? "◆";
}

export function artifactName(label: string): string {
  return label.replace(
    /^\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*\s*/u,
    "",
  );
}
