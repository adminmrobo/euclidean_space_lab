**[한국어](#ko) · [English](#en) · [中文](#zh) · [日本語](#ja) · [Oʻzbekcha](#uz) · [Русский](#ru) · [Tiếng Việt](#vi)**

## 다시 만들기와 번역
1. `python3 build/build.py` — 한국어 4쪽을 다시 만듭니다.
2. 언어팩(https://github.com/adminmrobo/ahnboat_lab_langpack)을 `langpack/`에 복사하고 `extract → pending → 번역 → check → merge` 순서로 돌립니다(설정은 `docs/langpack_config.json`).
3. `dist/`의 HTML과 README.md를 맨 위 폴더로 복사합니다. 실험 패널 스크립트는 번역되도록 페이지 안에 들어 있습니다(`assets/panels.js`가 원본).

---

<a id="ko"></a>

# 자와 각도기의 방 — 시아·모아의 유클리드 공간

데이터 한 줄을 **방 안의 점 하나**로 놓고, "얼마나 먼가(거리)"와 "얼마나 닮았나(각도)"를 자와 각도기로 재는 연구실 해설입니다.
원자료 @eeanimation 인포그래픽 「EUCLIDEAN SPACE 01~10」의 차트를 다시 그려 직접 움직이는 실험 패널로 바꿨습니다.

- 공개 주소: https://adminmrobo.github.io/euclidean_space_lab/
- 글 · 안상선 ((주)M-Robo 대표) · [저자 소개](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- 다음 편: 힐베르트 공간 ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — ②편 끝맺음에서 미리 소개

## 언어

이 시리즈는 한국어 원본과 외국어판 6개로 볼 수 있다.

- 고르는 방법: 화면 최상단 메뉴의 🌐 언어 선택 상자나 오른쪽 아래 🌐 배너에서 고른다. 고른 언어는 브라우저에 기억된다.
- 자동 전환: 한국어 페이지에 처음 들어오면, 브라우저 언어가 지원 언어일 때 그 언어판으로 옮겨 간다. 번역판 주소로 들어오면 그대로 연다.
- 주소 끝에 `?lang=en`처럼 붙이면 그 언어로 바로 연다.
- 언어판 파일은 `이름.언어코드.html` 꼴이다.

<!-- i18n:langtable -->
| 언어 | 파일 이름 | 바로 보기 |
|---|---|---|
| 한국어 | `index.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [바로 보기](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## 편 구성
| 파일 | 편 | 내용 |
|---|---|---|
| `index.html` | 목차 | 편 목록, 큰 그림(방 10개 사다리), 등장인물 |
| `00_orientation.html` | 0편 가방 점검 | 좌표평면·피타고라스·sin·cos 복습 실험 3개 + 퀴즈 3문항 (건너뛰기 가능) |
| `01_ruler_rooms.html` | ①편 자와 각도기의 방 | 1~5번 방: 점·이동·거리·겹침 점수·자 세트 |
| `02_shadow_rooms.html` | ②편 그림자와 칸막이의 방 | 6~10번 방: 그림자·칸막이·움직임·공·단위 맞추기 + 가장 가까운 이웃 찾기 대결 + 끝맺음(힐베르트 공간 소개) |

## 폴더
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

다시 만들기: `python3 build/build.py` · 검산: `python3 build/check_numbers.py`

## 원자료와 다르게 쓴 곳
1. 카드 07 — 축 이름 x와 점 이름 x가 겹쳐 축을 x₁·x₂·x₃으로 바꿈
2. 카드 09 — 머리 상자는 중심 c, 아래 식은 중심이 원점일 때 → "중심을 원점에 둔 경우"로 밝힘. 칸 수 껍질 비율 실험(0.9ⁿ)은 이 페이지에서 더함
3. 카드 06 — u의 글씨체를 한 가지로 맞춤
4. 카드 01 — affine structure를 "점과 이동(화살표)"으로 풀어 씀

숫자 계산 오류는 없었습니다.

## 남은 일
- 표지·장면 그림(지금은 CSS 대체 표지) — 요청 목록·프롬프트는 `docs/IMAGE_PROMPTS.md`
- 번역(언어팩 en·zh·ja·uz·ru·vi), ahnboat_lab_cover_status 명부 등록

캐릭터 이름·설정·그림은 저작권자 안상선의 허락 없이 사용할 수 없습니다.

---

<a id="en"></a>

# The Room of Rulers and Protractors — Sia and Moa's Euclidean Space

A lab explainer that places one row of data as **a single point in a room** and measures "how far apart (distance)" and "how alike (angle)" with a ruler and a protractor.
The charts from @eeanimation's infographics "EUCLIDEAN SPACE 01–10" were redrawn and turned into hands-on experiment panels.

- Live site: https://adminmrobo.github.io/euclidean_space_lab/index.en.html
- By Ahn Sangsun (CEO, M-Robo Inc.) · [About the author](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- Next part: Hilbert space ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — previewed at the end of Part ②

## Languages

This series is available in the Korean original and 6 translated editions.

- How to choose: use the 🌐 language selector in the top menu or the 🌐 banner at the bottom right. Your choice is remembered by the browser.
- Automatic switching: when you first visit a Korean page and your browser language is supported, you're taken to that language edition. If you open a translated edition's address, it opens as is.
- Add something like `?lang=en` to the end of the address to open that language directly.
- Language edition files follow the pattern `name.langcode.html`.

<!-- i18n:langtable -->
| Languages | File name | View |
|---|---|---|
| 한국어 | `index.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [View](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## Parts
| Files | Part | Content |
|---|---|---|
| `index.html` | Contents | Parts list, big picture (ladder of 10 rooms), cast |
| `00_orientation.html` | Part 0 Bag check | 3 review experiments on the coordinate plane, Pythagoras, sin, and cos + 3 quiz questions (skippable) |
| `01_ruler_rooms.html` | Part ① The Room of Rulers and Protractors | Rooms 1–5: points, moves, distance, overlap score, ruler set |
| `02_shadow_rooms.html` | Part ② The Room of Shadows and Dividers | Rooms 6–10: shadows, dividers, moves, balls, matching units + nearest-neighbor Showdown + ending (introducing Hilbert space) |

## Folder
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

Rebuild: `python3 build/build.py` · Check numbers: `python3 build/check_numbers.py`

## Where we differ from the source
1. Card 07 — the axis name x and the point name x overlapped, so the axes were renamed x₁, x₂, x₃
2. Card 09 — the header box uses center c, but the formula below assumes a center at the origin → stated as "the case with the center at the origin." The shell-share experiment by number of squares (0.9ⁿ) was added by this page
3. Card 06 — u is set in a single typeface
4. Card 01 — affine structure is explained as "points and moves (arrows)"

There were no calculation errors.

## Remaining work
- Cover and scene art (currently a CSS placeholder cover) — request list and prompts in `docs/IMAGE_PROMPTS.md`
- Translation (langpack en, zh, ja, uz, ru, vi), registration in the ahnboat_lab_cover_status list

Character names, settings, and artwork may not be used without permission from the copyright holder, Ahn Sangsun.

---

<a id="zh"></a>

# 尺子与量角器的房间 — 西娅·茉雅的欧几里得空间

把一行数据当作**房间里的一个点**，用尺子和量角器测量“有多远（距离）”和“有多像（角度）”的研究室讲解。
将原始资料 @eeanimation 信息图「EUCLIDEAN SPACE 01~10」中的图表重新绘制，改成可以亲手操作的实验面板。

- 公开地址：https://adminmrobo.github.io/euclidean_space_lab/index.zh.html
- 文 · Ahn Sangsun（M-Robo 公司 CEO） · [作者介绍](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- 下一篇：希尔伯特空间（[hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)） — 在第②篇结尾先行介绍

## 语言

本系列可阅读韩语原版和 6 种外语版。

- 选择方法：在页面最上方菜单的 🌐 语言选择框或右下角的 🌐 横幅中选择。所选语言会被浏览器记住。
- 自动切换：首次进入韩语页面时，如果浏览器语言是支持的语言，会转到该语言版。从译本地址进入则直接打开。
- 在地址末尾加上 `?lang=en` 这样的参数，即可直接以该语言打开。
- 语言版文件采用 `名称.语言代码.html` 的形式。

<!-- i18n:langtable -->
| 语言 | 文件名 | 直接查看 |
|---|---|---|
| 한국어 | `index.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [直接查看](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## 篇章构成
| 文件 | 篇 | 内容 |
|---|---|---|
| `index.html` | 目录 | 篇目、全景（10 个房间的阶梯）、登场人物 |
| `00_orientation.html` | 第 0 篇 检查背包 | 坐标平面·勾股定理·sin·cos 复习实验 3 个 + 测验 3 题（可跳过） |
| `01_ruler_rooms.html` | 第①篇 尺子与量角器的房间 | 1~5 号房间：点·移动·距离·重叠分数·尺子组 |
| `02_shadow_rooms.html` | 第②篇 影子与隔板的房间 | 6~10 号房间：影子·隔板·移动·球·统一单位 + 寻找最近邻对决 + 结尾（介绍希尔伯特空间） |

## 文件夹
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

重新生成：`python3 build/build.py` · 验算：`python3 build/check_numbers.py`

## 与原始资料写法不同之处
1. 卡片 07 — 轴名 x 与点名 x 重叠，将轴改为 x₁·x₂·x₃
2. 卡片 09 — 标题框用中心 c，下面的式子是中心为原点时的情况 → 明确注明“中心在原点的情况”。随格数变化的外壳比例实验（0.9ⁿ）为本页新增
3. 卡片 06 — 统一 u 的字体
4. 卡片 01 — 将 affine structure 解释为“点与移动（箭头）”

没有数字计算错误。

## 待办事项
- 封面·场景图（目前为 CSS 替代封面） — 需求列表·提示词见 `docs/IMAGE_PROMPTS.md`
- 翻译（语言包 en·zh·ja·uz·ru·vi），登记到 ahnboat_lab_cover_status 名册

角色名称·设定·图画未经著作权人 Ahn Sangsun 许可不得使用。

---

<a id="ja"></a>

# 定規と分度器の部屋 — シア・モアのユークリッド空間

データ1行を**部屋の中の点1つ**として置き、「どれだけ遠いか（距離）」と「どれだけ似ているか（角度）」を定規と分度器で測る研究室解説です。
原資料 @eeanimation のインフォグラフィック「EUCLIDEAN SPACE 01~10」のチャートを描き直し、自分で動かせる実験パネルに変えました。

- 公開アドレス：https://adminmrobo.github.io/euclidean_space_lab/index.ja.html
- 文 · Ahn Sangsun（株式会社M-Robo 代表）· [著者紹介](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- 次の編：ヒルベルト空間（[hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)）— 第②編の結びで先に紹介

## 言語

このシリーズは、韓国語の原本と外国語版6つで読めます。

- 選び方：画面最上部のメニューにある🌐言語選択ボックスか、右下の🌐バナーから選びます。選んだ言語はブラウザに記憶されます。
- 自動切り替え：韓国語ページに初めて入ると、ブラウザの言語が対応言語ならその言語版へ移動します。翻訳版のアドレスから入った場合はそのまま開きます。
- アドレスの末尾に `?lang=en` のように付けると、その言語ですぐ開きます。
- 言語版のファイルは `名前.言語コード.html` の形です。

<!-- i18n:langtable -->
| 言語 | ファイル名 | すぐに見る |
|---|---|---|
| 한국어 | `index.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [すぐに見る](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## 編の構成
| ファイル | 編 | 内容 |
|---|---|---|
| `index.html` | 目次 | 編の一覧、全体像（部屋10室のはしご）、登場人物 |
| `00_orientation.html` | 第0編 かばんの点検 | 座標平面・ピタゴラス・sin・cos の復習実験3つ + クイズ3問（飛ばしても可） |
| `01_ruler_rooms.html` | 第①編 定規と分度器の部屋 | 1〜5号室：点・移動・距離・重なりスコア・定規セット |
| `02_shadow_rooms.html` | 第②編 影と仕切りの部屋 | 6〜10号室：影・仕切り・動き・球・単位合わせ + 最近傍探索の対決 + 結び（ヒルベルト空間の紹介） |

## フォルダ
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

作り直し：`python3 build/build.py` · 検算：`python3 build/check_numbers.py`

## 原資料と違う書き方をした箇所
1. カード07 — 軸の名前 x と点の名前 x が重なるため、軸を x₁・x₂・x₃ に変更
2. カード09 — 見出しボックスは中心 c、下の式は中心が原点のとき → 「中心を原点に置いた場合」と明記。マスの数による殻の割合の実験（0.9ⁿ）はこのページで追加
3. カード06 — u の書体を1種類にそろえた
4. カード01 — affine structure を「点と移動（矢印）」と言い換えた

数字の計算ミスはありませんでした。

## 残りの作業
- 表紙・場面イラスト（今は CSS の代替表紙）— 依頼リスト・プロンプトは `docs/IMAGE_PROMPTS.md`
- 翻訳（言語パック en·zh·ja·uz·ru·vi）、ahnboat_lab_cover_status の名簿への登録

キャラクターの名前・設定・イラストは、著作権者 Ahn Sangsun の許可なく使用できません。

---

<a id="uz"></a>

# Chizgʻich va transportir xonasi — Sia va Moaning Yevklid fazosi

Maʼlumotlarning bir qatorini **xonadagi bitta nuqta** deb olib, "qanchalik uzoq (masofa)" va "qanchalik oʻxshash (burchak)"ni chizgʻich va transportir bilan oʻlchaydigan laboratoriya tushuntirishi.
Asl manba — @eeanimation infografikasi 「EUCLIDEAN SPACE 01~10」 dagi diagrammalar qayta chizilib, qoʻl bilan harakatlantiriladigan tajriba panellariga aylantirildi.

- Ochiq manzil: https://adminmrobo.github.io/euclidean_space_lab/index.uz.html
- Matn · Ahn Sangsun (M-Robo kompaniyasi rahbari) · [Muallif haqida](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- Keyingi qism: Hilbert fazosi ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — ②-qism yakunida oldindan tanishtiriladi

## Tillar

Bu turkumni koreyscha asl nusxada va 6 ta chet tilidagi versiyada oʻqish mumkin.

- Tanlash usuli: ekranning eng yuqorisidagi menyudagi 🌐 til tanlash qutisidan yoki oʻng pastki burchakdagi 🌐 bannerdan tanlang. Tanlangan til brauzerda eslab qolinadi.
- Avtomatik oʻtish: koreyscha sahifaga birinchi marta kirganingizda, brauzer tili qoʻllab-quvvatlanadigan tillardan biri boʻlsa, oʻsha tildagi versiyaga oʻtkaziladi. Tarjima versiyasi manziliga kirsangiz, u oʻzgarishsiz ochiladi.
- Manzil oxiriga `?lang=en` kabi qoʻshsangiz, sahifa darhol oʻsha tilda ochiladi.
- Til versiyalari fayllari `nom.tilkodi.html` koʻrinishida boʻladi.

<!-- i18n:langtable -->
| Tillar | Fayl nomi | Koʻrish |
|---|---|---|
| 한국어 | `index.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [Koʻrish](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## Qismlar tuzilishi
| Fayllar | Qism | Mazmun |
|---|---|---|
| `index.html` | Mundarija | Qismlar roʻyxati, umumiy manzara (10 ta xona zinapoyasi), qahramonlar |
| `00_orientation.html` | 0-qism Sumkani tekshirish | Koordinata tekisligi, Pifagor, sin, cos boʻyicha 3 ta takrorlash tajribasi + 3 ta savol (oʻtkazib yuborish mumkin) |
| `01_ruler_rooms.html` | ①-qism Chizgʻich va transportir xonasi | 1–5-xonalar: nuqta, siljish, masofa, moslik balli, chizgʻichlar toʻplami |
| `02_shadow_rooms.html` | ②-qism Soya va toʻsiq xonasi | 6–10-xonalar: soya, toʻsiq, harakat, shar, birliklarni moslashtirish + eng yaqin qoʻshnini topish bellashuvi + yakun (Hilbert fazosi bilan tanishuv) |

## Papkalar
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

Qayta yigʻish: `python3 build/build.py` · Tekshirish: `python3 build/check_numbers.py`

## Asl manbadan farqli yozilgan joylar
1. Karta 07 — oʻq nomi x va nuqta nomi x ustma-ust tushgani uchun oʻqlar x₁·x₂·x₃ ga almashtirildi
2. Karta 09 — sarlavha qutisida markaz c, quyidagi formula esa markaz koordinata boshida boʻlgan hol uchun → "markazi koordinata boshiga qoʻyilgan hol" deb aniq koʻrsatildi. Kataklar soniga qarab qobiq ulushi tajribasi (0.9ⁿ) bu sahifada qoʻshildi
3. Karta 06 — u ning shrifti bittaga keltirildi
4. Karta 01 — affine structure "nuqta va siljish (strelka)" deb ochib yozildi

Sonlarni hisoblashda xato topilmadi.

## Qolgan ishlar
- Muqova va sahna rasmlari (hozircha CSS bilan yasalgan oʻrinbosar muqova) — soʻrovlar roʻyxati va promptlar: `docs/IMAGE_PROMPTS.md`
- Tarjima (til paketi en·zh·ja·uz·ru·vi), ahnboat_lab_cover_status roʻyxatiga qoʻshish

Qahramonlarning ismlari, tavsifi va rasmlaridan mualliflik huquqi egasi Ahn Sangsun ruxsatisiz foydalanish mumkin emas.

---

<a id="ru"></a>

# Комната линейки и транспортира — евклидово пространство Сии и Моа

Лабораторный разбор, в котором строка данных представляется **одной точкой в комнате**, а «насколько далеко (расстояние)» и «насколько похоже (угол)» измеряются линейкой и транспортиром.
Графики из исходной инфографики @eeanimation «EUCLIDEAN SPACE 01~10» перерисованы и превращены в интерактивные экспериментальные панели.

- Публичный адрес: https://adminmrobo.github.io/euclidean_space_lab/index.ru.html
- Текст · Ahn Sangsun (генеральный директор M-Robo) · [Об авторе](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- Следующая часть: гильбертово пространство ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — предварительно представлено в финале части ②

## Язык

Эту серию можно читать в корейском оригинале и в 6 переводах.

- Как выбрать: в поле выбора языка 🌐 в верхнем меню или на баннере 🌐 в правом нижнем углу. Выбранный язык запоминается в браузере.
- Автопереключение: при первом входе на корейскую страницу, если язык браузера поддерживается, вы перейдёте на версию на этом языке. Если зайти по адресу перевода, он откроется как есть.
- Добавьте в конец адреса, например, `?lang=en`, и страница сразу откроется на этом языке.
- Файлы языковых версий имеют вид `имя.код_языка.html`.

<!-- i18n:langtable -->
| Язык | Имя файла | Открыть |
|---|---|---|
| 한국어 | `index.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [Открыть](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## Состав частей
| Файлы | Часть | Содержание |
|---|---|---|
| `index.html` | Оглавление | Список частей, общая картина (лестница из 10 комнат), персонажи |
| `00_orientation.html` | Часть 0 «Проверка рюкзака» | 3 эксперимента для повторения координатной плоскости, Пифагора, sin и cos + квиз из 3 вопросов (можно пропустить) |
| `01_ruler_rooms.html` | Часть ① «Комната линейки и транспортира» | Комнаты 1~5: точки, перемещения, расстояния, оценка совпадения, набор линеек |
| `02_shadow_rooms.html` | Часть ② «Комната теней и перегородок» | Комнаты 6~10: тени, перегородки, движения, шары, выравнивание единиц + Поединок по поиску ближайших соседей + финал (знакомство с гильбертовым пространством) |

## Папка
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

Пересборка: `python3 build/build.py` · проверка чисел: `python3 build/check_numbers.py`

## Отличия от исходного материала
1. Карточка 07 — название оси x совпадало с названием точки x, поэтому оси переименованы в x₁·x₂·x₃
2. Карточка 09 — в заголовке центр c, а формула ниже для центра в начале координат → явно указано как «случай с центром в начале координат». Эксперимент с долей оболочки в зависимости от числа клеток (0.9ⁿ) добавлен на этой странице
3. Карточка 06 — начертание u приведено к одному виду
4. Карточка 01 — affine structure пересказана как «точки и перемещения (стрелки)»

Ошибок в числовых расчётах не было.

## Что осталось
- Обложка и иллюстрации сцен (сейчас обложка-заменитель на CSS) — список запросов и промпты в `docs/IMAGE_PROMPTS.md`
- Перевод (языковой пакет en·zh·ja·uz·ru·vi), регистрация в реестре ahnboat_lab_cover_status

Имена, характеристики и изображения персонажей нельзя использовать без разрешения правообладателя Ahn Sangsun.

---

<a id="vi"></a>

# Căn phòng của thước kẻ và thước đo góc — Không gian Euclid của Sia và Moa

Bài giải thích phòng thí nghiệm đặt một dòng dữ liệu thành **một điểm trong phòng**, rồi dùng thước kẻ và thước đo góc để đo "xa bao nhiêu (khoảng cách)" và "giống bao nhiêu (góc)".
Vẽ lại các biểu đồ trong infographic gốc 「EUCLIDEAN SPACE 01~10」 của @eeanimation và chuyển thành các bảng thí nghiệm bạn tự tay điều khiển.

- Địa chỉ công khai: https://adminmrobo.github.io/euclidean_space_lab/index.vi.html
- Bài viết · Ahn Sangsun (Giám đốc điều hành M-Robo) · [Giới thiệu tác giả](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- Phần tiếp theo: không gian Hilbert ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — giới thiệu trước ở phần kết của Phần ②

## Ngôn ngữ

Loạt bài này có thể xem bằng bản gốc tiếng Hàn và 6 bản ngoại ngữ.

- Cách chọn: chọn trong hộp chọn ngôn ngữ 🌐 ở menu trên cùng màn hình hoặc biểu ngữ 🌐 ở góc dưới bên phải. Ngôn ngữ đã chọn được trình duyệt ghi nhớ.
- Tự động chuyển: khi vào trang tiếng Hàn lần đầu, nếu ngôn ngữ trình duyệt là ngôn ngữ được hỗ trợ thì sẽ chuyển sang bản ngôn ngữ đó. Nếu vào bằng địa chỉ của bản dịch thì mở nguyên như vậy.
- Thêm vào cuối địa chỉ dạng `?lang=en` để mở thẳng bằng ngôn ngữ đó.
- Tệp bản ngôn ngữ có dạng `tên.mãngônngữ.html`.

<!-- i18n:langtable -->
| Ngôn ngữ | Tên tệp | Xem ngay |
|---|---|---|
| 한국어 | `index.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.html) |
| English | `index.en.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.en.html) |
| 中文 | `index.zh.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.zh.html) |
| 日本語 | `index.ja.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.ja.html) |
| Oʻzbekcha | `index.uz.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.uz.html) |
| Русский | `index.ru.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.ru.html) |
| Tiếng Việt | `index.vi.html` | [Xem ngay](https://adminmrobo.github.io/euclidean_space_lab/index.vi.html) |
<!-- /i18n:langtable -->

## Cấu trúc các phần
| Tệp | Phần | Nội dung |
|---|---|---|
| `index.html` | Mục lục | Danh sách phần, bức tranh lớn (thang 10 căn phòng), nhân vật |
| `00_orientation.html` | Phần 0 Kiểm tra ba lô | 3 thí nghiệm ôn mặt phẳng tọa độ · Pythagoras · sin · cos + 3 câu đố (có thể bỏ qua) |
| `01_ruler_rooms.html` | Phần ① Căn phòng của thước kẻ và thước đo góc | Phòng 1~5: điểm · dịch chuyển · khoảng cách · điểm chồng khớp · bộ thước |
| `02_shadow_rooms.html` | Phần ② Căn phòng của bóng và vách ngăn | Phòng 6~10: bóng · vách ngăn · chuyển động · quả cầu · đồng bộ đơn vị + Đối đầu tìm láng giềng gần nhất + phần kết (giới thiệu không gian Hilbert) |

## Thư mục
```
assets/lab.css        낮의 연구실(흰 배경) 디자인
assets/panels.js      실험 패널 17개, 퀴즈, 지식 색인·꾸러미
assets/chars/         캐릭터 표정 160px WebP (fruitfly-lab-expressions @ 0442f69)
assets/og/            공유 미리보기 1200×630 (표지 그림이 들어오기 전 임시판)
build/                문구(content_rooms.py) → 페이지 빌드(build.py), 숫자 검산(check_numbers.py), og 이미지(make_og.py)
docs/                 공간 좌표 해설 제작 지침서, 기획안
```

Tạo lại: `python3 build/build.py` · Kiểm tra số: `python3 build/check_numbers.py`

## Chỗ viết khác tài liệu gốc
1. Thẻ 07 — tên trục x trùng với tên điểm x nên đổi trục thành x₁·x₂·x₃
2. Thẻ 09 — hộp tiêu đề dùng tâm c, công thức bên dưới là khi tâm ở gốc tọa độ → ghi rõ "trường hợp đặt tâm ở gốc tọa độ". Thí nghiệm tỉ lệ lớp vỏ theo số ô (0.9ⁿ) do trang này thêm vào
3. Thẻ 06 — thống nhất một kiểu chữ cho u
4. Thẻ 01 — diễn giải affine structure thành "điểm và dịch chuyển (mũi tên)"

Không có lỗi tính toán số nào.

## Việc còn lại
- Hình bìa · hình cảnh (hiện dùng bìa thay thế bằng CSS) — danh sách yêu cầu · prompt ở `docs/IMAGE_PROMPTS.md`
- Bản dịch (gói ngôn ngữ en·zh·ja·uz·ru·vi), đăng ký vào danh mục ahnboat_lab_cover_status

Không được sử dụng tên, thiết lập và hình vẽ nhân vật khi chưa có sự cho phép của chủ sở hữu bản quyền Ahn Sangsun.
