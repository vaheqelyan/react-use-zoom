import{useRef as t,useState as e,useEffect as n}from"react";class r{constructor(t){this.svg=t||document.createElementNS("http://www.w3.org/2000/svg","svg"),this.vtm=this.createSVGMatrix(),this.x=0,this.y=0}clamp(t,e,n,r){let i=(window.innerWidth-r.width)/2,c=(window.innerHeight-r.height)/2,a=i*t+r.width*t-window.innerWidth,o=Math.min(1*this.vtm.e,0),u=Math.min(1*this.vtm.f,0),h=e>0?o:-i*t,s=this.vtm.e;s=Math.max(e>0?o:-a,this.vtm.e),s=Math.min(h,s);let w=c*t+r.height*t-window.innerHeight,l=n>0?u:-w,d=this.vtm.f;d=Math.min(n>0?u:-c*t,d),d=Math.max(d,l),this.vtm=this.createSVGMatrix().translate(s,d).scale(Math.max(this.vtm.a,1))}createSVGMatrix(){return this.svg.createSVGMatrix()}move(t,e,n,r,i){return this.vtm=this.createSVGMatrix().translate(this.x-t,this.y-e).scale(this.vtm.a),this.clamp(this.vtm.a,n,r,i),this.vtm}scale(t,e,n,r,i,c){this.vtm=this.createSVGMatrix().translate(n.x,n.y).scale(t,e).translate(-n.x,-n.y).multiply(this.vtm);let a=Math.max(this.vtm.a,1);return this.clamp(a,r,i,c),this.vtm}}class i{constructor(){this.touchA={clientX:0,clientY:0,t:0},this.touchB={clientX:0,clientY:0,t:0}}down(t,e){this.touchA={clientX:t.clientX,clientY:t.clientY,t:Date.now(),velocity:0},this.touchB={clientX:e.clientX,clientY:e.clientY,t:Date.now(),veloctiy:0}}calc(t,e){var n=t.clientX,r=t.clientY,i=Date.now(),c=n-e.clientX,a=r-e.clientY,o=i-e.t,u=Math.sqrt(c*c+a*a)/o;e.velocity=u,e.clientX=n,e.clientY=r,e.t=i}getVelocity(t,e){return this.calc(t,this.touchA),this.calc(e,this.touchB),this.touchA.velocity+this.touchB.velocity}}const c=(t,e)=>Math.hypot(t.pageX-e.pageX,t.pageY-e.pageY);export default function(){const a=t({initX:0,initY:0,newX:0,newY:0}),o=t(),u=t(),h=t(),s=t(new r),w=t(new i),l=t({time:0,x:0,run:!1}),d=t({scaling:!1,x1:0,x2:0,y1:0,y2:0,lastHypo:0,originX:0,originY:0,value:1,max:1}),[m,v]=e(!1),g=t=>{t.preventDefault();const e=1+.1*(t.deltaY<0?1:-1),n=e*window.innerHeight/window.innerWidth;if(d.current.value*e>=d.current.max)return;let r=(window.innerWidth-o.current.width*s.current.vtm.a)/2,i=(window.innerHeight-o.current.height*s.current.vtm.a)/2;const c={x:r>0?window.innerWidth/2:t.pageX,y:i>0?window.innerHeight/2:t.pageY},a=s.current.scale(e,n,c,r,i,o.current);h.current.style.transform=`translate(${a.e}px,${a.f}px) scale(${a.d})`,d.current.value=a.d};n(()=>{window.addEventListener("wheel",g,{passive:!1})},[]);const p=({clientX:t,clientY:e})=>{Y(t,e)},x=()=>{window.removeEventListener("mousemove",p),y()},X=(t,e)=>{a.current.initX=t,a.current.initY=e,s.current.x=s.current.vtm.e,s.current.y=s.current.vtm.f},Y=(t,e)=>{if(d.current.scaling)return;let n=(window.innerWidth-o.current.width*s.current.vtm.a)/2,r=(window.innerHeight-o.current.height*s.current.vtm.a)/2;a.current.newX=a.current.initX-t,a.current.newY=a.current.initY-e;const i=s.current.move(n>=0?0:a.current.newX,r>=0?0:a.current.newY,n,r,o.current);h.current.style.transform=`matrix(${i.a},${i.b},${i.c},${i.d},${i.e}, ${i.f})`},y=()=>{s.current.x-=a.current.newX,s.current.y-=a.current.newY,d.current.scaling=!1,u.current=s.current.vtm.d,d.current.lastHypo=0},M=t=>{if(d.current.scaling){const[e,n]=t.touches;((t,e,n)=>{const r=c(t,e);let i=r/d.current.lastHypo;i=i>=1?1:-1;const a=1+.1*w.current.getVelocity(t,e)*i;if(d.current.value*a>=d.current.max)return;const u=a*window.innerHeight/window.innerWidth;let l=(window.innerWidth-o.current.width*s.current.vtm.a)/2,m=(window.innerHeight-o.current.height*s.current.vtm.a)/2;const v={x:l>0?window.innerWidth/2:d.current.originX,y:m>0?window.innerHeight/2:d.current.originY},g=s.current.scale(a,u,v,l,m,o.current);h.current.style.transform=`translate(${g.e}px, ${g.f}px) scale(${g.d})`,d.current.value=g.d,d.current.lastHypo=r,d.current.scaling=!0})(e,n)}else Y(t.touches[0].pageX,t.touches[0].pageY)},f=t=>{y(),window.removeEventListener("touchmove",M),window.removeEventListener("touchend",f),window.removeEventListener("touchcancel",f)};return{events:{onLoad:()=>{const{naturalWidth:t,naturalHeight:e}=h.current;(t>window.innerWidth||e>window.innerHeight)&&v(!0),d.current.max=Math.max(t/window.innerWidth,1),o.current=function(t,e,n,r){var i=Math.min(n/t,r/e);return{width:t*i,height:e*i,ratio:i}}(h.current.naturalWidth,h.current.naturalHeight,window.innerWidth,window.innerHeight)},onTouchStart:t=>{const e=2===t.touches.length,[n,r]=t.touches;d.current.scaling=e,h.current.classList.remove("tr"),e?(((t,e)=>{u.current=s.current.vtm.a;const n=[Math.min(t.pageX,e.pageX),Math.max(t.pageX,e.pageX)],r=[Math.min(t.pageY,e.pageY),Math.max(t.pageY,e.pageY)],i=(r[1]-r[0])/2+r[0];d.current.originX=(n[1]-n[0])/2+n[0],d.current.originY=i,d.current.lastHypo=Math.trunc(c(t,e))})(n,r),w.current.down(n,r)):((new Date).getTime()-l.current.time<250&&Math.abs(l.current.x-n.pageX)<=20&&(h.current.classList.add("tr"),((t,e)=>{let n=s.current.vtm.a;const r=1+(n>1?n-1:.5)*(n>1?-1:1),i=r*window.innerHeight/window.innerWidth;if(d.current.value*r>=d.current.max)return;let c=(window.innerWidth-o.current.width*Math.max(r*n,1))/2,a=(window.innerHeight-o.current.height*Math.max(r*n,1))/2;const u={x:c>0?window.innerWidth/2:t,y:a>0?window.innerHeight/2:e},w=s.current.scale(r,i,u,c,a,o.current);d.current.value=w.d,h.current.style.transform=`translate(${w.e}px, ${w.f}px) scale(${w.d})`})(n.pageX,n.pageY)),l.current.time=(new Date).getTime(),l.current.x=n.pageX,X(n.pageX,n.pageY)),window.removeEventListener("touchmove",M),window.removeEventListener("touchend",f),window.addEventListener("touchmove",M),window.addEventListener("touchend",f)},onMouseDown:({clientX:t,clientY:e})=>{X(t,e),window.addEventListener("mousemove",p),window.addEventListener("mouseup",x)}},objectFit:m,imgRef:h}}
//# sourceMappingURL=index.modern.js.map
