# -*- coding: utf-8 -*-
"""자와 각도기의 방 — 페이지 빌드. python3 build/build.py 로 index.html, 00~02 페이지를 다시 만든다."""
import json, os, html, sys
sys.path.insert(0, os.path.dirname(__file__))
from content_rooms import ROOMS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = "v1.1"
DATE = "2026-11-19"
SITE = "https://adminmrobo.github.io/euclidean_space_lab/"
AUTHOR_URL = "https://adminmrobo.github.io/who_am_i/who_am_i.html"
BOWL = "https://adminmrobo.github.io/optimization_3d_map/"
HILBERT = "https://github.com/adminmrobo/hilbert_space_lab"
E = html.escape

CH = {  # key: (이름, 파일 접두, 역할 한 줄)
 "sia": ("시아", "sia", "인턴(No.005) · 직관파. 비유를 먼저 꺼낸다"),
 "moa": ("모아", "moa", "인턴(No.006) · 꼼꼼파. 조건과 예외를 묻는다"),
 "doctor": ("박사", "doctor", "방을 만든 사람. 방마다 \"머신러닝에서는\"을 정리한다"),
 "haru": ("조수 하루", "haru", "수식 상자 담당. 어려운 식을 대신 묻고 숫자로 풀어 본다. 대결 심판"),
 "fruitfly": ("초파리 연구원", "fruitfly", "의심 담당. \"이걸 눌러 봐\"로 실험 패널을 권한다"),
 "jupanbot": ("주판봇", "jupanbot", "성급한 확신으로 흔한 오해를 대표한다"),
}
def face(k, e="e13", cls=""):
    n, f, _ = CH[k]
    return f'<img src="assets/chars/{f}_{e}.webp" alt="{E(n)}" width="96" height="96" loading="lazy"{(" class=%s" % cls) if cls else ""}>'

CHANGES = {
 1: "원자료 결론의 affine structure(아핀 구조)는 이 페이지에서 \"점과 이동(화살표)\"으로 풀어 씁니다. 원어는 약어 상자에만 둡니다.",
 6: "원자료는 u를 굵은 글씨와 기울임 글씨로 섞어 씁니다. 이 페이지에서는 한 가지 글씨로 맞춥니다.",
 7: "원자료는 축 이름 x와 점 이름 x가 겹칩니다(x = p + tv와 x축). 이 페이지에서는 축을 x₁·x₂·x₃으로 바꾸고, 칸막이 식도 x₁ + 2x₂ + 2x₃ = 6으로 씁니다. 원자료의 \"Hyperplane in ℝ³\"는 3칸 방에서는 평면과 같은 것입니다.",
 9: "원자료의 머리 상자는 중심 c를 쓰지만 아래 식 x² + y² = r²은 중심이 원점일 때입니다. 이 페이지에서는 \"중심을 원점에 둔 경우\"라고 밝힙니다. 칸 수에 따른 껍질 비율 실험(0.9ⁿ)은 이 페이지에서 더한 것입니다.",
}

ABBR = [("ℝⁿ", "실수 n개짜리 줄 전체 — 자와 각도기가 있는 n칸짜리 방(유클리드 공간)"),
        ("내적", "겹침 점수 — 같은 자리끼리 곱해서 더한 값"),
        ("노름 ‖x‖", "화살표의 길이"),
        ("정규직교기저", "길이 1이고 서로 직각인 자 세트"),
        ("정사영", "그림자 — 점에서 선·평면으로 똑바로 내린 발밑"),
        ("초평면·법선", "칸막이(n칸 방에서 한 칸 적은 판) · 칸막이에 꽂힌 화살표"),
        ("등거리 변환", "밀고·돌리고·뒤집기 — 거리가 그대로인 움직임"),
        ("KNN", "가장 가까운 이웃 찾기"),
        ("MSE", "제곱 오차 — 빗나간 거리의 제곱 평균"),
        ("특성 스케일링", "단위 맞추기")]

def head(title, desc, og, path):
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta property="og:type" content="article"><meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(desc)}">
<meta property="og:image" content="{SITE}assets/og/{og}"><meta property="og:url" content="{SITE}{path}"><meta name="twitter:card" content="summary_large_image">
<meta name="author" content="안상선">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/lab.css">
</head>
<body>
<div id="prog"></div>
"""

def nav(links):
    a = "".join(f'<a href="{h}">{E(t)}</a>' for h, t in links)
    return f'<nav class="top"><div class="row"><a class="logo" href="index.html">자와 각도기의 <i>방</i></a><div class="links">{a}</div></div></nav>\n'

def cover(cap, cast, badge="표지 그림 준비 중"):
    imgs = "".join(face(k, e, "s" if i in (0, len(cast) - 1) and len(cast) > 3 else "") for i, (k, e) in enumerate(cast))
    grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="900" stroke="#dbe5ee"/>' for x in range(0, 1601, 80)) + \
           "".join(f'<line x1="0" y1="{y}" x2="1600" y2="{y}" stroke="#dbe5ee"/>' for y in range(0, 901, 80))
    deco = ('<line x1="160" y1="740" x2="1440" y2="740" stroke="#1e2f6e" stroke-width="4"/><line x1="160" y1="740" x2="160" y2="120" stroke="#1e2f6e" stroke-width="4"/>'
            '<line x1="400" y1="560" x2="1100" y2="240" stroke="#2458d6" stroke-width="6"/><line x1="400" y1="560" x2="1100" y2="560" stroke="#13733a" stroke-width="4" stroke-dasharray="14 10"/>'
            '<line x1="1100" y1="560" x2="1100" y2="240" stroke="#13733a" stroke-width="4" stroke-dasharray="14 10"/><path d="M1070 560 L1070 530 L1100 530" fill="none" stroke="#e8731a" stroke-width="4"/>'
            '<circle cx="400" cy="560" r="16" fill="#0f8f84"/><circle cx="1100" cy="240" r="16" fill="#e8731a"/><path d="M470 560 A70 70 0 0 0 464 528" fill="none" stroke="#e8731a" stroke-width="5"/>')
    return f"""<div class="cover"><div class="frame"><svg class="grid" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{grid}{deco}</svg>
<span class="cap">{E(cap)}</span><span class="badge">{E(badge)}</span><div class="cast">{imgs}</div></div></div>\n"""

def three(what, why, work):
    dl = "".join(f"<dt>{E(a)}</dt><dd>{E(b)}</dd>" for a, b in ABBR)
    return f"""<div class="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ul>
<li><b>무엇을</b>: {what}</li><li><b>왜 중요한가</b>: {why}</li><li><b>업무에서는</b>: {work}</li></ul>
<p>코드·수식을 몰라도 됩니다. 이 페이지는 실수(보통 숫자)만 다룹니다.</p>
<details class="abbr"><summary>원어·약어 풀이 (펼치기)</summary><dl>{dl}</dl></details></div>\n"""

def cast_section():
    items = "".join(f'<div class="who">{face(k, "e01" if k in ("sia","moa") else "e13")}<b>{E(CH[k][0])}</b><span>{E(CH[k][2])}</span></div>' for k in ["sia","moa","doctor","haru","fruitfly","jupanbot"])
    return f'<section id="cast"><div class="wrap"><h2>등장인물</h2><p class="muted">본문에서는 시아·모아를 이름으로 부릅니다. 방청객 X1~X3은 이번 편에서는 쉽니다.</p><div class="cast-grid">{items}</div></div></section>\n'

def ladder():
    cells = []
    for r in ROOMS:
        page = "01_ruler_rooms.html" if r["no"] <= 5 else "02_shadow_rooms.html"
        cells.append(f'<a href="{page}#{r["id"]}"><b>{r["no"]}번 방</b>{E(r["title"])}</a>')
    return '<div class="ladder">' + "".join(cells) + "</div>"

LADDER_TABLE = [
 (1, "데이터를 점으로 놓고 싶다", "데이터 한 행 = 점(특성 공간)"),
 (2, "점만으로는 \"어디로 얼마나\"를 못 말한다", "임베딩 차이, 변화량"),
 (3, "이동은 알아도 \"얼마나 먼가\"가 숫자 하나로 필요", "KNN, K-means, 제곱 오차"),
 (4, "거리만으로는 \"같은 쪽을 보나\"를 못 잰다", "코사인 유사도, 추천, 어텐션"),
 (5, "좌표 숫자는 어떤 자로 읽느냐에 따라 바뀐다", "원-핫 인코딩, PCA"),
 (6, "정답에 딱 못 맞출 때 가장 덜 틀린 답이 필요", "예측선 긋기, 평균"),
 (7, "바닥과 편을 가르는 판이 필요", "분류기의 결정 경계"),
 (8, "점을 옮겨도 관계가 그대로인가", "데이터 늘리기(사진 회전)"),
 (9, "이웃의 범위를 정하고 싶다 / 칸이 늘면 이상한 일", "반경 이웃, 칸이 많을 때의 함정(차원의 저주)"),
 (10, "단위가 섞이거나 표면이 휘면 곧은 자가 틀린다", "단위 맞추기, → 힐베르트 공간"),
]
def ladder_table():
    rows = "".join(f'<tr><td>{n}</td><td>{E(ROOMS[n-1]["title"])}</td><td>{E(a)}</td><td>{E(b)}</td></tr>' for n, a, b in LADDER_TABLE)
    return f'<div class="tbl"><table><thead><tr><th>방</th><th>쉬운 제목</th><th>앞 방의 한계 → 이 방이 필요한 이유</th><th>머신러닝에서는</th></tr></thead><tbody>{rows}</tbody></table></div>'

def talk(lines):
    out = []
    for i, (k, e, t) in enumerate(lines):
        side = " r" if k in ("moa",) else ""
        out.append(f'<div class="line{side}">{face(k, e)}<div class="bub"><b style="color:var(--c-{ {"doctor":"doc","haru":"asst","fruitfly":"fly","jupanbot":"robo","sia":"sia","moa":"moa"}[k] })">{E(CH[k][0])}</b>{E(t)}</div></div>')
    return '<div class="talk">' + "".join(out) + "</div>"

def panel(r):
    p = r["panel"]
    def one(key, note, ctrl, n):
        return (f'<div class="panel"><div class="ph"><b>실험 패널 {r["no"]}{n}</b><small>{E(note)}</small></div>'
                f'<div id="pp-{key}" data-panel="{key}"></div><div class="ctrl">{ctrl}</div><div class="readout" aria-live="polite"></div></div>')
    if p["kind"] == "double":
        return one(p["key"], p["note"], p["ctrl"], "-①") + one(p["key2"], p["note2"], p["ctrl2"], "-②")
    return one(p["key"], p["note"], p["ctrl"], "")

def quiz(q, ans, ok, no, opts):
    b = "".join(f'<button type="button">{E(o)}</button>' for o in opts)
    return f'<div class="quiz" data-ans="{ans}" data-ok="{E(ok)}" data-no="{E(no)}"><div class="qq">확인 퀴즈 — {E(q)}</div><div class="opts">{b}</div><div class="fb" aria-live="polite"></div></div>'

def room(r):
    why = "".join(f"<li>{E(x)}</li>" for x in r["why"])
    labels = ["문제", "앞 방의 한계", "해법"]
    why = "".join(f"<li><b>{labels[i]}</b> — {E(x)}</li>" for i, x in enumerate(r["why"]))
    pcs = "".join(f"<tr><td class='m'>{E(a)}</td><td>{E(b)}</td></tr>" for a, b in r["pieces"])
    tries = "".join(f"<div>{E(t)}</div>" for t in r["tries"])
    solve = "".join(f"<p>{E(s)}</p>" for s in r["solve"])
    code = ""
    if r["code"]:
        code = f'<details class="code"><summary>교안의 파이썬 코드로 보면 (몰라도 됩니다)</summary><pre><code>{E(r["code"][0])}</code></pre><p>{E(r["code"][1])}</p></details>'
    ch = ""
    if r["no"] in CHANGES:
        ch = f'<p class="hint">📝 원자료와 다르게 쓴 곳 — {E(CHANGES[r["no"]])}</p>'
    q = r["quiz"]
    return f"""<section class="room" id="{r['id']}"><div class="wrap">
<div class="roomno">{r['no']}번 방</div>
<h2>{E(r['title'])}</h2><p class="muted">{E(r['sub'])}</p>
<div class="tags"><span class="tag src">원자료 카드 {r['card']}/10 · @eeanimation</span><span class="tag how">{E(r['how'])}</span><span class="tag day">{E(r['day'])}</span></div>
<div class="duo">
<div class="box why"><h4>왜 이 방법을 쓰나</h4><ol>{why}</ol><div class="easy"><b>쉽게 말하면</b> — {E(r['easy'])}</div></div>
<div class="box mathbox"><h4>수학 수식을 어려워하는 조수가 대신 물어봅니다</h4>
<div class="q">{face('haru','e04')}<div><b>조수</b> {E(r['haru_q'])}</div></div>
<p><b>학교 수학으로 보면</b> — {E(r['school'])}</p>
<table><thead><tr><th>식 조각</th><th>뜻</th></tr></thead><tbody>{pcs}</tbody></table>
<div class="try"><b>숫자로 한 번 해 보기</b>{tries}</div>
<div class="q">{face('haru','e16')}<div><b>조수</b> {E(r['haru_c'])}</div></div></div>
</div>
<div class="pair"><div class="box"><h4>일상으로 치면</h4><p>{E(r['daily'])}</p></div><div class="box ml"><h4>머신러닝에서는</h4><p>{E(r['ml'])}</p></div></div>
{talk(r['talk'])}
{panel(r)}
<div class="solve"><h4>풀이</h4>{solve}</div>
{ch}
<div class="limit"><b>이 방의 한계</b> — {E(r['limit'])}</div>
{code}
{quiz(q[0], q[2], q[3], q[4], q[1])}
</div></section>
"""

# ---------------- 지식 색인
KG_NODES = [
 ("concept/euclidean-space", "Concept", "유클리드 공간(자와 각도기가 있는 방)", "Euclidean space ℝⁿ", "#r01", "숫자 n개 묶음을 점으로 보고 거리·각도를 재는 방", "01_ruler_rooms"),
 ("concept/point-vector", "Concept", "점과 화살표", "Point and vector", "#r02", "점은 자리, 화살표는 이동. B − A = 이동", "01_ruler_rooms"),
 ("concept/distance", "Concept", "두 점 사이 거리", "Euclidean distance", "#r03", "차를 제곱해 더하고 루트 — 몇 칸이든 피타고라스", "01_ruler_rooms"),
 ("concept/dot-product", "Concept", "겹침 점수(내적)와 각도", "Dot product and angle", "#r04", "같은 자리끼리 곱해 더한 값. cos θ로 방향의 닮음을 잰다", "01_ruler_rooms"),
 ("concept/orthonormal-basis", "Concept", "길이 1이고 서로 직각인 자 세트", "Orthonormal basis", "#r05", "좌표 = 그 자와의 겹침 점수. 자를 돌려도 길이는 그대로", "01_ruler_rooms"),
 ("concept/projection", "Concept", "그림자(정사영)", "Orthogonal projection", "#r06", "점에서 선으로 똑바로 내린 발밑이 가장 가까운 점", "02_shadow_rooms"),
 ("concept/hyperplane", "Concept", "선·평면·칸막이", "Lines, planes, hyperplanes", "#r07", "n칸 방의 칸막이는 n − 1칸. 꽂힌 화살표와의 점수로 편을 가른다", "02_shadow_rooms"),
 ("concept/isometry", "Concept", "밀고·돌리고·뒤집기", "Isometry", "#r08", "거리와 각도를 지키는 움직임. 늘리기는 거리를 바꾼다", "02_shadow_rooms"),
 ("concept/ball", "Concept", "원·구·공", "Circles, spheres, n-balls", "#r09", "중심에서 r 안쪽 = 이웃 범위", "02_shadow_rooms"),
 ("concept/curse-of-dimensionality", "Concept", "칸이 너무 많으면 모두 비슷하게 멀어진다", "Curse of dimensionality", "#r09", "n칸 공의 부피가 겉껍질에 몰린다(0.9ⁿ)", "02_shadow_rooms"),
 ("method/feature-scaling", "Method", "단위 맞추기", "Feature scaling", "#r10", "열마다 단위를 맞춰야 거리가 공정해진다", "02_shadow_rooms"),
 ("concept/arc-chord", "Concept", "호와 현", "Intrinsic vs Euclidean distance", "#r10", "휜 표면에서는 곧은 자가 실제 길보다 짧게 잰다", "02_shadow_rooms"),
 ("application/knn", "Application", "가장 가까운 이웃 찾기", "k-nearest neighbors", "#r03", "거리가 가장 짧은 데이터를 찾는다", "01_ruler_rooms"),
 ("application/cosine-similarity", "Application", "코사인 유사도·추천", "Cosine similarity", "#r04", "취향표의 방향이 닮은 정도", "01_ruler_rooms"),
 ("application/least-squares", "Application", "예측선 긋기(최소제곱)", "Least squares", "#r06", "정답의 그림자를 고른다", "02_shadow_rooms"),
 ("application/linear-classifier", "Application", "분류기의 결정 경계", "Linear classifier", "#r07", "칸막이로 스팸·정상을 가른다", "02_shadow_rooms"),
 ("analogy/shadow", "Analogy", "정오의 막대 그림자", "Noon shadow", "#r06", "그림자 = 가장 가까운 답", "02_shadow_rooms"),
 ("open/hilbert", "OpenQuestion", "칸 수가 끝없으면? 곡선이라면?", "Infinite dimensions → Hilbert space", "#outro", "다음 편 힐베르트 공간에서 다룬다", "02_shadow_rooms"),
]
KG_EDGES = [("concept/euclidean-space","motivates","concept/point-vector"),("concept/point-vector","motivates","concept/distance"),
 ("concept/distance","motivates","concept/dot-product"),("concept/dot-product","motivates","concept/orthonormal-basis"),
 ("concept/orthonormal-basis","motivates","concept/projection"),("concept/projection","motivates","concept/hyperplane"),
 ("concept/hyperplane","motivates","concept/isometry"),("concept/isometry","motivates","concept/ball"),
 ("concept/ball","motivates","method/feature-scaling"),("concept/ball","hasPart","concept/curse-of-dimensionality"),
 ("method/feature-scaling","motivates","open/hilbert"),("concept/arc-chord","motivates","open/hilbert"),
 ("concept/distance","usedIn","application/knn"),("concept/dot-product","usedIn","application/cosine-similarity"),
 ("concept/projection","usedIn","application/least-squares"),("concept/hyperplane","usedIn","application/linear-classifier"),
 ("analogy/shadow","explains","concept/projection"),("method/feature-scaling","usedIn","application/knn")]

def kg_block(page, pages):
    nodes = [dict(id="lab:" + i, type=t, label=dict(ko=ko, en=en), anchor=a, desc=d, page=p, source="lab:work/eeanimation_euclidean_space")
             for i, t, ko, en, a, d, p in KG_NODES if p in pages]
    ids = {n["id"] for n in nodes}
    edges = [dict(s="lab:" + s, p=p, o="lab:" + o) for s, p, o in KG_EDGES if "lab:" + s in ids and "lab:" + o in ids]
    raw = dict(version="1.3", page=page, series="자와 각도기의 방", nodes=nodes, edges=edges)
    ld = {"@context": {"@vocab": "urn:lab:", "skos": "http://www.w3.org/2004/02/skos/core#", "schema": "https://schema.org/"},
          "@graph": [{"@id": "urn:" + n["id"], "@type": n["type"], "skos:prefLabel": [{"@value": n["label"]["ko"], "@language": "ko"}, {"@value": n["label"]["en"], "@language": "en"}],
                      "skos:definition": n["desc"], "schema:url": SITE + n["page"] + ".html" + n["anchor"]} for n in nodes]}
    refs = [dict(id="eeanimation_euclidean_space", type="graphic", title="EUCLIDEAN SPACE 01–10 (infographic series)", author=[dict(literal="@eeanimation")],
                 accessed={"date-parts": [[2026, 11, 19]]}, note="사용자 제공 이미지. 차트를 SVG로 다시 그려 실험 패널로 바꿈")]
    meta = dict(title=page, series="자와 각도기의 방", creator=[dict(name="안상선", role="author", affiliation="(주)M-Robo")], date=DATE, version=VER, license="캐릭터·그림 무단 사용 금지")
    J = lambda o: json.dumps(o, ensure_ascii=False).replace("</", "<\\/")
    return f"""<section id="kg"><div class="wrap"><h2>지식 색인 — 이 페이지에서 찾아보기</h2>
<p class="muted">이 페이지에 나온 개념·방법·비유·쓰임을 모았습니다. 검색하고, "설명 보러 가기"로 본문에 돌아갑니다.</p><div id="kg-mount"></div></div></section>
<section id="export"><div class="wrap"><h2>온톨로지·서지 꾸러미 — 이 페이지의 지식을 가져가기</h2>
<p class="muted">지식 색인을 출처와 함께 파일로 내려받습니다. Zotero(BibTeX·RIS), Protégé(Turtle), Neo4j·Gephi(CSV), 여러 페이지 합치기(kg.json)에 씁니다.</p><div id="export-mount"></div></div></section>
<script type="application/json" id="kg-raw">{J(raw)}</script>
<script type="application/ld+json" id="kg-ld">{J(ld)}</script>
<script type="application/json" id="refs-csl">{J(refs)}</script>
<script type="application/json" id="page-meta">{J(meta)}</script>
"""

def footer(extra_links):
    links = " · ".join(f'<a href="{h}">{E(t)}</a>' for h, t in extra_links)
    return f"""<footer><div class="wrap">
<h3>출처</h3>
<div class="tbl"><table><thead><tr><th>#</th><th>자료</th><th>이 페이지에서 쓴 곳</th></tr></thead><tbody>
<tr><td>[1]</td><td>@eeanimation, 인포그래픽 「EUCLIDEAN SPACE 01~10」 (사용자 제공 이미지, 2026-11-19 확인)</td><td>방 1~10의 원자료 카드. 구도·색·기호·축 이름을 살려 SVG로 다시 그리고 손으로 움직이게 바꿈. 이미지는 붙여 넣지 않음</td></tr>
<tr><td>[2]</td><td>안상선, 「공간 좌표 해설 제작 지침서」 v1.0 (docs/SPACE_COORDINATE_GUIDE.md)</td><td>용어 대조표, 공간 사다리, 방 짜임</td></tr>
</tbody></table></div>
<h3>예시값·설명용 숫자</h3>
<p>시아·모아의 키·몸무게·허리, 취향표, 키 세 번 잰 값, 편의점 위치, 고객 가~바와 새 고객의 키·몸무게는 설명을 위해 만든 예시값입니다.</p>
<p>캐릭터 이름·설정·그림은 저작권자 안상선의 허락 없이 사용할 수 없습니다. 캐릭터 그림: fruitfly-lab-expressions.</p>
<p>글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p>
<p>{links}</p>
</div></footer>
<script src="assets/panels.js"></script>
</body></html>
"""

FOOT_LINKS = [("index.html", "목차"), ("00_orientation.html", "0편 가방 점검"), ("01_ruler_rooms.html", "①편 자와 각도기의 방"), ("02_shadow_rooms.html", "②편 그림자와 칸막이의 방"), ("https://github.com/adminmrobo/euclidean_space_lab", "저장소")]

# ======================================================== index
def build_index():
    t = "자와 각도기의 방 — 시아·모아의 유클리드 공간"
    d = "데이터 한 줄을 방 안의 점 하나로 놓고 거리와 각도를 재는 법. 원자료 @eeanimation 인포그래픽 10장을 방 탈출형 연구실 해설로 다시 만들었습니다."
    s = head(t, d, "og_index.jpg", "index.html")
    s += nav([("#parts", "편 목록"), ("#map", "큰 그림"), ("#cast", "등장인물"), ("#source", "원자료")])
    s += cover("연구실 복도 · 번호 붙은 방 10개", [("doctor","e08"),("sia","e19"),("moa","e09"),("haru","e01")])
    s += f"""<header class="hero"><div class="wrap"><span class="kicker">공간 좌표 해설 · 유클리드 공간</span>
<h1>자와 각도기의 방<br><span style="font-size:.55em;color:var(--muted)">시아·모아의 유클리드 공간</span></h1>
<p class="lead">데이터 한 줄을 <b>방 안의 점 하나</b>로 놓으면, "얼마나 먼가"와 "얼마나 닮았나"를 자와 각도기로 잴 수 있습니다. 비슷한 것 찾기·예측선 긋기·분류선 긋기가 모두 이 방에서 돌아갑니다.</p>
<p class="byline">글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p></div></header>
<section><div class="wrap">{three("키·몸무게 같은 숫자 묶음을 점으로 찍고, 점 사이 거리와 각도를 재는 법을 배웁니다.", "추천(\"비슷한 사람이 본 상품\"), 예측선 긋기, 스팸 분류가 모두 거리와 각도 계산입니다.", "비슷한 고객 찾기, 이상한 값 골라내기, 단위가 다른 열을 맞추는 일에 바로 쓰입니다.")}</div></section>
<section id="parts"><div class="wrap"><h2>편 목록</h2>
<p class="muted">박사가 연구실 복도에 방 10개를 만들었습니다. 문마다 원자료 카드 한 장이 붙어 있고, 실험 패널로 답을 맞혀야 다음 문이 열립니다.</p>
<div class="cards">
<a class="card" href="00_orientation.html">{face("doctor","e08")}<span class="n">0편 · 오리엔테이션</span><h3>가방 점검</h3><p>좌표평면·피타고라스·sin·cos를 3장으로 짧게 복습합니다. 건너뛰어도 됩니다.</p></a>
<a class="card" href="01_ruler_rooms.html">{face("sia","e01")}<span class="n">①편 · 1~5번 방</span><h3>자와 각도기의 방</h3><p>점·이동·거리·겹침 점수·자 세트. 데이터를 점으로 놓고 재는 법.</p></a>
<a class="card" href="02_shadow_rooms.html">{face("moa","e16")}<span class="n">②편 · 6~10번 방 + 대결</span><h3>그림자와 칸막이의 방</h3><p>그림자·칸막이·움직임·공·단위 맞추기. 가장 가까운 이웃 찾기 대결.</p></a>
<div class="card soon">{face("haru","e09")}<span class="n">다음 편 · 곧 열립니다</span><h3>끝없는 방 — 힐베르트 공간</h3><p>칸 수가 끝없으면? 곡선이라면? ②편 끝맺음에서 미리 소개합니다.</p></div>
</div></div></section>
<section id="map"><div class="wrap"><h2>큰 그림 — 앞 방의 한계가 다음 방의 이유</h2>{ladder()}<div style="height:16px"></div>{ladder_table()}</div></section>
{cast_section()}
<section id="source"><div class="wrap"><h2>원자료와 이 해설</h2>
<p>원자료는 @eeanimation의 인포그래픽 「EUCLIDEAN SPACE 01~10」 10장입니다. 차트의 구도·색·기호를 살려 다시 그리고, 직접 움직이는 실험 패널로 바꿨습니다.</p>
<p>숫자는 모두 검산했습니다. 계산 오류는 없었고, 기호가 겹치거나 빠진 곳 네 군데만 고쳐 썼습니다(각 방의 📝 표시).</p>
<p>좌표축 위의 그릇 시리즈를 먼저 보면 좋습니다: <a href="{BOWL}">좌표축 위의 그릇 — 3D 지도로 본 모델 최적화</a></p></div></section>
"""
    s += footer(FOOT_LINKS)
    open(os.path.join(ROOT, "index.html"), "w").write(s)

# ======================================================== 0편
def build_orient():
    t = "자와 각도기의 방 0편 — 가방 점검 (오리엔테이션)"
    d = "방에 들어가기 전 좌표평면·피타고라스·sin·cos를 실험 3개로 짧게 복습합니다. 건너뛰어도 됩니다."
    s = head(t, d, "og_00.jpg", "00_orientation.html")
    s += nav([("#bag1", "점 찍기"), ("#bag2", "피타고라스"), ("#bag3", "sin·cos"), ("#check", "확인"), ("01_ruler_rooms.html", "①편으로")])
    s += cover("복도 입구 · 가방 점검", [("sia","e13"),("doctor","e08"),("moa","e09")])
    s += f"""<header class="hero"><div class="wrap"><span class="kicker">0편 · 오리엔테이션</span><h1>가방 점검</h1>
<p class="lead">복도에 들어가기 전, 박사가 시아·모아의 가방을 엽니다. 꺼낸 물건은 세 개 — 모두 학교에서 배운 것입니다.</p>
<p>좌표축 위의 그릇 시리즈를 먼저 보고 오시면 좋습니다. 처음이라면 이 쪽만 읽어도 따라올 수 있습니다.</p>
<a class="skip" href="01_ruler_rooms.html#r01">건너뛰고 바로 1번 방으로 →</a>
<p class="byline" style="margin-top:12px">글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p></div></header>
<section><div class="wrap">{talk([("doctor","e08","들어가기 전에 가방부터 보자. 자, 각도기, 그리고 모눈종이."),("sia","e01","다 학교에서 쓰던 거네요!"),("moa","e09","그걸로 인공지능을 설명할 수 있어요?"),("doctor","e16","충분하다. 하나씩 꺼내 보자.")])}</div></section>
"""
    bags = [
     ("bag1", "가방 속 ① 모눈종이 — 좌표평면", ["가로 숫자 하나, 세로 숫자 하나로 점 하나의 자리가 정해집니다.", "숫자 두 개 = 점 하나. 숫자가 셋이면 공간좌표의 점입니다.", "데이터 한 줄도 이렇게 점 하나가 됩니다."],
      "o1", "모눈 아무 곳이나 눌러 점을 찍어 보세요", "", f'<a href="{BOWL}1_math_map.html">좌표축 위의 그릇 ①편 — 3D 오차 지도의 좌표축</a>'),
     ("bag2", "가방 속 ② 자 — 피타고라스 정리", ["직각삼각형에서 빗변² = 가로² + 세로²입니다.", "가로 3, 세로 4면 빗변은 5입니다.", "3번 방의 \"두 점 사이 거리\"가 바로 이 식입니다."],
      "o2", "파란 꼭짓점을 끌어 보세요", "", "학교 수학 복습(중학교 피타고라스 정리)"),
     ("bag3", "가방 속 ③ 각도기 — sin·cos", ["반지름 1인 원 위의 점은 (cos θ, sin θ)입니다.", "cos θ는 가로로 얼마나 갔나, sin θ는 세로로 얼마나 갔나입니다.", "4번 방의 각도, 10번 방의 호와 현에 씁니다."],
      "o3", "각도를 바꿔 보세요", '<label>θ <input type="range" min="0" max="360" step="15" value="45" aria-label="각도"></label>', '<a href="01_ruler_rooms.html#r04">①편 4번 방 — 겹침 점수와 각도</a>(학교 수학 복습: 삼각함수)'),
    ]
    for bid, title, lines, key, note, ctrl, link in bags:
        li = "".join(f"<li>{E(x)}</li>" for x in lines)
        s += f"""<section class="room" id="{bid}"><div class="wrap"><h2>{E(title)}</h2>
<div class="box"><h4>요약 3줄</h4><ol>{li}</ol></div>
<div class="panel"><div class="ph"><b>실험</b><small>{E(note)}</small></div><div id="pp-{key}" data-panel="{key}"></div><div class="ctrl">{ctrl}</div><div class="readout" aria-live="polite"></div></div>
<p class="muted">더 보기: {link}</p></div></section>
"""
    qs = [("점 (3, 4)와 원점 사이 거리는?", ["7", "5", "12"], 1, "√(9 + 16) = 5입니다.", "피타고라스: √(3² + 4²)."),
          ("θ = 90°일 때 원 위의 점 (cos θ, sin θ)는?", ["(1, 0)", "(0, 1)", "(1, 1)"], 1, "90°면 가로 0, 세로 1입니다.", "실험 ③에서 θ를 90°로 놓아 보세요."),
          ("키·몸무게·나이 세 숫자로 된 기록 한 줄은?", ["공간좌표의 점 하나", "좌표평면의 점 세 개", "수직선의 점 하나"], 0, "숫자 셋 = 공간좌표의 점 하나입니다.", "숫자 묶음 하나가 점 하나입니다.")]
    qh = "".join(quiz(*q[:1], q[2], q[3], q[4], q[1]) for q in qs)
    s += f"""<section id="check"><div class="wrap"><h2>가방 확인 퀴즈 3문항</h2>{qh}
<p id="gate" class="readout">세 문제를 모두 맞히면 1번 방 문이 열립니다.</p>
<div class="next"><span></span><a href="01_ruler_rooms.html#r01">①편 1번 방으로 →</a></div></div></section>
<script>(function(){{var g=document.getElementById('gate');function c(){{var n=document.querySelectorAll('#check .quiz button.ok').length;g.innerHTML=n===3?'<span class="alert">🔓 1번 방 문이 열립니다!</span> <a href="01_ruler_rooms.html#r01">들어가기 →</a>':'맞힌 문제 '+n+' / 3';}}document.querySelectorAll('#check .quiz button').forEach(function(b){{b.addEventListener('click',function(){{setTimeout(c,0);}});}});}})();</script>
"""
    s += footer(FOOT_LINKS)
    open(os.path.join(ROOT, "00_orientation.html"), "w").write(s)

# ======================================================== ①편
def build_part(no):
    rooms = [r for r in ROOMS if (r["no"] <= 5) == (no == 1)]
    if no == 1:
        fn, og, t = "01_ruler_rooms.html", "og_01.jpg", "자와 각도기의 방 ①편 — 점·이동·거리·겹침 점수·자 세트"
        d = "1~5번 방: 데이터 한 줄을 점으로 찍고, 화살표로 이동을 말하고, 피타고라스로 거리를, 겹침 점수로 각도를 잽니다."
        cast = [("sia","e19"),("doctor","e07"),("moa","e09"),("fruitfly","e09")]
        hero = ("①편 · 1~5번 방", "자와 각도기의 방", "숫자 줄 하나를 점으로 찍는 데서 시작해, 거리와 각도를 재고, 자 세트를 바꿔 보는 데까지 갑니다.")
        three_ = three("숫자 묶음을 점으로 찍고, 화살표로 이동을 말하고, 거리와 각도를 잽니다.", "비슷한 고객 찾기(거리)와 취향이 닮은 사람 찾기(각도)가 여기서 나옵니다.", "고객·제품 데이터 한 줄을 점으로 보면 \"가장 비슷한 것\"을 숫자로 고를 수 있습니다.")
        intro = talk([("doctor","e08","복도에 방이 열 개 있다. 오늘은 앞의 다섯 개다."),("sia","e01","자와 각도기만 있으면 된다면서요? 쉬워 보여요!"),("moa","e09","방마다 실험을 맞혀야 문이 열린다고 들었어요."),("jupanbot","e16","저는 다 맞힐 자신이 있습니다!")])
    else:
        fn, og, t = "02_shadow_rooms.html", "og_02.jpg", "자와 각도기의 방 ②편 — 그림자·칸막이·움직임·공·단위 맞추기"
        d = "6~10번 방과 대결: 그림자로 가장 가까운 답을 고르고, 칸막이로 편을 가르고, 단위를 맞춰 이웃을 찾습니다. 끝맺음에서 힐베르트 공간을 소개합니다."
        cast = [("moa","e16"),("doctor","e10"),("sia","e14"),("haru","e07")]
        hero = ("②편 · 6~10번 방 + 대결", "그림자와 칸막이의 방", "가장 가까운 답(그림자), 편 가르기(칸막이), 이웃 범위(공), 단위 맞추기까지. 마지막에 가장 가까운 이웃 찾기 대결이 있습니다.")
        three_ = three("그림자로 가장 덜 틀린 답을 고르고, 칸막이로 편을 가르고, 단위를 맞춰 이웃을 찾습니다.", "예측선 긋기, 스팸 분류, 추천 전 단위 맞추기가 모두 이 방들의 규칙입니다.", "\"모델이 낼 수 있는 답 중 정답에 가장 가까운 것\"과 \"공정한 거리\"를 고르는 법을 압니다.")
        intro = talk([("doctor","e07","①편에서 자와 각도기를 손에 익혔다. 이제 그걸로 답을 고른다."),("moa","e09","그림자로 답을 고른다는 게 무슨 뜻이에요?"),("sia","e19","6번 방에 가 보면 알겠죠!")])
    s = head(t, d, og, fn)
    navl = [(f"#{r['id']}", f"{r['no']}번 방") for r in rooms]
    if no == 2: navl += [("#duel", "대결"), ("#outro", "끝맺음")]
    s += nav(navl)
    s += cover(f"연구실 복도 · {hero[0]}", cast)
    s += f"""<header class="hero"><div class="wrap"><span class="kicker">{E(hero[0])}</span><h1>{E(hero[1])}</h1><p class="lead">{E(hero[2])}</p>
<p class="byline">글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p></div></header>
<section><div class="wrap">{three_}</div></section>
<section><div class="wrap">{intro}</div></section>
"""
    if no == 1:
        s += cast_section()
        s += f'<section id="map"><div class="wrap"><h2>큰 그림</h2><p class="muted">앞 방의 한계가 다음 방의 이유가 됩니다. 이 편은 1~5번 방입니다.</p>{ladder()}</div></section>'
        s += f'<section><div class="wrap"><p class="muted">아직 준비가 안 됐다면 <a href="00_orientation.html">0편 가방 점검</a>을 먼저 보세요(3분).</p></div></section>'
    for r in rooms:
        s += room(r)
    if no == 1:
        s += f"""<section id="sum"><div class="wrap"><h2>①편 정리</h2>
<div class="tbl"><table><thead><tr><th>방</th><th>도구</th><th>한 줄</th><th>머신러닝에서는</th></tr></thead><tbody>
<tr><td>1</td><td>점</td><td>숫자 줄 하나 = 점 하나</td><td>데이터 한 행</td></tr>
<tr><td>2</td><td>화살표</td><td>B − A = 이동</td><td>임베딩 차이</td></tr>
<tr><td>3</td><td>자(거리)</td><td>차의 제곱을 더하고 루트</td><td>KNN, 제곱 오차</td></tr>
<tr><td>4</td><td>각도기(겹침 점수)</td><td>같은 쪽이면 크고 직각이면 0</td><td>코사인 유사도, 추천</td></tr>
<tr><td>5</td><td>자 세트</td><td>자를 돌려도 길이는 그대로</td><td>원-핫, PCA</td></tr></tbody></table></div>
{talk([("haru","e16","여기까지 숫자 계산은 전부 검산 완료입니다!"),("sia","e01","다음 방은 그림자래요. 빨리 가요!")])}
<div class="next"><a href="00_orientation.html">← 0편 가방 점검</a><a href="02_shadow_rooms.html#r06">②편 6번 방으로 →</a></div></div></section>
"""
        s += kg_block("01_ruler_rooms", ["01_ruler_rooms"])
    else:
        s += duel_section() + summary2() + outro_section()
        s += kg_block("02_shadow_rooms", ["02_shadow_rooms"])
    s += footer(FOOT_LINKS)
    open(os.path.join(ROOT, fn), "w").write(s)

def duel_section():
    return f"""<section class="room" id="duel"><div class="wrap"><div class="roomno">대결</div><h2>가장 가까운 이웃 찾기 대결</h2>
<p class="muted">심판: 조수 하루 · 같은 고객 데이터에서 새 고객과 가장 닮은 사람을 누가 맞히나</p>
{talk([("haru","e07","이번엔 10번 방과 다른 손님입니다. 새 고객은 158cm, 49kg! 후보는 고객 라·마·바 세 명입니다. 옷 치수가 같을 사람을 맞혀 주세요."),
       ("sia","e19","측정 장비가 키를 mm로 줬으니 그대로 재면 되죠! 빠른 게 최고!"),
       ("moa","e09","저는 키는 5cm를, 몸무게는 5kg을 한 칸으로 맞춘 다음 잴게요."),
       ("jupanbot","e16","어차피 같은 사람들이니 답도 같겠죠!"),
       ("fruitfly","e09","정말? 두 사람 답을 차례로 열어 봐.")])}
<div class="panel"><div class="ph"><b>대결 패널</b><small>버튼을 차례로 누르세요 · 예시 데이터</small></div>
<div id="pp-duel" data-panel="duel"></div>
<div class="ctrl"><button type="button" data-duel="sia">시아의 답 열기</button><button type="button" data-duel="moa">모아의 답 열기</button><button type="button" data-duel="ans">정답 공개</button></div>
<div class="readout" aria-live="polite"></div></div>
<div class="solve"><h4>심판 판정</h4>
<p>시아 방식은 키 차이를 mm로 재서 30·10·50처럼 크게 잡습니다. 몸무게 차이 2·6·1kg은 거의 묻힙니다. 그래서 키만 가까운 고객 마를 골랐습니다.</p>
<p>모아 방식의 "5cm·5kg"은 이 고객들의 키와 몸무게가 보통 그만큼씩 퍼져 있다는 뜻입니다(예시값). 퍼진 만큼을 한 칸으로 삼으니 두 열이 공평해졌습니다. 고객 라와 거리 0.72로 가장 가깝습니다.</p>
<p>실무에서는 이 "퍼진 정도"를 데이터에서 직접 계산합니다. 10번 방 코드 상자의 표준화가 바로 그 일입니다.</p>
<p>10번 방의 교훈 그대로입니다. 단위를 맞추지 않으면 숫자가 큰 열이 거리를 독차지합니다.</p></div>
{talk([("haru","e10","판정! 이번 대결은 모아의 승리입니다."),("moa","e16","단위만 맞췄을 뿐인데요."),("sia","e14","빠른 게 최고는 아니었네요… 다음엔 단위부터 볼게요.")])}
</div></section>
"""

def summary2():
    return f"""<section id="sum"><div class="wrap"><h2>②편 정리</h2>
<div class="tbl"><table><thead><tr><th>방</th><th>도구</th><th>한 줄</th><th>머신러닝에서는</th></tr></thead><tbody>
<tr><td>6</td><td>그림자</td><td>똑바로 내린 발밑이 가장 가까운 답</td><td>예측선 긋기, 평균</td></tr>
<tr><td>7</td><td>칸막이</td><td>꽂힌 화살표와의 점수로 편 가르기</td><td>분류기의 결정 경계</td></tr>
<tr><td>8</td><td>밀기·돌리기·뒤집기</td><td>거리를 지키는 움직임</td><td>데이터 늘리기</td></tr>
<tr><td>9</td><td>공</td><td>반지름 안쪽 = 이웃 / 칸이 많으면 겉껍질에 몰림</td><td>반경 이웃, 칸이 많을 때의 함정(차원의 저주)</td></tr>
<tr><td>10</td><td>단위 맞추기 · 호와 현</td><td>곧은 자가 공정하려면 단위를 맞춘다</td><td>표준화</td></tr></tbody></table></div></div></section>
"""

def outro_section():
    return f"""<section class="room" id="outro"><div class="wrap"><div class="roomno">끝맺음 · 다음 편 예고</div><h2>복도 끝의 끝없는 방</h2>
<p class="muted">다음 편은 힐베르트 공간입니다. 여기서는 가르치지 않고, 무엇인지와 왜 필요한지만 소개합니다.</p>
<h3>① 오늘 방의 정리</h3>
<p>자(거리)로 얼마나 먼지, 각도기(겹침 점수)로 얼마나 닮았는지, 그림자로 가장 가까운 답이 어디인지 쟀습니다.</p>
<h3>② 이 방이 못 하는 것</h3>
<p>칸 수가 정해져 있어야 합니다. 소리·센서 곡선·주가 흐름처럼 끝없이 이어지는 데이터는 담지 못합니다.</p>
<p>1초짜리 음악만 해도 CD 음질로 받아 적으면 숫자가 4만 4천 1백 개입니다. 그래도 소리 곡선 자체는 끝없이 이어집니다.</p>
<h3>③ 힐베르트 공간이란</h3>
<div class="three" style="border-color:var(--orange);background:var(--orange-soft)"><ul>
<li>자와 각도기는 그대로 두고, 방을 <b>끝없이</b> 넓힌 것입니다.</li>
<li>곡선 하나를 점 하나로 보고, 곡선끼리도 "얼마나 먼가·얼마나 닮았나·그림자"를 잽니다.</li>
<li>오늘 배운 규칙이 거의 그대로 통합니다. 달라지는 것은 칸 수뿐입니다.</li></ul>
<details class="abbr"><summary>원어 (펼치기)</summary><dl><dt>Hilbert space</dt><dd>힐베르트 공간 — 길이·각도·그림자·극한이 모두 되는 끝없는 방</dd></dl></details></div>
<h3>④ 어디에 쓰이나 (이름만)</h3>
<div class="cards">
<div class="card"><span class="n">음성 인식</span><h3>소리를 물결 조각으로</h3><p>소리를 낮은 소리·높은 소리 조각의 세기로 나눠 봅니다.</p></div>
<div class="card"><span class="n">압축</span><h3>MP3</h3><p>큰 조각 몇 개만 남기고 작은 조각은 버립니다.</p></div>
<div class="card"><span class="n">커널 방법</span><h3>SVM</h3><p>닮음 점수표만으로 끝없는 방에 칸막이를 세웁니다.</p></div></div>
<h3>⑤ 실험 — 칸 수를 끝없이</h3>
{talk([("moa","e09","칸을 계속 늘리면 어떻게 돼요?"),("fruitfly","e09","끝까지 밀어 봐. \"끝없이\"까지.")])}
<div class="panel"><div class="ph"><b>끝맺음 실험</b><small>칸 수를 2 → 3 → 10 → 100 → 끝없이로 바꿔 보세요</small></div>
<div id="pp-outro" data-panel="outro"></div>
<div class="ctrl"><label>칸 수 <input type="range" min="0" max="4" step="1" value="0" aria-label="칸 수"></label><span class="hint">2 · 3 · 10 · 100 · 끝없이</span></div>
<div class="readout" aria-live="polite"></div></div>
<h3>⑥ 다음 편으로</h3>
{talk([("doctor","e08","다음 복도에는 끝없는 방이 열 개 있다. 자와 각도기는 그대로 들고 가라."),("sia","e19","곡선이 점 하나라니, 빨리 들어가 보고 싶어요!"),("moa","e10","오늘 배운 그림자가 거기서도 통하는지 확인할게요.")])}
<div class="cards"><div class="card soon door">{face("haru","e19")}<span class="n">다음 편 · 곧 열립니다</span><h3>끝없는 방의 자와 각도기 — 힐베르트 공간</h3><p>공개되면 이 카드가 열립니다. 저장소: <a href="{HILBERT}">hilbert_space_lab</a></p></div></div>
<div class="next"><a href="01_ruler_rooms.html">← ①편</a><a href="index.html">목차로</a></div>
</div></section>
<style>.door.open{{opacity:1;border:2px solid var(--orange);box-shadow:0 0 0 6px rgba(232,115,26,.12)}}</style>
"""

if __name__ == "__main__":
    build_index(); build_orient(); build_part(1); build_part(2)
    print("built")
