import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Timer, c as CircleHelp, d as BookOpen, f as ArrowLeft, l as ChevronRight, n as VolumeX, o as ScanLine, r as Volume2, s as Landmark, t as X, u as Check } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, c as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CREgxoun.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
var master = null;
var sfx = null;
var muted = false;
function graph() {
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfx = ctx.createGain();
		sfx.connect(master);
		master.connect(ctx.destination);
		master.gain.value = muted ? 0 : .72;
		sfx.gain.value = .9;
	}
	return {
		ctx,
		master,
		sfx
	};
}
function unlockAudio() {
	const { ctx: audio } = graph();
	if (audio.state === "suspended") audio.resume();
}
function resumeAudioIfNeeded() {
	if (!ctx) return;
	if (ctx.state === "suspended") ctx.resume();
}
function isMuted() {
	return muted;
}
function setMuted(next) {
	muted = next;
	if (!ctx || !master) return;
	master.gain.setTargetAtTime(next ? 0 : .72, ctx.currentTime, .03);
}
function tone(freq, duration, type, peak = .18, start = 0, freqEnd) {
	const { ctx: audio, sfx: bus } = graph();
	const t = audio.currentTime + start;
	const osc = audio.createOscillator();
	const gain = audio.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t);
	if (freqEnd != null) osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t + duration);
	gain.gain.setValueAtTime(1e-4, t);
	gain.gain.exponentialRampToValueAtTime(peak, t + .012);
	gain.gain.exponentialRampToValueAtTime(1e-4, t + duration);
	osc.connect(gain);
	gain.connect(bus);
	osc.start(t);
	osc.stop(t + duration + .02);
	osc.onended = () => {
		osc.disconnect();
		gain.disconnect();
	};
}
/** Crisp synth-ting — correct answer. */
function playTing() {
	unlockAudio();
	tone(880, .22, "sine", .2, 0, 1760);
	tone(1320, .28, "triangle", .08, .02, 1980);
	tone(1760, .18, "sine", .06, .05);
}
/** Low buzz — wrong answer. */
function playBuzz() {
	unlockAudio();
	tone(92, .22, "sawtooth", .14, 0, 56);
	tone(48, .28, "square", .06, .02, 36);
}
/** Soft click — open a vault. */
function playClick() {
	unlockAudio();
	tone(420, .07, "triangle", .08, 0, 280);
}
/** Artifact unlock arpeggio. */
function playUnlock() {
	unlockAudio();
	tone(523.25, .16, "sine", .12, 0);
	tone(659.25, .18, "sine", .12, .07);
	tone(783.99, .28, "sine", .14, .14, 1174);
}
/** Timeout warning. */
function playTimeout() {
	unlockAudio();
	tone(180, .18, "square", .1, 0, 90);
	tone(140, .22, "sawtooth", .08, .12, 70);
}
function attachAudioLifecycle() {
	if (typeof window === "undefined") return () => {};
	const onFirst = () => unlockAudio();
	window.addEventListener("pointerdown", onFirst, { once: true });
	window.addEventListener("keydown", onFirst, { once: true });
	const onVis = () => {
		if (document.visibilityState === "visible") resumeAudioIfNeeded();
	};
	document.addEventListener("visibilitychange", onVis);
	return () => {
		window.removeEventListener("pointerdown", onFirst);
		window.removeEventListener("keydown", onFirst);
		document.removeEventListener("visibilitychange", onVis);
	};
}
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
var QUESTION_TIME_MS = 45e3;
var gameData = { lessons: [
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
					"D. Quý tộc phong kiến và Giáo sĩ"
				],
				correct: 1,
				artifact: "⚔️ Thanh Gươm Quý Tộc Mới",
				exp: "Được khắc chữ biểu trưng cho sự liên minh giữa tư sản và quý tộc mới Anh, lật đổ phong kiến chuyên chế."
			},
			{
				id: 2,
				q: "Lý do chính khiến người dân tại 13 thuộc địa Anh ở Bắc Mỹ nổi giận và 'tẩy chay' Anh từ năm 1770 là gì?",
				a: [
					"A. Chính quốc Anh cấm người dân Bắc Mỹ theo đạo Công giáo",
					"B. Hàng hóa từ chính quốc Anh có chất lượng quá kém",
					"C. Chính sách thuế má nặng nề và cấm đoán kinh tế độc quyền từ Anh",
					"D. Người dân Bắc Mỹ muốn mở rộng thương mại với Châu Á"
				],
				correct: 2,
				artifact: "📦 Thùng Trà Boston",
				exp: "Biểu tượng phản kháng chính sách thuế vô lý của thực dân Anh, châm ngòi cho cuộc chiến giành độc lập."
			},
			{
				id: 5,
				q: "Cách mạng Hà Lan thế kỉ XVI được xem là cuộc cách mạng tư sản sớm vì:",
				a: [
					"A. Lật đổ ách thống trị của Tây Ban Nha, xác lập nền cộng hòa tư sản",
					"B. Thành lập Đế quốc thuộc địa xuyên lục địa",
					"C. Phát minh ra máy hơi nước",
					"D. Ban hành luật ruộng đất xã hội chủ nghĩa"
				],
				correct: 0,
				artifact: "🌷 Hoa Tulip Hà Lan",
				exp: "Cách mạng Hà Lan là cuộc cách mạng tư sản đầu tiên ở châu Âu, giành độc lập khỏi Tây Ban Nha và mở đường cho chủ nghĩa tư bản."
			},
			{
				id: 6,
				q: "Hiến pháp Mỹ năm 1787 xác lập hình thức nhà nước nào?",
				a: [
					"A. Quân chủ chuyên chế",
					"B. Cộng hòa liên bang tư sản",
					"C. Nhà nước Xô viết",
					"D. Quân chủ lập hiến"
				],
				correct: 1,
				artifact: "🦅 Đại Bàng Hiến Pháp 1787",
				exp: "Hiến pháp 1787 đặt nền cho thể chế cộng hòa liên bang, phân quyền lập pháp – hành pháp – tư pháp của Hợp chúng quốc."
			}
		]
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
					"D. Lu-i XVI, S. Mông-te-xki-ơ, Vôn-te"
				],
				correct: 0,
				artifact: "📜 Sách Triết Học Ánh Sáng",
				exp: "Tập hợp tư tưởng của các triết gia Ánh sáng Pháp, đập tan hệ tư tưởng phong kiến lỗi thời."
			},
			{
				id: 4,
				q: "Hai nhiệm vụ cơ bản của tất cả các cuộc cách mạng tư sản là gì?",
				a: [
					"A. Nhiệm vụ Kinh tế và Nhiệm vụ Xã hội",
					"B. Nhiệm vụ Dân tộc và Nhiệm vụ Dân chủ",
					"C. Nhiệm vụ Độc lập và Nhiệm vụ Hòa bình",
					"D. Nhiệm vụ Quân sự và Nhiệm vụ Tôn giáo"
				],
				correct: 1,
				artifact: "🧭 La Bàn Định Hướng Dân Chủ",
				exp: "Khắc ghi hai hướng đi cốt lõi của mọi cuộc cách mạng tư sản: Giải phóng Dân tộc và Thiết lập Dân chủ."
			},
			{
				id: 7,
				q: "Cuộc cách mạng công nghiệp bắt đầu từ nước nào vào giữa thế kỉ XVIII?",
				a: [
					"A. Pháp",
					"B. Đức",
					"C. Anh",
					"D. Mỹ"
				],
				correct: 2,
				artifact: "⚙️ Bánh Răng Công Nghiệp Anh",
				exp: "Cách mạng công nghiệp khởi phát ở Anh giữa thế kỉ XVIII, chuyển sản xuất thủ công sang đại công nghiệp cơ khí."
			},
			{
				id: 8,
				q: "Đến cuối thế kỉ XIX, chủ nghĩa tư bản tự do cạnh tranh chuyển sang giai đoạn nào?",
				a: [
					"A. Chủ nghĩa xã hội",
					"B. Chủ nghĩa đế quốc (chủ nghĩa tư bản độc quyền)",
					"C. Chế độ phong kiến trở lại",
					"D. Nền kinh tế tự nhiên"
				],
				correct: 1,
				artifact: "🏦 Con Dấu Độc Quyền Tư Bản",
				exp: "Giai đoạn độc quyền / đế quốc hình thành khi tư bản tập trung thành các tổ chức độc quyền, tranh giành thuộc địa."
			}
		]
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
					"D. Thành lập Quốc tế Cộng sản"
				],
				correct: 1,
				artifact: "🏰 Viên Gạch Ba-xti",
				exp: "Ngày 14/7/1789 nhân dân Pa-ri tấn công ngục Bastille — sự kiện mở đầu Cách mạng Pháp, nay là Quốc khánh Pháp."
			},
			{
				id: 10,
				q: "Tuyên ngôn Nhân quyền và Dân quyền (1789) khẳng định điều cốt lõi nào?",
				a: [
					"A. Quyền thiêng liêng bất khả xâm phạm của nhà vua",
					"B. Đặc quyền của quý tộc và tăng lữ",
					"C. Quyền tự do, bình đẳng và sở hữu của con người",
					"D. Độc quyền thương mại của tư sản Pháp"
				],
				correct: 2,
				artifact: "🗽 Tuyên Ngôn Nhân Quyền",
				exp: "Văn kiện nền tảng của cách mạng, tuyên bố con người sinh ra tự do, bình đẳng về quyền — ảnh hưởng sâu rộng toàn châu Âu."
			},
			{
				id: 11,
				q: "Giai cấp lãnh đạo Cách mạng tư sản Pháp là:",
				a: [
					"A. Giai cấp tư sản",
					"B. Giai cấp vô sản công nghiệp",
					"C. Nông nô lệ thuộc",
					"D. Quý tộc cũ và tăng lữ"
				],
				correct: 0,
				artifact: "⚜️ Huy Hiệu Đệ Tam Đẳng Cấp",
				exp: "Tư sản Pháp — lực lượng tiên tiến nhất của Đệ tam đẳng cấp — lãnh đạo quần chúng lật đổ chế độ quân chủ chuyên chế."
			},
			{
				id: 12,
				q: "Ý nghĩa lịch sử nổi bật của Cách mạng Pháp 1789 là gì?",
				a: [
					"A. Chỉ lật đổ một ông vua, không đổi chế độ",
					"B. Cuộc cách mạng tư sản triệt để, ảnh hưởng sâu rộng châu Âu và thế giới",
					"C. Thiết lập chủ nghĩa xã hội khoa học",
					"D. Khôi phục chế độ phong kiến tập quyền"
				],
				correct: 1,
				artifact: "⚖️ Cán Cân Công Lý 1789",
				exp: "Cách mạng Pháp được xem là cuộc cách mạng tư sản triệt để nhất thời kỳ này, lan tỏa tư tưởng tự do – bình đẳng khắp châu Âu."
			}
		]
	}
] };
var allQuestions = gameData.lessons.flatMap((lesson) => lesson.questions);
function getLesson(id) {
	return gameData.lessons.find((lesson) => lesson.id === id);
}
function getQuestion(id) {
	return allQuestions.find((item) => item.id === id);
}
function lessonProgress(lesson, unlocked) {
	return {
		total: lesson.questions.length,
		cleared: lesson.questions.filter((item) => unlocked.has(item.id)).length
	};
}
function artifactGlyph(label) {
	return label.match(/\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*/u)?.[0] ?? "◆";
}
function artifactName(label) {
	return label.replace(/^\p{Extended_Pictographic}\uFE0F?(?:\u200D\p{Extended_Pictographic}\uFE0F?)*\s*/u, "");
}
var SAVE_KEY = "mat-ma-lich-su";
var SAVE_VERSION = 1;
var emptySave = () => ({
	version: SAVE_VERSION,
	unlocked: []
});
function migrate(raw) {
	return {
		version: SAVE_VERSION,
		unlocked: Array.isArray(raw.unlocked) ? raw.unlocked.filter((id) => Number.isInteger(id)) : []
	};
}
function loadSave() {
	if (typeof window === "undefined") return emptySave();
	try {
		const raw = window.localStorage.getItem(SAVE_KEY);
		if (!raw) return emptySave();
		return migrate(JSON.parse(raw));
	} catch {
		return emptySave();
	}
}
function persistSave(save) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
	} catch {}
}
function saveOnLeave(getState) {
	if (typeof window === "undefined") return () => {};
	const flush = () => persistSave(getState());
	const onVis = () => {
		if (document.visibilityState === "hidden") flush();
	};
	window.addEventListener("pagehide", flush);
	document.addEventListener("visibilitychange", onVis);
	return () => {
		window.removeEventListener("pagehide", flush);
		document.removeEventListener("visibilitychange", onVis);
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[transform,background-color,box-shadow,color,opacity] duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-signal text-bg shadow-[0_0_24px_color-mix(in_oklab,var(--color-signal)_35%,transparent)] hover:bg-signal/90",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_55%,transparent)] hover:text-signal",
			relic: "bg-relic text-bg shadow-[0_0_20px_color-mix(in_oklab,var(--color-relic)_30%,transparent)] hover:bg-relic/90",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-raised",
			danger: "bg-transparent text-danger shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_45%,transparent)]"
		},
		size: {
			md: "h-11 min-h-11 px-4 text-sm",
			lg: "h-12 min-h-12 px-5 text-base",
			sm: "h-9 min-h-9 px-3 text-sm",
			icon: "size-11 min-h-11 min-w-11 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function ArtifactGallery({ unlocked, onBack }) {
	const total = allQuestions.length;
	const found = unlocked.size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "museum-content mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-8 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onBack,
						"aria-label": "Về màn hình chính",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.22em] text-signal uppercase",
							children: "Thư viện Cổ vật"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display truncate text-xl font-semibold tracking-wide sm:text-2xl",
							children: "Bộ sưu tập bảo vật"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular-nums text-sm text-muted",
						children: [
							found,
							"/",
							total
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "progress-seg mb-8 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${total ? found / total * 100 : 0}%` } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-10 pb-10",
				children: gameData.lessons.map((lesson) => {
					const { cleared, total: t } = lessonProgress(lesson, unlocked);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-fg sm:text-base",
							children: lesson.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-xs text-faint",
							children: [
								cleared,
								"/",
								t
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: lesson.questions.map((item) => {
							const isOpen = unlocked.has(item.id);
							const icon = artifactGlyph(item.artifact);
							const name = artifactName(item.artifact);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: cn("rounded-xl p-4 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow,opacity] duration-200", isOpen ? "bg-raised/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-relic)_40%,transparent)]" : "bg-panel/60 opacity-55"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("grid size-12 shrink-0 place-items-center rounded-lg text-2xl", isOpen ? "bg-relic/12" : "bg-raised text-faint"),
										"aria-hidden": true,
										children: isOpen && icon ? icon : isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-relic",
											children: "◆"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-fg",
											children: isOpen ? name : `Cổ vật #${item.id}`
										}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[13px] leading-relaxed text-muted",
											children: item.exp
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[13px] text-faint",
											children: "Chưa giải mã — hoàn thành mật mã tương ứng trên radar."
										})]
									})]
								})
							}, item.id);
						})
					})] }, lesson.id);
				})
			})
		]
	});
}
function vaultPosition(index, total) {
	const angle = index / Math.max(total, 1) * Math.PI * 2 - Math.PI / 2;
	const radius = 38;
	return {
		left: `${50 + Math.cos(angle) * radius}%`,
		top: `${50 + Math.sin(angle) * radius}%`
	};
}
function DigSite({ lesson, unlocked, muted, onToggleMute, onBack, onLessons, onGallery, onOpenVault }) {
	const { cleared, total } = lessonProgress(lesson, unlocked);
	const complete = total > 0 && cleared === total;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "museum-content flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 px-3 py-3 sm:px-6 sm:py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onBack,
						"aria-label": "Về màn hình chính",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.2em] text-signal uppercase",
							children: "Khu khai quật · Radar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-sm font-medium sm:text-base",
							children: lesson.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onToggleMute,
						"aria-label": muted ? "Bật âm thanh" : "Tắt âm thanh",
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onGallery,
						"aria-label": "Thư viện Cổ vật",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onLessons,
						"aria-label": "Chọn bài học",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-xl items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress-seg flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${total ? cleared / total * 100 : 0}%` } })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular-nums text-xs text-muted",
						children: [
							cleared,
							"/",
							total,
							" cổ vật"
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex flex-1 items-center justify-center px-3 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "radar-disc aspect-square w-[min(92vw,68vh,440px)]",
					role: "list",
					"aria-label": "Radar cổ vật của bài học",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "radar-sweep" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "radar-cross" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg tracking-wide text-signal/80",
									children: complete ? "Giải mã xong" : "Chọn hầm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase",
									children: "Dig Site"
								})]
							})
						}),
						lesson.questions.map((item, index) => {
							const isOpen = unlocked.has(item.id);
							const pos = vaultPosition(index, lesson.questions.length);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "listitem",
								style: pos,
								onClick: () => onOpenVault(item.id),
								className: cn("vault-node", isOpen ? "vault-open" : "vault-locked"),
								"aria-label": isOpen ? `Cổ vật đã mở: ${item.artifact}` : `Hầm mật mã ${index + 1}, chưa giải`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl leading-none",
									"aria-hidden": true,
									children: isOpen ? artifactGlyph(item.artifact) : "▣"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-[calc(100%+6px)] left-1/2 w-24 -translate-x-1/2 text-center font-mono text-[10px] tracking-wide text-muted",
									children: String(index + 1).padStart(2, "0")
								})]
							}, item.id);
						})
					]
				})
			})
		]
	});
}
function CornerMarks({ inset = 12 }) {
	const pos = { "--i": `${inset}px` };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0",
		"aria-hidden": true,
		style: pos,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "corner-bracket top-[var(--i)] left-[var(--i)] border-t border-l" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "corner-bracket top-[var(--i)] right-[var(--i)] border-t border-r" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "corner-bracket bottom-[var(--i)] left-[var(--i)] border-b border-l" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "corner-bracket bottom-[var(--i)] right-[var(--i)] border-b border-r" })
		]
	});
}
function HomeScreen({ unlocked, onStart, onGallery, onLessons }) {
	const total = allQuestions.length;
	const found = unlocked.size;
	const lessonsDone = gameData.lessons.filter((lesson) => {
		const { cleared, total: t } = lessonProgress(lesson, unlocked);
		return t > 0 && cleared === t;
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "museum-content relative mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 flex items-center justify-between gap-3 text-[11px] tracking-[0.22em] text-faint uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cục Bảo tàng Số" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Archive · Lịch sử 11"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-signal",
						children: [
							found,
							"/",
							total,
							" cổ vật"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "holo-panel relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl px-6 py-10 sm:px-12 sm:py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerMarks, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger-in relative z-10 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 font-mono text-[11px] tracking-[0.28em] text-signal uppercase",
							children: "Tech-Archaeology · Cyber Museum"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-[clamp(2rem,7vw,3.4rem)] leading-[1.12] font-semibold tracking-wide text-fg",
							children: "MẬT MÃ LỊCH SỬ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 mb-8 h-px w-24 bg-signal/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base",
							children: "Chào nhà khảo cổ tương lai! Hệ thống đã phân loại các mật mã cổ vật theo từng bài học trong Sách giáo khoa. Hãy chọn bài học bạn muốn ôn tập để bắt đầu giải mã và hoàn thiện bộ sưu tập bảo vật!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex w-full max-w-md flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "w-full",
									onClick: onStart,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
										className: "size-4",
										"aria-hidden": true
									}), "Bắt đầu giải mã"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									variant: "outline",
									className: "w-full",
									onClick: onGallery,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {
										className: "size-4",
										"aria-hidden": true
									}), "Thư viện Cổ vật"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									variant: "outline",
									className: "w-full",
									onClick: onLessons,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
										className: "size-4",
										"aria-hidden": true
									}), "Chọn Bài học"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-faint",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Mục lục: ",
					gameData.lessons.length,
					" bài · Hoàn thành ",
					lessonsDone,
					"/",
					gameData.lessons.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [
						"Bộ sưu tập ",
						found,
						"/",
						total
					]
				})]
			})
		]
	});
}
function LessonMenu({ open, onOpenChange, unlocked, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-bg/80 data-[state=open]:animate-in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "holo-panel fixed top-1/2 left-1/2 z-50 flex max-h-[min(88dvh,720px)] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl p-5 sm:p-7",
			"aria-describedby": void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerMarks, { inset: 10 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mb-5 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.22em] text-signal uppercase",
						children: "Mục lục Sách giáo khoa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display mt-1 text-xl font-semibold tracking-wide sm:text-2xl",
						children: "Chọn bài học"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Đóng",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "relative z-10 -mx-1 flex-1 space-y-3 overflow-y-auto px-1 py-1",
					children: gameData.lessons.map((lesson, index) => {
						const { cleared, total } = lessonProgress(lesson, unlocked);
						const done = total > 0 && cleared === total;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onSelect(lesson.id),
							className: cn("group flex w-full min-h-11 items-center gap-4 rounded-xl bg-raised/70 p-4 text-left shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow,transform,background-color] duration-150", "hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_50%,transparent)]"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-10 shrink-0 place-items-center rounded-lg font-mono text-sm", done ? "bg-relic/15 text-relic" : "bg-signal/10 text-signal"),
									children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : String(index + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm leading-snug font-medium text-fg sm:text-[0.95rem]",
										children: lesson.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 flex items-center gap-3 text-xs text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums",
											children: [
												"Số cổ vật: ",
												cleared,
												"/",
												total
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "progress-seg w-20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${total ? cleared / total * 100 : 0}%` } })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-signal" })
							]
						}) }, lesson.id);
					})
				})
			]
		})] })
	});
}
var CYAN = "#22d3ee";
var AMBER = "#f5b942";
function ParticleSplash({ burst }) {
	const canvasRef = (0, import_react.useRef)(null);
	const particlesRef = (0, import_react.useRef)([]);
	const rafRef = (0, import_react.useRef)(0);
	const lastRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!burst) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const w = window.innerWidth;
		const h = window.innerHeight;
		canvas.width = w * devicePixelRatio;
		canvas.height = h * devicePixelRatio;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		const cx = w / 2;
		const cy = h * .42;
		const next = [];
		for (let i = 0; i < 42; i++) {
			const angle = Math.PI * 2 * i / 42 + Math.random() * .2;
			const speed = 80 + Math.random() * 280;
			next.push({
				x: cx,
				y: cy,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				life: 0,
				max: .55 + Math.random() * .45,
				size: 1.5 + Math.random() * 3.5,
				color: i % 3 === 0 ? AMBER : CYAN
			});
		}
		particlesRef.current = next;
		lastRef.current = performance.now();
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const tick = (now) => {
			const dt = Math.min(.05, (now - lastRef.current) / 1e3);
			lastRef.current = now;
			ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const list = particlesRef.current;
			let alive = false;
			for (const p of list) {
				p.life += dt;
				if (p.life >= p.max) continue;
				alive = true;
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				p.vy += 40 * dt;
				const t = 1 - p.life / p.max;
				ctx.globalAlpha = t;
				ctx.fillStyle = p.color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size * (.6 + t * .4), 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
			if (alive) rafRef.current = requestAnimationFrame(tick);
		};
		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, [burst]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "pointer-events-none fixed inset-0 z-[60]",
		"aria-hidden": true
	});
}
function QuestionModal({ question, alreadyUnlocked, onClose, onSolved, onContinue, onBurst }) {
	const open = question != null;
	const [wrong, setWrong] = (0, import_react.useState)([]);
	const [solved, setSolved] = (0, import_react.useState)(false);
	const [timedOut, setTimedOut] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(0);
	const [remaining, setRemaining] = (0, import_react.useState)(QUESTION_TIME_MS);
	const [round, setRound] = (0, import_react.useState)(0);
	const remainingRef = (0, import_react.useRef)(QUESTION_TIME_MS);
	const lastRef = (0, import_react.useRef)(0);
	const rafRef = (0, import_react.useRef)(0);
	const pausedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!question) return;
		setWrong([]);
		setSolved(alreadyUnlocked);
		setTimedOut(false);
		setRemaining(QUESTION_TIME_MS);
		remainingRef.current = QUESTION_TIME_MS;
		setRound((n) => n + 1);
	}, [question?.id]);
	(0, import_react.useEffect)(() => {
		if (!open || solved || timedOut || alreadyUnlocked) return;
		pausedRef.current = false;
		lastRef.current = performance.now();
		const onVis = () => {
			if (document.visibilityState === "hidden") pausedRef.current = true;
			else {
				pausedRef.current = false;
				lastRef.current = performance.now();
			}
		};
		document.addEventListener("visibilitychange", onVis);
		const loop = (now) => {
			if (!pausedRef.current) {
				const dt = Math.min(.1, (now - lastRef.current) / 1e3);
				remainingRef.current = Math.max(0, remainingRef.current - dt * 1e3);
				setRemaining(remainingRef.current);
				if (remainingRef.current <= 0) {
					setTimedOut(true);
					playTimeout();
					document.removeEventListener("visibilitychange", onVis);
					return;
				}
			}
			lastRef.current = now;
			rafRef.current = requestAnimationFrame(loop);
		};
		rafRef.current = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(rafRef.current);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [
		open,
		solved,
		timedOut,
		alreadyUnlocked,
		round
	]);
	const retry = () => {
		setTimedOut(false);
		setWrong([]);
		remainingRef.current = QUESTION_TIME_MS;
		setRemaining(QUESTION_TIME_MS);
		setRound((n) => n + 1);
	};
	const pick = (index) => {
		if (!question || solved || timedOut) return;
		if (index === question.correct) {
			setSolved(true);
			playTing();
			playUnlock();
			onBurst();
			if (!alreadyUnlocked) onSolved(question.id);
			return;
		}
		if (!wrong.includes(index)) setWrong((w) => [...w, index]);
		setShake((n) => n + 1);
		playBuzz();
	};
	const secs = Math.ceil(remaining / 1e3);
	const low = remaining < 8e3;
	const ratio = remaining / QUESTION_TIME_MS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-bg/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("holo-panel fixed top-1/2 left-1/2 z-50 flex max-h-[min(92dvh,760px)] w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl p-5 sm:p-7", shake > 0 && !solved && "shake"),
			"aria-describedby": void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerMarks, { inset: 10 }), question && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] tracking-[0.22em] text-signal uppercase",
							children: ["Hologram mật mã · #", question.id]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "sr-only",
							children: ["Câu hỏi #", question.id]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Đóng",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						})]
					}),
					!alreadyUnlocked && !solved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: cn("size-4", low && "text-danger") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-seg flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									width: `${ratio * 100}%`,
									background: low ? "var(--color-danger)" : void 0
								} })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("w-10 text-right font-mono text-sm tabular-nums", low && "text-danger"),
								children: [secs, "s"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-5 text-[0.98rem] leading-relaxed font-medium text-fg sm:text-lg",
						children: question.q
					}),
					timedOut && !solved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-danger",
							children: "Hết giờ — tín hiệu mật mã đã nhiễu."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: retry,
							children: "Thử lại"
						})]
					}) : solved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-0 flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-raised/80 p-4 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-relic)_40%,transparent)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] tracking-[0.18em] text-relic uppercase",
									children: "Cổ vật đã giải mã"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-lg text-fg",
									children: question.artifact
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: question.exp
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							variant: "relic",
							onClick: onContinue,
							children: "Tiếp tục"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: question.a.map((label, index) => {
							const isWrong = wrong.includes(index);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: isWrong,
								onClick: () => pick(index),
								className: cn("w-full min-h-11 rounded-lg px-4 py-3 text-left text-sm leading-snug transition-[background-color,box-shadow,opacity] duration-150", isWrong ? "bg-danger/10 text-danger/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-danger)_40%,transparent)]" : "bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-signal)_55%,transparent)]"),
								children: label
							}) }, label);
						})
					})
				]
			})]
		}, shake)] })
	});
}
function MuseumApp() {
	const [screen, setScreen] = (0, import_react.useState)("home");
	const [lessonsOpen, setLessonsOpen] = (0, import_react.useState)(false);
	const [lessonId, setLessonId] = (0, import_react.useState)(null);
	const [questionId, setQuestionId] = (0, import_react.useState)(null);
	const [unlocked, setUnlocked] = (0, import_react.useState)([]);
	const [muted, setMuted$1] = (0, import_react.useState)(false);
	const [burst, setBurst] = (0, import_react.useState)(0);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [galleryFrom, setGalleryFrom] = (0, import_react.useState)("home");
	const unlockedSet = (0, import_react.useMemo)(() => new Set(unlocked), [unlocked]);
	const lesson = lessonId ? getLesson(lessonId) : void 0;
	const question = questionId != null ? getQuestion(questionId) ?? null : null;
	(0, import_react.useEffect)(() => {
		setUnlocked(loadSave().unlocked);
		setReady(true);
		return attachAudioLifecycle();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		return saveOnLeave(() => ({
			version: 1,
			unlocked
		}));
	}, [ready, unlocked]);
	const unlock = (id) => {
		setUnlocked((prev) => {
			if (prev.includes(id)) return prev;
			const next = [...prev, id];
			persistSave({
				version: 1,
				unlocked: next
			});
			return next;
		});
	};
	const openLessons = () => {
		unlockAudio();
		setLessonsOpen(true);
	};
	const selectLesson = (id) => {
		setLessonId(id);
		setLessonsOpen(false);
		setScreen("dig");
		playClick();
	};
	const openVault = (id) => {
		playClick();
		setQuestionId(id);
	};
	const toggleMute = () => {
		const next = !isMuted();
		setMuted(next);
		setMuted$1(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "museum-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" }),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "museum-content grid min-h-dvh place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.22em] text-signal uppercase",
					children: "Đang đồng bộ kho lưu trữ…"
				})
			}) : screen === "gallery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactGallery, {
				unlocked: unlockedSet,
				onBack: () => setScreen(galleryFrom)
			}) : screen === "dig" && lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigSite, {
				lesson,
				unlocked: unlockedSet,
				muted,
				onToggleMute: toggleMute,
				onBack: () => setScreen("home"),
				onLessons: openLessons,
				onGallery: () => {
					setGalleryFrom("dig");
					setScreen("gallery");
				},
				onOpenVault: openVault
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {
				unlocked: unlockedSet,
				onStart: openLessons,
				onGallery: () => {
					setGalleryFrom("home");
					setScreen("gallery");
				},
				onLessons: openLessons
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonMenu, {
				open: lessonsOpen,
				onOpenChange: setLessonsOpen,
				unlocked: unlockedSet,
				onSelect: selectLesson
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionModal, {
				question,
				alreadyUnlocked: questionId != null && unlockedSet.has(questionId),
				onClose: () => setQuestionId(null),
				onSolved: unlock,
				onContinue: () => setQuestionId(null),
				onBurst: () => setBurst((n) => n + 1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleSplash, { burst })
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuseumApp, {});
}
//#endregion
export { Home as component };
