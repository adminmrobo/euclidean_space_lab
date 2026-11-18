# -*- coding: utf-8 -*-
"""공유 미리보기(og:image) 1200×630 — 표지 그림이 들어오기 전 임시판. 배경이 투명한 캐릭터만 쓴다."""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
def font(sz): return ImageFont.truetype(F, sz, index=1)
ITEMS = [('og_index.jpg', '자와 각도기의 방', '시아·모아의 유클리드 공간', ['sia_e19', 'moa_e09']),
         ('og_00.jpg', '0편 · 가방 점검', '좌표평면 · 피타고라스 · sin·cos', ['sia_e13', 'moa_e01']),
         ('og_01.jpg', '①편 · 자와 각도기의 방', '점 · 이동 · 거리 · 겹침 점수 · 자 세트', ['sia_e01', 'jupanbot_e16']),
         ('og_02.jpg', '②편 · 그림자와 칸막이의 방', '그림자 · 칸막이 · 공 · 단위 맞추기 · 대결', ['moa_e16', 'sia_e14'])]
for fn, t, sub, ch in ITEMS:
    W, H = 1200, 630; im = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(im)
    for x in range(0, W, 60): d.line([(x, 0), (x, H)], fill='#e3eaf1')
    for y in range(0, H, 60): d.line([(0, y), (W, y)], fill='#e3eaf1')
    d.line([(80, 540), (1120, 540)], fill='#1e2f6e', width=4); d.line([(80, 540), (80, 80)], fill='#1e2f6e', width=4)
    d.line([(560, 470), (1000, 210)], fill='#2458d6', width=6); d.line([(560, 470), (1000, 470)], fill='#13733a', width=4); d.line([(1000, 470), (1000, 210)], fill='#13733a', width=4)
    d.ellipse([548, 458, 572, 482], fill='#0f8f84'); d.ellipse([988, 198, 1012, 222], fill='#e8731a')
    d.rounded_rectangle([110, 110, 760, 330], radius=18, fill='white', outline='#d5dbe2', width=2)
    d.text((140, 135), t, font=font(50), fill='#16212b'); d.text((140, 215), sub, font=font(28), fill='#0f8f84')
    d.text((140, 275), '원자료 @eeanimation · 글 안상선', font=font(22), fill='#5b6874')
    for i, c in enumerate(ch):
        cim = Image.open(os.path.join(ROOT, f'assets/chars/{c}.webp')).convert('RGBA').resize((230, 230), Image.LANCZOS)
        im.paste(cim, (700 + i * 240, 380), cim)
    im.save(os.path.join(ROOT, 'assets/og', fn), quality=82)
print('og done')
