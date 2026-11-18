# 자와 각도기의 방 — 시아·모아의 유클리드 공간

데이터 한 줄을 **방 안의 점 하나**로 놓고, "얼마나 먼가(거리)"와 "얼마나 닮았나(각도)"를 자와 각도기로 재는 연구실 해설입니다.
원자료 @eeanimation 인포그래픽 「EUCLIDEAN SPACE 01~10」의 차트를 다시 그려 직접 움직이는 실험 패널로 바꿨습니다.

- 공개 주소: https://adminmrobo.github.io/euclidean_space_lab/
- 글 · 안상선 ((주)M-Robo 대표) · [저자 소개](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- 다음 편: 힐베르트 공간 ([hilbert_space_lab](https://github.com/adminmrobo/hilbert_space_lab)) — ②편 끝맺음에서 미리 소개

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
