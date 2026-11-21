# 그림 요청 목록 — 자와 각도기의 방 (만드는 순서대로)

## 공통 규칙
- **화풍: 시리즈와 같은 16-bit RPG 픽셀풍.** 굵은 어두운 외곽선, 2~3단 명암, 작은 하이라이트. 애니메 일러스트풍으로 그리지 않는다.
- **참고 그림:** fruitfly-lab-expressions의 캐릭터 그림만 첨부한다. 장면마다 표정 E번호를 고른다(specs/README.md).
- **배경:** 밝은 낮의 연구실, 흰 벽. 강조색은 원자료 차트 색 — 틸 #0f8f84 · 주황 #e8731a · 남색 #1e2f6e.
- **글자 없음:** 그림 생성기는 한글을 잘 못 그리므로 제목·숫자·말풍선 글자는 넣지 않는다(HTML 글자로 얹는다).
- **저장:** 표지 1600×900, 장면 1200×800, WebP, 한 편 600KB 이하. 목차 썸네일·og:image는 표지에서 잘라 `assets/og/`에. 줄일 때는 픽셀이 뭉개지지 않게 "가장 가까운 이웃" 방식으로 줄인다.
- 목차 표지를 먼저 받아 그림체를 확인한 뒤, 그 그림을 참고 그림으로 함께 올려 나머지를 요청한다.

## 프롬프트 첫머리 (모든 그림 공통, 그대로 붙인다)
```
Match the art style, proportions and colors of the attached reference images exactly
(if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory mood, soft natural sunlight, clean white walls, teal, orange and navy accents.
```

## 캐릭터 묘사 줄 (필요한 인물만 붙인다)
- 시아: `calm girl intern, long straight jet-black hair, charcoal-black maid dress with large gray bow`
- 모아: `gentle girl intern, long ash-beige wavy hair, white frilled maid headband, camel cardigan`
- 박사: `chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie`
- 조수 하루: `girl researcher, long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie`
- 초파리 연구원: `anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings`
- 주판봇: `boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads`

## 프롬프트 끝머리 (모든 그림 공통)
```
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no logos, no school uniform, no weapons, no real brands.
```

| 순서 | 저장 이름 | 쓰는 곳 | 비율 |
|---|---|---|---|
| 1 | cover_index.webp | 목차 표지 | 16:9 |
| 2 | cover_00.webp | 0편 표지 (가방 점검) | 16:9 |
| 3 | cover_01.webp | ①편 표지 | 16:9 |
| 4 | cover_02.webp | ②편 표지 | 16:9 |
| 5~14 | room_01.webp ~ room_10.webp | 방 장면 10장 | 3:2 |
| 15 | duel.webp | 대결 (모아 승) | 3:2 |
| 16 | outro.webp | 끝맺음 — 복도 끝 문 | 3:2 |

## 1. 목차 표지 (16:9)
```
Website top cover illustration, wide 16:9.
[공통 첫머리]
Scene: a bright laboratory corridor with ten numbered doors, each door marked with a simple pixel geometry symbol (ruler, protractor, right-angle mark, circle, dashed drop line). Faint floating coordinate axes and a dotted grid in the air.
In front of the first door: [시아] holding a large transparent ruler, and [모아] holding a protractor and a notebook, both looking at the doors with curiosity.
Mood: the start of an adventure, calm and bright.
[공통 끝머리]
```

## 2. 0편 표지 — 가방 점검 (16:9)
```
Website top cover illustration, wide 16:9.
[공통 첫머리]
Scene: at the entrance of the lab corridor, [박사] opens two backpacks on a white table; out come a sheet of graph paper, a ruler, a protractor and a small arrow-shaped card.
[시아] smiling, [모아] looking curious.
[공통 끝머리]
```

## 3. ①편 표지 — 자와 각도기의 방 (16:9)
```
Website top cover illustration, wide 16:9.
[공통 첫머리]
Scene: a white lab room with a large floor grid; two glowing points joined by a teal straight line, with dashed right-triangle legs and a small orange angle arc.
[시아] points at the line, [모아] measures it with a ruler, [초파리 연구원] in the corner holding up a pixel arrow sign as if saying "try pressing this".
[공통 끝머리]
```

## 4. ②편 표지 — 그림자와 가름판의 방 (16:9)
```
Website top cover illustration, wide 16:9.
[공통 첫머리]
Scene: a white lab room; an orange arrow casts a sharp shadow straight down onto a translucent teal floor plane; a thin glass divider splits scattered blue dots into two groups.
[모아] looks proud, [시아] looks sheepish, [조수 하루] stands between them holding a small referee flag.
[공통 끝머리]
```

## 5~14. 방 장면 (3:2, 문 앞의 시아·모아)
각 장면 프롬프트: `Scene illustration 3:2. [공통 첫머리] Scene: in front of door N, ... [공통 끝머리]`

| 방 | 장면 (Scene 줄에 넣을 내용) | 시아 표정 | 모아 표정 |
|---|---|---|---|
| 1 | a number line, a coordinate plane and a 3D axis drawn on the door; small number cards turning into glowing dots | E01 기쁨 | E09 생각 |
| 2 | a green arrow path on the floor from a small house to an office building | E19 반짝눈 | E10 확인 |
| 3 | a corridor shaped like a 3-4-5 right triangle; [주판봇] taking the long way around the corner | E04 놀람 | E07 설명 |
| 4 | two arrows opening at 45 degrees on the door, a small gauge with a needle | E19 반짝눈 | E09 생각 |
| 5 | two perpendicular rulers turning around one fixed arrow | E15 당황 | E10 확인 |
| 6 | a stick at noon with its shadow straight below | E01 기쁨 | E16 뿌듯함 |
| 7 | a schoolyard with a center line, blue and white team dots on each side | E01 기쁨 | E09 생각 |
| 8 | a mirror room where a triangle is slid, turned and flipped | E04 놀람 | E07 설명 |
| 9 | a house at the center of a glowing circle, small store icons inside and outside | E19 반짝눈 | E09 생각 |
| 10 | a globe with an orange arc on its surface and a teal straight chord through it | E20 식은땀 | E09 생각 |

## 15. 대결 (3:2)
```
Scene illustration 3:2.
[공통 첫머리]
Scene: lab duel. [조수 하루] as referee raising a flag toward [모아] (proud); [시아] sheepish, holding a tape measure; [주판봇] cheering beside a small scoreboard with blank panels.
[공통 끝머리]
```

## 16. 끝맺음 (3:2)
```
Scene illustration 3:2.
[공통 첫머리]
Scene: the end of the bright lab corridor; a tall door slowly opening, behind it a smooth glowing orange curve instead of bars; [박사] pointing at it, [시아] and [모아] excited.
[공통 끝머리]
```
