# -*- coding: utf-8 -*-
"""'숫자로 한 번 해 보기'·퀴즈·대결 숫자 검산. 하나라도 틀리면 AssertionError."""
from math import sqrt, hypot, cos, sin, radians, pi, isclose
ok = lambda a, b, t=0.01: isclose(a, b, abs_tol=t)
# 1번 방
assert abs(163-160) == 3 and hypot(3, 4) == 5 and sqrt(9+16+144) == 13
# 2번 방
assert (4-1, 3-1) == (3, 2) and (6-2, 2-5) == (4, -3)
# 3번 방
assert hypot(3, 4) == 5 and sqrt(4+4+1) == 3
# 4번 방
assert ok(6/(3*sqrt(8)), 0.707) and ok(sqrt(8), 2.83)
assert ok(22/(sqrt(26)*sqrt(20)), 0.965, 0.001) and 1*-2 + 2*1 == 0
# 5번 방
c = radians(45); e1 = (cos(c), sin(c)); e2 = (-sin(c), cos(c))
c1 = 3*e1[0]+2*e1[1]; c2 = 3*e2[0]+2*e2[1]
assert ok(c1, 3.54) and ok(c2, -0.71) and ok(c1**2+c2**2, 13)
# 6번 방
u = (2, 1); k = (3*2+2*1)/(2*2+1*1); p = (k*2, k*1); r = (3-p[0], 2-p[1])
assert ok(k, 1.6) and ok(p[0], 3.2) and ok(p[1], 1.6) and ok(r[0]*2+r[1]*1, 0)
assert sum((x-162)**2 for x in (160, 162, 164)) == 8 and sum((x-161)**2 for x in (160, 162, 164)) == 11
assert sum((x-173)**2 for x in (170, 172, 177)) == 26 and sum((x-172)**2 for x in (170, 172, 177)) == 29
# 7번 방
assert 2+4+4 == 10 and ok((10-6)/3, 1.33) and sqrt(1+4+4) == 3 and 0+0+2*3 == 6
# 8번 방
assert hypot(-4, 3) == 5
# 9번 방
assert ok(pi, 3.14) and ok(4*pi/3, 4.19) and ok(0.9**2, 0.81) and ok(0.9**3, 0.729, 1e-6)
assert ok(0.9**10, 0.349, 0.001) and ok(0.9**100, 0.0000266, 1e-7)
# 10번 방·대결
new = (165, 55); A, B, C = (160, 56), (166, 48), (170, 62)
d = lambda a, f=1, g=1: hypot((a[0]-new[0])*f, (a[1]-new[1])*g)
assert ok(d(A), 5.10) and ok(d(B), 7.07) and ok(d(C), 8.60)
assert ok(d(A, 10), 50.01) and ok(d(B, 10), 12.21) and ok(d(C, 10), 50.49)
assert ok(d(A, .2, .2), 1.02) and ok(d(B, .2, .2), 1.41) and ok(d(C, .2, .2), 1.72)
R = 6371
assert round(R*pi/2) == 10008 and round(2*R*sin(pi/4)) == 9010 and round(R*pi) == 20015 and 2*R == 12742
N = (158, 49)
dd = lambda a, f=1, g=1: hypot((a[0]-N[0])*f, (a[1]-N[1])*g)
L_, M_, B_ = (155, 51), (159, 43), (163, 48)
assert ok(dd(L_, 10), 30.07) and ok(dd(M_, 10), 11.66) and ok(dd(B_, 10), 50.01)
assert ok(dd(L_, .2, .2), 0.72) and ok(dd(M_, .2, .2), 1.22) and ok(dd(B_, .2, .2), 1.02)
assert min([L_, M_, B_], key=lambda a: dd(a, 10)) == M_ and min([L_, M_, B_], key=lambda a: dd(a, .2, .2)) == L_
print("검산 통과")
