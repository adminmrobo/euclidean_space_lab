/* 자와 각도기의 방 — 실험 패널 모음. 원자료 @eeanimation 「EUCLIDEAN SPACE 01~10」의 차트를 다시 그려 손으로 움직이게 만든 것 */
(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
var C={teal:'#0f8f84',orange:'#e8731a',navy:'#1e2f6e',blue:'#2458d6',green:'#13733a',red:'#c9302c',grid:'#e3e8ee',axis:'#1e2f6e',muted:'#5b6874'};
function el(tag,a,parent){var e=document.createElementNS(NS,tag);for(var k in a){if(a[k]!=null)e.setAttribute(k,a[k]);}if(parent)parent.appendChild(e);return e;}
function txt(parent,x,y,s,a){a=a||{};var t=el('text',Object.assign({x:x,y:y,'font-size':a.size||14,fill:a.fill||C.navy,'font-family':a.font||'"Cambria Math","Times New Roman",serif','font-style':a.italic===false?'normal':'italic','text-anchor':a.anchor||'start','font-weight':a.weight||'normal'},{}),parent);t.textContent=s;return t;}
function ktxt(parent,x,y,s,a){a=a||{};a.font='"IBM Plex Sans KR","Malgun Gothic","Noto Sans KR",sans-serif';a.italic=false;return txt(parent,x,y,s,a);}
function r2(v){return Math.round(v*100)/100;}
function r1(v){return Math.round(v*10)/10;}
function fmt(v,d){d=d==null?2:d;var s=(Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);s=s.replace(/\.?0+$/,'');if(s==='-0')s='0';return s;}
function num(v){return v<0?'−'+fmt(-v):fmt(v);}
function svgOf(host,W,H){host.innerHTML='';var s=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img'},host);var d=el('defs',{},s);
  ['teal','orange','navy','blue','green','red'].forEach(function(c){var m=el('marker',{id:'ah-'+c+'-'+host.id,viewBox:'0 0 10 10',refX:8.5,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'},d);el('path',{d:'M0,0 L10,5 L0,10 z',fill:C[c]},m);});
  s._id=host.id;return s;}
function arrow(s,x1,y1,x2,y2,c,w){return el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:C[c],'stroke-width':w||3,'marker-end':'url(#ah-'+c+'-'+s._id+')'},s);}
function dash(s,x1,y1,x2,y2,c){return el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:C[c]||c,'stroke-width':1.6,'stroke-dasharray':'5 4'},s);}
/* 좌표평면 */
function plane(s,o){var W=o.W,H=o.H,p=o.pad||36;var sx=(W-2*p)/(o.x1-o.x0),sy=(H-2*p)/(o.y1-o.y0);
  if(o.equal){var k=Math.min(sx,sy);sx=sy=k;}
  var ox=p-o.x0*sx,oy=H-p+o.y0*sy;s._sx=sx;
  var P={X:function(x){return ox+x*sx;},Y:function(y){return oy-y*sy;},inv:function(px,py){return[(px-ox)/sx,(oy-py)/sy];},sx:sx,sy:sy};
  var g=el('g',{},s);var st=o.step||1;
  if(o.grid!==false){for(var x=Math.ceil(o.x0/st)*st;x<=o.x1+1e-9;x+=st)el('line',{x1:P.X(x),y1:P.Y(o.y0),x2:P.X(x),y2:P.Y(o.y1),stroke:C.grid},g);
  for(var y=Math.ceil(o.y0/st)*st;y<=o.y1+1e-9;y+=st)el('line',{x1:P.X(o.x0),y1:P.Y(y),x2:P.X(o.x1),y2:P.Y(y),stroke:C.grid},g);}
  var ax0=Math.max(o.x0,Math.min(0,o.x1)),ay0=Math.max(o.y0,Math.min(0,o.y1));
  if(o.ax!==undefined)ax0=o.ax;if(o.ay!==undefined)ay0=o.ay;
  el('line',{x1:P.X(o.x0),y1:P.Y(ay0),x2:P.X(o.x1)+14,y2:P.Y(ay0),stroke:C.axis,'stroke-width':2,'marker-end':'url(#ah-navy-'+s._id+')'},g);
  el('line',{x1:P.X(ax0),y1:P.Y(o.y0),x2:P.X(ax0),y2:P.Y(o.y1)-14,stroke:C.axis,'stroke-width':2,'marker-end':'url(#ah-navy-'+s._id+')'},g);
  if(/[^\x00-\x7f]/.test((o.xl||'')+(o.yl||''))){ktxt(g,P.X(o.x1)+14,P.Y(ay0)-12,o.xl,{size:13,anchor:'end'});ktxt(g,P.X(ax0)+12,P.Y(o.y1)-2,o.yl,{size:13});}else{txt(g,P.X(o.x1)+10,P.Y(ay0)+20,o.xl||'x',{size:16});txt(g,P.X(ax0)-22,P.Y(o.y1)-8,o.yl||'y',{size:16});}
  var ls=o.label||st;
  if(o.ticks!==false){for(var a=Math.ceil(o.x0/ls)*ls;a<=o.x1+1e-9;a+=ls){if(Math.abs(a-ax0)<1e-9&&!o.zeroX)continue;txt(g,P.X(a),P.Y(ay0)+18,fmt(a),{size:12.5,anchor:'middle',italic:false,fill:C.muted});}
  for(var b=Math.ceil(o.y0/ls)*ls;b<=o.y1+1e-9;b+=ls){if(Math.abs(b-ay0)<1e-9)continue;txt(g,P.X(ax0)-8,P.Y(b)+4,fmt(b),{size:12.5,anchor:'end',italic:false,fill:C.muted});}
  if(o.x0<=0&&o.y0<=0)txt(g,P.X(0)-14,P.Y(0)+18,'0',{size:12.5,italic:false,fill:C.muted});}
  return P;}
/* 끌기 */
function drag(s,node,onMove){var on=false;var host=s.parentNode;var idx=s.querySelectorAll('g.drag').length;
  node.setAttribute('tabindex','0');node.setAttribute('role','slider');node.setAttribute('aria-label','끌어서 옮기는 점 (화살표 키로도 움직입니다)');
  node.addEventListener('keydown',function(e){var k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!k)return;e.preventDefault();
    var c=node.querySelector('circle');var st=(s._sx||24)*(+(host.dataset.ksnap||1));host.dataset.kf=idx;onMove(+c.getAttribute('cx')+k[0]*st,+c.getAttribute('cy')+k[1]*st);});
  function pt(e){var m=s.getScreenCTM().inverse();var q=s.createSVGPoint();q.x=e.clientX;q.y=e.clientY;q=q.matrixTransform(m);return q;}
  node.classList.add('drag');
  node.addEventListener('pointerdown',function(e){on=true;node.setPointerCapture(e.pointerId);e.preventDefault();});
  node.addEventListener('pointermove',function(e){if(!on)return;var q=pt(e);onMove(q.x,q.y);});
  node.addEventListener('pointerup',function(){on=false;});node.addEventListener('pointercancel',function(){on=false;});
  if(host.dataset.kf!=null&&+host.dataset.kf===idx)node.focus({preventScroll:true});}
function handle(s,x,y,c,label){var g=el('g',{},s);el('circle',{cx:x,cy:y,r:16,fill:C[c],'fill-opacity':.14},g);el('circle',{cx:x,cy:y,r:8,fill:C[c],stroke:'#fff','stroke-width':2},g);return g;}
function dot(s,x,y,c,r){return el('circle',{cx:x,cy:y,r:r||6,fill:C[c]||c,stroke:'#fff','stroke-width':1.5},s);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function snap(v,st){return Math.round(v/st)*st;}
function readout(host){var d=host.parentNode.querySelector('.readout');return d;}
function rightMark(s,x,y,ux,uy,vx,vy,k){k=k||10;el('path',{d:'M'+(x+ux*k)+','+(y+uy*k)+' L'+(x+ux*k+vx*k)+','+(y+uy*k+vy*k)+' L'+(x+vx*k)+','+(y+vy*k),fill:'none',stroke:C.orange,'stroke-width':1.5},s);}

var P={};

/* ===== 0편 ===== */
P.o1=function(h){var W=520,H=400,pt=[3,2];var out=readout(h);
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:0,x1:6,y0:0,y1:4.5,equal:true});
    var bg=el('rect',{x:0,y:0,width:W,height:H,fill:'transparent'},s);
    dash(s,p.X(pt[0]),p.Y(pt[1]),p.X(pt[0]),p.Y(0),'teal');dash(s,p.X(pt[0]),p.Y(pt[1]),p.X(0),p.Y(pt[1]),'teal');
    dot(s,p.X(pt[0]),p.Y(pt[1]),'orange',8);txt(s,p.X(pt[0])+10,p.Y(pt[1])-10,'P('+fmt(pt[0])+', '+fmt(pt[1])+')',{size:16});
    bg.addEventListener('pointerdown',function(e){var m=s.getScreenCTM().inverse();var q=s.createSVGPoint();q.x=e.clientX;q.y=e.clientY;q=q.matrixTransform(m);var v=p.inv(q.x,q.y);pt=[clamp(snap(v[0],.5),0,6),clamp(snap(v[1],.5),0,4.5)];draw();});
    out.innerHTML='점 P는 <b>가로로 '+fmt(pt[0])+'칸, 세로로 '+fmt(pt[1])+'칸</b> 간 자리입니다. 숫자 두 개 = 점 하나.';}
  draw();};
P.o2=function(h){var W=520,H=400,B=[4,3];var out=readout(h);
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:0,x1:8,y0:0,y1:6,equal:true});
    el('line',{x1:p.X(0),y1:p.Y(0),x2:p.X(B[0]),y2:p.Y(0),stroke:C.green,'stroke-width':3},s);
    el('line',{x1:p.X(B[0]),y1:p.Y(0),x2:p.X(B[0]),y2:p.Y(B[1]),stroke:C.green,'stroke-width':3},s);
    el('line',{x1:p.X(0),y1:p.Y(0),x2:p.X(B[0]),y2:p.Y(B[1]),stroke:C.blue,'stroke-width':3},s);
    rightMark(s,p.X(B[0]),p.Y(0),-1,0,0,-1,12);
    txt(s,p.X(B[0]/2),p.Y(0)-8,'a = '+B[0],{anchor:'middle',fill:C.orange,size:15});txt(s,p.X(B[0])+8,p.Y(B[1]/2),'b = '+B[1],{fill:C.orange,size:15});
    var g=handle(s,p.X(B[0]),p.Y(B[1]),'blue');drag(s,g,function(x,y){var v=p.inv(x,y);var nb=[clamp(snap(v[0],1),1,8),clamp(snap(v[1],1),1,6)];if(nb[0]!==B[0]||nb[1]!==B[1]){B=nb;draw();}});
    var c=Math.sqrt(B[0]*B[0]+B[1]*B[1]);var ok=Math.abs(c-Math.round(c))<1e-9;
    out.innerHTML=B[0]+'² + '+B[1]+'² = '+(B[0]*B[0]+B[1]*B[1])+' → 빗변 c = √'+(B[0]*B[0]+B[1]*B[1])+' = <b>'+fmt(c)+'</b>'+(ok?' <span class="alert">딱 떨어지는 짝입니다!</span>':'');}
  draw();};
P.o3=function(h){var W=520,H=400;var inp=h.parentNode.querySelector('input');var out=readout(h);
  function draw(){var t=+inp.value;var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-1.3,x1:1.3,y0:-1.3,y1:1.3,equal:true,step:.5,label:.5,grid:true});
    el('circle',{cx:p.X(0),cy:p.Y(0),r:p.sx,fill:'none',stroke:C.teal,'stroke-width':2},s);
    var a=t*Math.PI/180,cx=Math.cos(a),sy=Math.sin(a);
    arrow(s,p.X(0),p.Y(0),p.X(cx),p.Y(sy),'blue');
    el('line',{x1:p.X(0),y1:p.Y(0),x2:p.X(cx),y2:p.Y(0),stroke:C.orange,'stroke-width':4},s);
    el('line',{x1:p.X(cx),y1:p.Y(0),x2:p.X(cx),y2:p.Y(sy),stroke:C.green,'stroke-width':4},s);
    txt(s,p.X(cx/2),p.Y(0)+(sy>=0?20:-8),'cos θ',{anchor:'middle',fill:C.orange});txt(s,p.X(cx)+6,p.Y(sy/2),'sin θ',{fill:C.green});
    out.innerHTML='θ = '+t+'° → 가로 cos θ = <b>'+num(cx)+'</b>, 세로 sin θ = <b>'+num(sy)+'</b> (둘의 제곱합은 늘 1)';}
  inp.addEventListener('input',draw);draw();};

/* ===== 1번 방: 칸 수 1·2·3 ===== */
P.p01=function(h){var W=600,H=360;var inp=h.parentNode.querySelector('input');var out=readout(h);
  var A=[160,50,64],B=[163,54,76],names=['키','몸무게','허리'],units=['cm','kg','cm'];
  function draw(){var n=+inp.value;var s=svgOf(h,W,H);
    if(n===1){var y=H/2;el('line',{x1:40,y1:y,x2:W-40,y2:y,stroke:C.navy,'stroke-width':2,'marker-end':'url(#ah-navy-'+h.id+')','marker-start':'url(#ah-navy-'+h.id+')'},s);
      for(var v=155;v<=170;v++){var X=40+(v-155)*(W-80)/15;el('line',{x1:X,y1:y-5,x2:X,y2:y+5,stroke:C.navy},s);if(v%5===0)txt(s,X,y+24,v,{anchor:'middle',italic:false,size:13,fill:C.muted});}
      var xa=40+5*(W-80)/15,xb=40+8*(W-80)/15;el('line',{x1:xa,y1:y-18,x2:xb,y2:y-18,stroke:C.orange,'stroke-width':3},s);
      dot(s,xa,y,'teal',8);dot(s,xb,y,'orange',8);ktxt(s,xa,y+48,'시아 160',{anchor:'middle',fill:C.teal});ktxt(s,xb,y+48,'모아 163',{anchor:'middle',fill:C.orange});
      txt(s,(xa+xb)/2,y-28,'|163 − 160| = 3',{anchor:'middle',size:15});ktxt(s,W-40,y-14,'키(cm)',{anchor:'end',size:13,fill:C.muted});
    }else if(n===2){var p=plane(s,{W:W,H:H,x0:158,x1:166,y0:48,y1:56,ax:158,ay:48,xl:'키(cm)',yl:'몸무게(kg)',equal:true,zeroX:true,pad:54});
      el('line',{x1:p.X(160),y1:p.Y(50),x2:p.X(163),y2:p.Y(50),stroke:C.green,'stroke-width':2.5,'stroke-dasharray':'6 4'},s);
      el('line',{x1:p.X(163),y1:p.Y(50),x2:p.X(163),y2:p.Y(54),stroke:C.green,'stroke-width':2.5,'stroke-dasharray':'6 4'},s);
      el('line',{x1:p.X(160),y1:p.Y(50),x2:p.X(163),y2:p.Y(54),stroke:C.blue,'stroke-width':3},s);
      dot(s,p.X(160),p.Y(50),'teal',8);dot(s,p.X(163),p.Y(54),'orange',8);
      ktxt(s,p.X(160)-10,p.Y(50)-12,'시아(160, 50)',{fill:C.teal,size:13,anchor:'end'});ktxt(s,p.X(163)+10,p.Y(54)-8,'모아(163, 54)',{fill:C.orange,size:13});
      txt(s,p.X(161.5),p.Y(50)+18,'3',{fill:C.orange,anchor:'middle'});txt(s,p.X(163)+8,p.Y(52),'4',{fill:C.orange});txt(s,p.X(161.3)-10,p.Y(52.5),'5',{fill:C.blue,size:16});
    }else{var o=[W*0.42,H*0.70],k=12;function pr(x,y,z){return[o[0]-x*k*0.62+y*k*1.25,o[1]+x*k*0.48-z*k*1.25*0.55];}
      var ax=[[6,0,0,'키'],[0,10,0,'몸무게'],[0,0,16,'허리']];ax.forEach(function(a){var q=pr(a[0],a[1],a[2]);el('line',{x1:o[0],y1:o[1],x2:q[0],y2:q[1],stroke:C.navy,'stroke-width':2,'marker-end':'url(#ah-navy-'+h.id+')'},s);ktxt(s,q[0]+(a[0]?-10:6),q[1]+(a[2]?-6:14),a[3],{size:13,fill:C.navy,anchor:a[0]?'end':'start'});});
      var path=[[0,0,0],[3,0,0],[3,4,0],[3,4,12]];for(var i=0;i<3;i++){var a1=pr.apply(null,path[i]),b1=pr.apply(null,path[i+1]);el('line',{x1:a1[0],y1:a1[1],x2:b1[0],y2:b1[1],stroke:C.green,'stroke-width':2.5,'stroke-dasharray':'6 4'},s);}
      var a0=pr(0,0,0),b0=pr(3,4,12);el('line',{x1:a0[0],y1:a0[1],x2:b0[0],y2:b0[1],stroke:C.blue,'stroke-width':3},s);
      dot(s,a0[0],a0[1],'teal',8);dot(s,b0[0],b0[1],'orange',8);ktxt(s,a0[0]-10,a0[1]+20,'시아',{anchor:'end',fill:C.teal,size:13});ktxt(s,b0[0]+10,b0[1],'모아',{fill:C.orange,size:13});
      var m1=pr(1.5,0,0),m2=pr(3,2,0),m3=pr(3,4,6);txt(s,m1[0]-8,m1[1]+16,'3',{fill:C.orange,anchor:'end'});txt(s,m2[0],m2[1]+18,'4',{fill:C.orange});txt(s,m3[0]+8,m3[1],'12',{fill:C.orange});
      ktxt(s,14,22,'시아를 원점에 두고 그린 차이(가로 3 · 세로 4 · 높이 12)',{size:12.5,fill:C.muted});}
    var terms=[],sum=0,diff=[3,4,12];for(var i=0;i<n;i++){terms.push(diff[i]+'²');sum+=diff[i]*diff[i];}
    var used=[];for(var j=0;j<n;j++)used.push(names[j]);
    out.innerHTML='칸 '+n+'개('+used.join('·')+') → 거리 = √('+terms.join(' + ')+') = √'+sum+' = <b>'+fmt(Math.sqrt(sum))+'</b>. 칸이 하나 늘 때마다 제곱 항이 하나 더 붙습니다.';}
  inp.addEventListener('input',draw);draw();};

/* ===== 2번 방: 점과 화살표 ===== */
P.p02=function(h){h.dataset.ksnap='0.5';var W=520,H=440,A=[1,1],B=[4,3];var out=readout(h);
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:0,x1:5,y0:0,y1:4.5,equal:true});
    dash(s,p.X(B[0]),p.Y(B[1]),p.X(B[0]),p.Y(0),'#8a96a3');dash(s,p.X(B[0]),p.Y(B[1]),p.X(0),p.Y(B[1]),'#8a96a3');
    arrow(s,p.X(0),p.Y(0),p.X(A[0]),p.Y(A[1]),'blue',2.5);arrow(s,p.X(0),p.Y(0),p.X(B[0]),p.Y(B[1]),'blue',2);
    if(B[0]!==A[0]||B[1]!==A[1])arrow(s,p.X(A[0]),p.Y(A[1]),p.X(B[0]),p.Y(B[1]),'teal',3.5);
    dot(s,p.X(0),p.Y(0),'navy',5);txt(s,p.X(0)-18,p.Y(0)+20,'O',{size:16});
    dot(s,p.X(A[0]),p.Y(A[1]),'blue',7);txt(s,p.X(A[0])-8,p.Y(A[1])-12,'A = (1, 1)',{anchor:'end',fill:C.blue});
    var v=[B[0]-A[0],B[1]-A[1]];
    txt(s,(p.X(A[0])+p.X(B[0]))/2-6,(p.Y(A[1])+p.Y(B[1]))/2-12,'v = ('+num(v[0])+', '+num(v[1])+')',{fill:C.teal,anchor:'end',size:15});
    var g=handle(s,p.X(B[0]),p.Y(B[1]),'blue');txt(s,p.X(B[0])+12,p.Y(B[1])-12,'B = ('+fmt(B[0])+', '+fmt(B[1])+')',{fill:C.blue});
    drag(s,g,function(x,y){var q=p.inv(x,y);var nb=[clamp(snap(q[0],.5),0,5),clamp(snap(q[1],.5),0,4.5)];if(nb[0]!==B[0]||nb[1]!==B[1]){B=nb;draw();}});
    out.innerHTML='B − A = ('+fmt(B[0])+' − 1, '+fmt(B[1])+' − 1) = <b>('+num(v[0])+', '+num(v[1])+')</b> → 집(A)에서 동쪽으로 '+num(v[0])+', 북쪽으로 '+num(v[1])+' 가면 B입니다.';}
  draw();};

/* ===== 3번 방: 거리 ===== */
P.p03=function(h){var W=520,H=440,A=[1,1],B=[4,5];var out=readout(h);
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:0,x1:6,y0:0,y1:6,equal:true});
    var dx=B[0]-A[0],dy=B[1]-A[1];
    el('line',{x1:p.X(A[0]),y1:p.Y(A[1]),x2:p.X(B[0]),y2:p.Y(A[1]),stroke:C.green,'stroke-width':3},s);
    el('line',{x1:p.X(B[0]),y1:p.Y(A[1]),x2:p.X(B[0]),y2:p.Y(B[1]),stroke:C.green,'stroke-width':3},s);
    if(dx&&dy)rightMark(s,p.X(B[0]),p.Y(A[1]),dx>0?-1:1,0,0,dy>0?-1:1,11);
    el('line',{x1:p.X(A[0]),y1:p.Y(A[1]),x2:p.X(B[0]),y2:p.Y(B[1]),stroke:C.blue,'stroke-width':3.5},s);
    if(dx)txt(s,p.X((A[0]+B[0])/2),p.Y(A[1])+(dy>=0?22:-10),fmt(Math.abs(dx)),{fill:C.orange,anchor:'middle',size:17});
    if(dy)txt(s,p.X(B[0])+(dx>=0?10:-10),p.Y((A[1]+B[1])/2),fmt(Math.abs(dy)),{fill:C.orange,anchor:dx>=0?'start':'end',size:17});
    var gA=handle(s,p.X(A[0]),p.Y(A[1]),'blue'),gB=handle(s,p.X(B[0]),p.Y(B[1]),'blue');
    txt(s,p.X(A[0])-10,p.Y(A[1])+24,'A = ('+A[0]+', '+A[1]+')',{anchor:'end',size:14});txt(s,p.X(B[0])+12,p.Y(B[1])-12,'B = ('+B[0]+', '+B[1]+')',{size:14});
    drag(s,gA,function(x,y){var q=p.inv(x,y);var n=[clamp(snap(q[0],1),0,6),clamp(snap(q[1],1),0,6)];if(n[0]!==A[0]||n[1]!==A[1]){A=n;draw();}});
    drag(s,gB,function(x,y){var q=p.inv(x,y);var n=[clamp(snap(q[0],1),0,6),clamp(snap(q[1],1),0,6)];if(n[0]!==B[0]||n[1]!==B[1]){B=n;draw();}});
    var d2=dx*dx+dy*dy,d=Math.sqrt(d2);
    out.innerHTML='가로 차 '+Math.abs(dx)+', 세로 차 '+Math.abs(dy)+' → 거리 = √('+(dx*dx)+' + '+(dy*dy)+') = √'+d2+' = <b>'+fmt(d)+'</b> · 골목길(가로+세로)로 가면 '+(Math.abs(dx)+Math.abs(dy))+'칸';}
  draw();};

/* ===== 4번 방: 겹침 점수와 각도 ===== */
P.p04=function(h){h.dataset.ksnap='0.5';var W=540,H=420,u=[3,0],v=[2,2];var out=readout(h);
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-3,x1:4,y0:-2,y1:3.5,equal:true});
    var dt=u[0]*v[0]+u[1]*v[1],nu=3,nv=Math.hypot(v[0],v[1]);
    if(nv>0){var th=Math.acos(clamp(dt/(nu*nv),-1,1));var ang=Math.atan2(v[1],v[0]);var r=34;
      var large=th>Math.PI?1:0,sw=ang>=0?0:1;
      el('path',{d:'M'+(p.X(0)+r)+','+p.Y(0)+' A'+r+','+r+' 0 0,'+sw+' '+(p.X(0)+r*Math.cos(ang))+','+(p.Y(0)-r*Math.sin(ang))+' L'+p.X(0)+','+p.Y(0)+' Z',fill:C.orange,'fill-opacity':.18,stroke:C.orange},s);
      txt(s,p.X(0)+r+10,p.Y(0)+(ang>=0?-12:22),'θ = '+fmt(th*180/Math.PI,1)+'°',{fill:C.orange,size:15});}
    if(Math.abs(dt)<1e-9&&nv>0)rightMark(s,p.X(0),p.Y(0),1,0,0,v[1]>0?-1:1,14);
    arrow(s,p.X(0),p.Y(0),p.X(3),p.Y(0),'blue',3.5);txt(s,p.X(3)+6,p.Y(0)-12,'u = (3, 0)',{fill:C.blue});
    if(nv>0)arrow(s,p.X(0),p.Y(0),p.X(v[0]),p.Y(v[1]),'teal',3.5);
    var g=handle(s,p.X(v[0]),p.Y(v[1]),'teal');txt(s,p.X(v[0])+12,p.Y(v[1])-12,'v = ('+num(v[0])+', '+num(v[1])+')',{fill:C.teal});
    drag(s,g,function(x,y){var q=p.inv(x,y);var n=[clamp(snap(q[0],.5),-3,4),clamp(snap(q[1],.5),-2,3.5)];if(n[0]!==v[0]||n[1]!==v[1]){v=n;draw();}});
    var msg='겹침 점수 u·v = 3×'+num(v[0])+' + 0×'+num(v[1])+' = <b>'+num(dt)+'</b>';
    if(nv>0){msg+=' · 길이 ‖v‖ = '+fmt(nv)+' · cos θ = '+num(dt)+' ÷ (3 × '+fmt(nv)+') = <b>'+num(dt/(nu*nv))+'</b>';
      if(Math.abs(dt)<1e-9)msg+=' <span class="alert">→ 직각! 서로 영향을 주지 않는 방향</span>';else if(dt<0)msg+=' → 반대쪽을 봅니다(점수가 음수)';}
    out.innerHTML=msg;}
  draw();};

/* ===== 5번 방: 자 세트 돌리기 ===== */
P.p05=function(h){var W=520,H=420,v=[3,2];var inp=h.parentNode.querySelector('input');var out=readout(h);
  function draw(){var f=+inp.value*Math.PI/180;var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-1.5,x1:4,y0:-1,y1:3.5,equal:true,grid:false});
    var e1=[Math.cos(f),Math.sin(f)],e2=[-Math.sin(f),Math.cos(f)];
    for(var k=-6;k<=6;k++){el('line',{x1:p.X(k*e1[0]-8*e2[0]),y1:p.Y(k*e1[1]-8*e2[1]),x2:p.X(k*e1[0]+8*e2[0]),y2:p.Y(k*e1[1]+8*e2[1]),stroke:'#dfe6f0'},s);
      el('line',{x1:p.X(k*e2[0]-8*e1[0]),y1:p.Y(k*e2[1]-8*e1[1]),x2:p.X(k*e2[0]+8*e1[0]),y2:p.Y(k*e2[1]+8*e1[1]),stroke:'#dfe6f0'},s);}
    var c1=v[0]*e1[0]+v[1]*e1[1],c2=v[0]*e2[0]+v[1]*e2[1];
    dash(s,p.X(v[0]),p.Y(v[1]),p.X(c1*e1[0]),p.Y(c1*e1[1]),'teal');dash(s,p.X(v[0]),p.Y(v[1]),p.X(c2*e2[0]),p.Y(c2*e2[1]),'teal');
    arrow(s,p.X(0),p.Y(0),p.X(e1[0]),p.Y(e1[1]),'blue',4);arrow(s,p.X(0),p.Y(0),p.X(e2[0]),p.Y(e2[1]),'blue',4);
    rightMark(s,p.X(0),p.Y(0),e1[0],-e1[1],e2[0],-e2[1],12);
    txt(s,p.X(e1[0]*1.15)+4,p.Y(e1[1]*1.15)+18,'e₁',{fill:C.blue,size:17});txt(s,p.X(e2[0]*1.1)+8,p.Y(e2[1]*1.1),'e₂',{fill:C.blue,size:17});
    arrow(s,p.X(0),p.Y(0),p.X(v[0]),p.Y(v[1]),'teal',3.5);dot(s,p.X(v[0]),p.Y(v[1]),'teal',6);txt(s,p.X(v[0])+8,p.Y(v[1])-10,'v',{fill:C.teal,size:17});
    out.innerHTML='자 세트를 '+inp.value+'° 돌림 → v = <b>'+num(c1)+'</b> e₁ + <b>'+num(c2)+'</b> e₂ · 좌표 숫자는 바뀌어도 '+fmt(c1)+'² + '+num(c2)+'² = <b>'+fmt(c1*c1+c2*c2)+'</b> (= 3² + 2² = 13, 길이 '+fmt(Math.sqrt(13))+' 그대로)';}
  inp.addEventListener('input',draw);draw();};

/* ===== 6번 방: 그림자 ===== */
P.p06=function(h){var W=520,H=420,v=[3,2];var inp=h.parentNode.querySelector('input');var out=readout(h);
  var pre=h.parentNode.querySelector('[data-preset]');if(pre)pre.addEventListener('click',function(){inp.value=(Math.atan2(1,2)*180/Math.PI).toFixed(1);draw();});
  function draw(){var a=+inp.value*Math.PI/180;var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-.5,x1:4,y0:-.5,y1:3.2,equal:true});
    var u=[Math.cos(a),Math.sin(a)];var c=v[0]*u[0]+v[1]*u[1];var pp=[c*u[0],c*u[1]],r=[v[0]-pp[0],v[1]-pp[1]];
    el('line',{x1:p.X(-1*u[0]),y1:p.Y(-1*u[1]),x2:p.X(5*u[0]),y2:p.Y(5*u[1]),stroke:C.orange,'stroke-width':2,'stroke-opacity':.5},s);
    el('line',{x1:p.X(0),y1:p.Y(0),x2:p.X(pp[0]),y2:p.Y(pp[1]),stroke:C.orange,'stroke-width':5},s);
    arrow(s,p.X(0),p.Y(0),p.X(u[0]),p.Y(u[1]),'green',3.5);
    arrow(s,p.X(0),p.Y(0),p.X(v[0]),p.Y(v[1]),'blue',3.5);
    if(Math.hypot(r[0],r[1])>0.05){arrow(s,p.X(pp[0]),p.Y(pp[1]),p.X(v[0]),p.Y(v[1]),'green',3);var rl=Math.hypot(r[0],r[1]);rightMark(s,p.X(pp[0]),p.Y(pp[1]),-u[0],u[1],r[0]/rl,-r[1]/rl,11);}
    dot(s,p.X(pp[0]),p.Y(pp[1]),'orange',7);
    txt(s,p.X(v[0])+8,p.Y(v[1])-8,'v = (3, 2)',{fill:C.blue});txt(s,p.X(pp[0])+(a<0.3?0:12),p.Y(pp[1])+(a<0.3?24:14),'p',{fill:C.orange,size:17});
    txt(s,p.X(u[0])-4,p.Y(u[1])+(a<0.3?24:-10),'u',{fill:C.green,size:16,anchor:'end'});txt(s,p.X((pp[0]+v[0])/2)+8,p.Y((pp[1]+v[1])/2),'r',{fill:C.green,size:17});
    var dot_=r[0]*u[0]+r[1]*u[1];
    out.innerHTML='그림자 p = (<b>'+num(pp[0])+', '+num(pp[1])+'</b>) · 빗나간 만큼 r = ('+num(r[0])+', '+num(r[1])+'), 길이 <b>'+fmt(Math.hypot(r[0],r[1]))+'</b> · r·u = '+num(Math.abs(dot_)<5e-3?0:dot_)+' <span class="alert">(직각)</span>';}
  inp.addEventListener('input',draw);draw();};

/* ===== 7번 방: 칸막이 x₁+2x₂+2x₃=6 ===== */
P.p07=function(h){var W=560,H=440;var ins=h.parentNode.querySelectorAll('input');var out=readout(h);
  var o=[W*0.40,H*0.70],k=30;function pr(x,y,z){return[o[0]-x*k*0.62+y*k*1.15,o[1]+x*k*0.46-z*k*1.0];}
  function draw(){var P_=[+ins[0].value,+ins[1].value,+ins[2].value];var s=svgOf(h,W,H);
    [[6.6,0,0,'x₁'],[0,5,0,'x₂'],[0,0,5,'x₃']].forEach(function(a){var q=pr(a[0],a[1],a[2]);var q0=pr(0,0,0);el('line',{x1:q0[0],y1:q0[1],x2:q[0],y2:q[1],stroke:C.navy,'stroke-width':2,'marker-end':'url(#ah-navy-'+h.id+')'},s);txt(s,q[0]+(a[0]?-14:8),q[1]+(a[3]==='x₃'?-4:16),a[3],{size:16});});
    var t1=pr(6,0,0),t2=pr(0,3,0),t3=pr(0,0,3);
    el('path',{d:'M'+t1+' L'+t2+' L'+t3+' Z',fill:C.teal,'fill-opacity':.22,stroke:C.teal,'stroke-width':2},s);
    [[6,0,0],[0,3,0],[0,0,3]].forEach(function(q){var z=pr(q[0],q[1],q[2]);dot(s,z[0],z[1],'orange',5);});
    var sc=P_[0]+2*P_[1]+2*P_[2];var t=(sc-6)/9;var F=[P_[0]-t,P_[1]-2*t,P_[2]-2*t];
    var cpt=pr(4,0.5,0.5);var ntip=pr(4+0.6,0.5+1.2,0.5+1.2);arrow(s,cpt[0],cpt[1],ntip[0],ntip[1],'orange',2.5);txt(s,ntip[0]+6,ntip[1],'n = (1, 2, 2)',{fill:C.orange,size:14});
    var b0=pr(P_[0],P_[1],0),pp=pr(P_[0],P_[1],P_[2]),ff=pr(F[0],F[1],F[2]);
    dash(s,b0[0],b0[1],pp[0],pp[1],'#9aa5b1');
    if(Math.abs(t)>1e-9)el('line',{x1:pp[0],y1:pp[1],x2:ff[0],y2:ff[1],stroke:C.orange,'stroke-width':2.5,'stroke-dasharray':'2 3'},s);
    var col=sc>6?'blue':(sc<6?'red':'green');dot(s,pp[0],pp[1],col,8);txt(s,pp[0]+10,pp[1]-8,'P('+P_.join(', ')+')',{fill:C[col],size:14});
    var side=sc>6?'<b>원점 반대편</b>(예: 스팸)':(sc<6?'<b>원점 쪽</b>(예: 정상 메일)':'<b>칸막이 위(경계)</b> — 판단 보류');
    out.innerHTML='점수 x₁ + 2x₂ + 2x₃ = '+P_[0]+' + '+(2*P_[1])+' + '+(2*P_[2])+' = <b>'+sc+'</b> → 6과 비교하면 '+side+' · 칸막이까지 거리 = |'+sc+' − 6| ÷ 3 = <b>'+fmt(Math.abs(sc-6)/3)+'</b>';}
  ins.forEach(function(i){i.addEventListener('input',draw);});draw();};

/* ===== 8번 방: 밀고 돌리고 뒤집기 ===== */
P.p08=function(h){var W=540,H=440;var host=h.parentNode;var ang=host.querySelector('input');var out=readout(h);
  var st={t:[0,0],m:1,s:1};var T=[[0,0],[3,0],[3,4]];
  host.querySelectorAll('[data-op]').forEach(function(b){b.addEventListener('click',function(){var op=b.getAttribute('data-op');
    if(op==='reset'){st={t:[0,0],m:1,s:1};ang.value=0;}if(op==='slide'){st.t=[st.t[0]-2,st.t[1]+1];if(st.t[0]<-6)st.t=[0,0];}
    if(op==='mirror')st.m*=-1;if(op==='scale')st.s=st.s===1?2:1;draw();});});
  function tr(q){var a=+ang.value*Math.PI/180;var x=q[0]*st.m,y=q[1];var rx=x*Math.cos(a)-y*Math.sin(a),ry=x*Math.sin(a)+y*Math.cos(a);return[st.s*rx+st.t[0],st.s*ry+st.t[1]];}
  function draw(){var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-10,x1:10,y0:-9,y1:9,equal:true,step:2,label:4});
    el('path',{d:'M'+T.map(function(q){return p.X(q[0])+','+p.Y(q[1]);}).join(' L')+' Z',fill:'#9db7f0','fill-opacity':.35,stroke:C.blue,'stroke-dasharray':'5 4'},s);
    var U=T.map(tr);el('path',{d:'M'+U.map(function(q){return p.X(q[0])+','+p.Y(q[1]);}).join(' L')+' Z',fill:C.teal,'fill-opacity':.3,stroke:C.teal,'stroke-width':2.5},s);
    U.forEach(function(q){dot(s,p.X(q[0]),p.Y(q[1]),'teal',4);});
    var L=[0,1,2].map(function(i){var a=U[i],b=U[(i+1)%3];return Math.hypot(a[0]-b[0],a[1]-b[1]);});L.sort(function(a,b){return a-b;});
    host.querySelectorAll('[data-op]').forEach(function(b){var op=b.getAttribute('data-op');b.classList.toggle('on',(op==='mirror'&&st.m<0)||(op==='scale'&&st.s===2));});
    out.innerHTML='세 변 길이: <b>'+L.map(function(x){return fmt(x);}).join(' · ')+'</b> (원래 3 · 4 · 5) → '+(st.s===1?'<span class="alert">거리 그대로 — 밀기·돌리기·뒤집기는 모양을 바꾸지 않습니다</span>':'모든 거리가 <b>2배</b> — 늘리기는 거리를 바꿉니다');}
  ang.addEventListener('input',draw);draw();};

/* ===== 9번 방 ①: 반지름 안 이웃 ===== */
P.p09a=function(h){var W=500,H=440;var inp=h.parentNode.querySelector('input');var out=readout(h);
  var pts=[[0.3,0.4],[-0.6,0.2],[0.9,-0.5],[-0.2,-1.1],[1.3,0.9],[-1.4,-0.3],[0.5,1.6],[-1.0,1.3],[1.7,-0.4],[-1.6,-1.4],[1.2,-1.5],[0.0,-1.9],[-0.4,0.9],[2.0,1.2]];
  function draw(){var r=+inp.value;var s=svgOf(h,W,H);var p=plane(s,{W:W,H:H,x0:-2.3,x1:2.3,y0:-2.3,y1:2.3,equal:true,step:.5,label:1});
    el('circle',{cx:p.X(0),cy:p.Y(0),r:r*p.sx,fill:C.teal,'fill-opacity':.13,stroke:C.teal,'stroke-width':2},s);
    var inn=0,ds=pts.map(function(q){return Math.hypot(q[0],q[1]);});
    pts.forEach(function(q,i){var ins_=ds[i]<=r+1e-9;if(ins_)inn++;el('rect',{x:p.X(q[0])-6,y:p.Y(q[1])-6,width:12,height:12,rx:2,fill:ins_?C.orange:'#b6c0cb'},s);});
    dot(s,p.X(0),p.Y(0),'navy',7);ktxt(s,p.X(0)+8,p.Y(0)+20,'집',{size:13});
    if(r>0){arrow(s,p.X(0),p.Y(0),p.X(r*Math.cos(.6)),p.Y(r*Math.sin(.6)),'orange',2);txt(s,p.X(r*Math.cos(.6)/2)-4,p.Y(r*Math.sin(.6)/2)-8,'r',{fill:C.orange,size:16});}
    var mn=Math.min.apply(null,ds);
    out.innerHTML='반지름 r = '+fmt(r,1)+'km 안 편의점 <b>'+inn+'곳</b> (원 넓이 πr² = '+fmt(Math.PI*r*r)+'km²) · 가장 가까운 곳은 '+fmt(mn)+'km';}
  inp.addEventListener('input',draw);draw();};
/* ===== 9번 방 ②: 칸이 늘면 껍질로 ===== */
P.p09b=function(h){var W=560,H=230;var inp=h.parentNode.querySelector('input');var out=readout(h);var ns=[1,2,3,5,10,20,50,100];
  function draw(){var n=ns[+inp.value];var f=Math.pow(0.9,n);var s=svgOf(h,W,H);
    var x0=30,w=W-60,y=60,bh=46;el('rect',{x:x0,y:y,width:w,height:bh,fill:C.orange,'fill-opacity':.85,rx:6},s);
    el('rect',{x:x0,y:y,width:Math.max(w*f,1),height:bh,fill:C.teal,rx:6},s);
    ktxt(s,x0,y-12,'안쪽(반지름 0.9 안)',{size:13,fill:C.teal});ktxt(s,x0+w,y-12,'겉껍질(0.9 ~ 1)',{size:13,fill:C.orange,anchor:'end'});
    ktxt(s,x0,y+bh+30,'칸 수 n = '+n,{size:16,fill:C.navy,weight:'bold'});
    var ins=(f*100),sh=100-ins;
    ktxt(s,x0+w,y+bh+30,'안쪽 '+(ins>=1?fmt(ins,1):ins.toPrecision(2))+'% · 껍질 '+fmt(sh,ins>=1?1:4)+'%',{size:15,fill:C.navy,anchor:'end'});
    ktxt(s,x0,y+bh+62,'반지름 1인 공에서 반지름 0.9 안쪽이 차지하는 부피 비율 = 0.9ⁿ',{size:13,fill:C.muted});
    out.innerHTML=n+'칸 방: 0.9<sup>'+n+'</sup> = <b>'+(f>=0.01?fmt(f,3):f.toExponential(2))+'</b> → 부피의 '+(sh>=99?'<b>거의 전부</b>':'<b>'+fmt(sh,1)+'%</b>')+'가 겉껍질에 있습니다.';}
  inp.addEventListener('input',draw);draw();};

/* ===== 10번 방 ①: 단위 맞추기 ===== */
var CUST=[{n:'고객 가',h:160,w:56},{n:'고객 나',h:166,w:48},{n:'고객 다',h:170,w:62}],NEWC={h:165,w:55};
P.p10a=function(h){var W=520,H=440;var host=h.parentNode;var mode='cm';var out=readout(h);
  host.querySelectorAll('[data-unit]').forEach(function(b){b.addEventListener('click',function(){mode=b.getAttribute('data-unit');draw();});});
  function draw(){host.querySelectorAll('[data-unit]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-unit')===mode);});
    var f=mode==='cm'?1:10;var s=svgOf(h,W,H);var p;
    if(mode==='cm')p=plane(s,{W:W,H:H,x0:155,x1:175,y0:45,y1:65,equal:true,step:5,ax:155,ay:45,xl:'키(cm)',yl:'몸무게(kg)',zeroX:true});
    else p=plane(s,{W:W,H:H,x0:1550,x1:1750,y0:0,y1:200,equal:true,step:50,ax:1550,ay:0,xl:'키(mm)',yl:'몸무게(kg)',zeroX:true});
    var ds=CUST.map(function(c){return Math.hypot((c.h-NEWC.h)*f,c.w-NEWC.w);});var best=ds.indexOf(Math.min.apply(null,ds));
    el('circle',{cx:p.X(NEWC.h*f),cy:p.Y(NEWC.w),r:ds[best]*p.sx,fill:C.orange,'fill-opacity':.08,stroke:C.orange,'stroke-dasharray':'5 4'},s);
    CUST.forEach(function(c,i){var X=p.X(c.h*f),Y=p.Y(c.w);dot(s,X,Y,i===best?'orange':'blue',i===best?8:6);ktxt(s,X+(i===1?-8:9),Y+(i===1?18:-8),c.n,{size:12.5,anchor:i===1?'end':'start',fill:i===best?C.orange:C.blue});});
    dot(s,p.X(NEWC.h*f),p.Y(NEWC.w),'navy',7);ktxt(s,p.X(NEWC.h*f)+8,p.Y(NEWC.w)+18,'새 고객',{size:12.5});
    out.innerHTML='키를 <b>'+(mode==='cm'?'cm':'mm')+'</b>로 적으면 거리: '+CUST.map(function(c,i){return c.n+' '+fmt(ds[i])+(i===best?' ★':'');}).join(' · ')+' → 가장 가까운 이웃은 <b>'+CUST[best].n+'</b>'+(mode==='mm'?' (키 숫자가 10배로 커져 거리를 독차지합니다)':'');}
  draw();};
/* ===== 10번 방 ②: 호와 현 ===== */
P.p10b=function(h){var W=520,H=400;var inp=h.parentNode.querySelector('input');var out=readout(h);var R=6371;
  function draw(){var t=+inp.value*Math.PI/180;var s=svgOf(h,W,H);var cx=W/2,cy=H/2+20,rr=150;
    el('circle',{cx:cx,cy:cy,r:rr,fill:'#e8f0fd',stroke:C.blue,'stroke-width':2},s);
    for(var i=-2;i<=2;i++)el('ellipse',{cx:cx,cy:cy-i*rr*0.33,rx:rr*Math.sqrt(1-Math.pow(i*0.33,2)),ry:12,fill:'none',stroke:'#c8d6f2'},s);
    var a0=Math.PI/2+t/2,a1=Math.PI/2-t/2;var A=[cx+rr*Math.cos(a0),cy-rr*Math.sin(a0)],B=[cx+rr*Math.cos(a1),cy-rr*Math.sin(a1)];
    dash(s,cx,cy,A[0],A[1],'#8a96a3');dash(s,cx,cy,B[0],B[1],'#8a96a3');
    if(t>0){el('path',{d:'M'+A[0]+','+A[1]+' A'+rr+','+rr+' 0 '+(t>Math.PI?1:0)+',1 '+B[0]+','+B[1],fill:'none',stroke:C.orange,'stroke-width':4},s);
      el('line',{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:C.teal,'stroke-width':3.5},s);}
    dot(s,A[0],A[1],'navy',7);dot(s,B[0],B[1],'navy',7);dot(s,cx,cy,'navy',4);
    txt(s,A[0]-10,A[1]-8,'A',{anchor:'end',size:17});txt(s,B[0]+10,B[1]-8,'B',{size:17});txt(s,cx+6,cy+20,'O',{size:15});
    var arc=R*t,ch=2*R*Math.sin(t/2);
    out.innerHTML='중심각 '+inp.value+'° · 지구 반지름 6,371km → 표면 따라(호) <b>'+Math.round(arc).toLocaleString()+'km</b>, 땅속 직선(현) <b>'+Math.round(ch).toLocaleString()+'km</b> · 차이 '+Math.round(arc-ch).toLocaleString()+'km';}
  inp.addEventListener('input',draw);draw();};

/* ===== 대결: 가장 가까운 이웃 찾기 ===== */
var DUELC=[{n:'고객 라',h:155,w:51},{n:'고객 마',h:159,w:43},{n:'고객 바',h:163,w:48}],DUELN={h:158,w:49};
P.duel=function(h){var host=h.parentNode;var out=readout(h);var shown={sia:false,moa:false,ans:false};
  host.querySelectorAll('[data-duel]').forEach(function(b){b.addEventListener('click',function(){shown[b.getAttribute('data-duel')]=true;b.classList.add('on');draw();});});
  function draw(){var rows=DUELC.map(function(c){var s1=Math.hypot((c.h-DUELN.h)*10,c.w-DUELN.w),s2=Math.hypot((c.h-DUELN.h)/5,(c.w-DUELN.w)/5);return[c,s1,s2];});
    var b1=0,b2=0;rows.forEach(function(r,i){if(r[1]<rows[b1][1])b1=i;if(r[2]<rows[b2][2])b2=i;});
    var t='<div class="tbl"><table><thead><tr><th>후보</th><th>키·몸무게</th><th>시아 방식 (키 mm, 몸무게 kg 그대로)</th><th>모아 방식 (키 ÷ 5cm, 몸무게 ÷ 5kg)</th></tr></thead><tbody>';
    rows.forEach(function(r,i){t+='<tr><td>'+r[0].n+'</td><td>'+r[0].h+'cm · '+r[0].w+'kg</td><td>'+(shown.sia?fmt(r[1])+(i===b1?' ★':''):'?')+'</td><td>'+(shown.moa?fmt(r[2])+(i===b2?' ★':''):'?')+'</td></tr>';});
    t+='</tbody></table></div>';h.innerHTML=t;
    var m='새 고객: 158cm · 49kg. ';
    if(shown.sia)m+='시아의 답: <b>'+DUELC[b1].n+'</b>. ';if(shown.moa)m+='모아의 답: <b>'+DUELC[b2].n+'</b>. ';
    if(shown.ans)m+='<br>정답(예시 데이터): 새 고객이 실제로 고른 옷 치수는 <b>고객 라</b>와 같았습니다 → <span class="alert">모아 승!</span> 단위를 맞추지 않으면 숫자가 큰 열(키 mm)이 거리를 독차지합니다.';
    out.innerHTML=m;}
  draw();};

/* ===== 끝맺음: 칸 수 → 끝없이 ===== */
P.outro=function(h){var W=600,H=320;var inp=h.parentNode.querySelector('input');var out=readout(h);var ns=[2,3,10,100,Infinity];
  function f(x){return 0.55*Math.sin(2*Math.PI*x)+0.3*Math.sin(6*Math.PI*x+0.6)+0.15*Math.cos(10*Math.PI*x);}
  function draw(){var n=ns[+inp.value];var s=svgOf(h,W,H);var x0=40,x1=W-40,y0=H/2,amp=110;
    el('line',{x1:x0,y1:y0,x2:x1,y2:y0,stroke:C.grid,'stroke-width':1.5},s);
    if(isFinite(n)){var bw=(x1-x0)/n;for(var i=0;i<n;i++){var x=(i+.5)/n,v=f(x);el('rect',{x:x0+i*bw+bw*0.15,y:v>0?y0-v*amp:y0,width:Math.max(bw*0.7,1),height:Math.abs(v)*amp,fill:C.teal,'fill-opacity':.8},s);if(n<=10)dot(s,x0+(i+.5)*bw,y0-v*amp,'orange',5);}
      ktxt(s,x0,28,'숫자 '+n+'개짜리 방 = 막대 '+n+'개',{size:14,fill:C.navy});}
    else{var d='';for(var j=0;j<=400;j++){var xx=j/400;d+=(j?'L':'M')+(x0+xx*(x1-x0))+','+(y0-f(xx)*amp);}el('path',{d:d,fill:'none',stroke:C.orange,'stroke-width':3.5},s);
      ktxt(s,x0,28,'끝없는 방 — 곡선 하나가 점 하나',{size:14,fill:C.orange,weight:'bold'});}
    var door=h.parentNode.parentNode.querySelector('.door');if(door)door.classList.toggle('open',!isFinite(n));
    out.innerHTML=isFinite(n)?'칸 '+n+'개: 곡선을 숫자 '+n+'개로 받아 적었습니다. 칸을 늘리면 더 닮지만 곡선 자체는 아닙니다.':'칸 수 <b>끝없이</b>: 곡선을 통째로 점 하나로 다룹니다. 자와 각도기는 그대로 — 이것이 <b>힐베르트 공간</b>입니다. 복도 끝 문이 열렸습니다.';}
  inp.addEventListener('input',draw);draw();};

/* ===== 퀴즈 ===== */
function quiz(q){var ans=+q.getAttribute('data-ans');var fb=q.querySelector('.fb');q.querySelectorAll('button').forEach(function(b,i){b.addEventListener('click',function(){q.querySelectorAll('button').forEach(function(x){x.classList.remove('ok','no');});b.classList.add(i===ans?'ok':'no');fb.innerHTML=i===ans?'⭕ '+q.getAttribute('data-ok'):'❌ '+q.getAttribute('data-no');});});}

/* ===== 지식 색인·꾸러미 ===== */
function kg(){var raw=document.getElementById('kg-raw');var mount=document.getElementById('kg-mount');if(!raw||!mount)return;var K=JSON.parse(raw.textContent);
  mount.innerHTML='<input class="kg-search" type="search" placeholder="개념 찾기 (예: 거리, 그림자, 칸막이)" aria-label="지식 색인 검색"><div class="kg-list"></div>';
  var list=mount.querySelector('.kg-list'),inp=mount.querySelector('input');
  var TY={Concept:'개념',Method:'방법',Analogy:'비유',Application:'쓰임',OpenQuestion:'열린 질문'};
  function render(){var q=inp.value.trim().toLowerCase();list.innerHTML=K.nodes.filter(function(n){return !q||(n.label.ko+' '+n.label.en+' '+(n.desc||'')).toLowerCase().indexOf(q)>=0;}).map(function(n){
    var nb=K.edges.filter(function(e){return e.s===n.id||e.o===n.id;}).map(function(e){var o=e.s===n.id?e.o:e.s;var m=K.nodes.filter(function(x){return x.id===o;})[0];return m?m.label.ko:'';}).filter(Boolean);
    return '<div class="kg-item"><span class="t">'+(TY[n.type]||n.type)+'</span><b>'+n.label.ko+'</b><span class="muted">'+n.label.en+'</span><div>'+(n.desc||'')+'</div>'+(nb.length?'<div class="muted" style="font-size:12.5px">이웃: '+nb.join(', ')+'</div>':'')+'<a href="'+(n.page?n.page+'.html':'')+n.anchor+'">설명 보러 가기 →</a></div>';}).join('');}
  inp.addEventListener('input',render);render();
  var ex=document.getElementById('export-mount');if(!ex)return;
  ex.innerHTML='<div class="exp-btns"><button class="btn" data-x="json">kg.json</button><button class="btn" data-x="ld">JSON-LD</button><button class="btn" data-x="ttl">Turtle (Protégé)</button><button class="btn" data-x="csv">CSV (Neo4j·Gephi)</button><button class="btn" data-x="bib">BibTeX</button><button class="btn" data-x="ris">RIS</button></div>';
  function dl(name,text,type){var b=new Blob([text],{type:type||'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);}
  var base=K.page;var refs=JSON.parse((document.getElementById('refs-csl')||{textContent:'[]'}).textContent);
  ex.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var x=b.getAttribute('data-x');
    if(x==='json')dl(base+'.kg.json',JSON.stringify(K,null,2),'application/json');
    if(x==='ld')dl(base+'.jsonld',document.getElementById('kg-ld').textContent,'application/ld+json');
    if(x==='ttl'){var t='@prefix lab: <urn:lab:> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n\n';
      K.nodes.forEach(function(n){t+='<urn:'+n.id+'> a lab:'+n.type+' ;\n  skos:prefLabel "'+n.label.ko+'"@ko , "'+n.label.en+'"@en ;\n  rdfs:comment "'+(n.desc||'').replace(/"/g,'\\"')+'"@ko .\n\n';});
      K.edges.forEach(function(e){t+='<urn:'+e.s+'> lab:'+e.p+' <urn:'+e.o+'> .\n';});dl(base+'.ttl',t,'text/turtle');}
    if(x==='csv'){var c='id,type,label_ko,label_en,anchor\n'+K.nodes.map(function(n){return [n.id,n.type,n.label.ko,n.label.en,(n.page||base)+'.html'+n.anchor].map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
      c+='\n\nsource,relation,target\n'+K.edges.map(function(e){return [e.s,e.p,e.o].join(',');}).join('\n');dl(base+'.csv',c,'text/csv');}
    if(x==='bib')dl(base+'.bib',refs.map(function(r){return '@misc{'+r.id+',\n  title = {'+r.title+'},\n  author = {'+r.author[0].literal+'},\n  howpublished = {'+(r.note||'')+'},\n  note = {accessed '+r.accessed['date-parts'][0].join('-')+'}\n}';}).join('\n\n'));
    if(x==='ris')dl(base+'.ris',refs.map(function(r){return 'TY  - GEN\nTI  - '+r.title+'\nAU  - '+r.author[0].literal+'\nN1  - '+(r.note||'')+'\nER  - ';}).join('\n'));});});}

function boot(){document.querySelectorAll('[data-panel]').forEach(function(h){var k=h.getAttribute('data-panel');if(P[k])P[k](h);});
  document.querySelectorAll('.quiz').forEach(quiz);kg();
  var pr=document.getElementById('prog');if(pr)window.addEventListener('scroll',function(){var d=document.documentElement;pr.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+'%';},{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
