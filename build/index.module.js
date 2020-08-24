import{useRef as t,useState as n,useEffect as e}from"react";var r=function(){function t(t){this.svg=t||document.createElementNS("http://www.w3.org/2000/svg","svg"),this.vtm=this.createSVGMatrix(),this.x=0,this.y=0}var n=t.prototype;return n.clamp=function(t,n,e,r){var i=(window.innerWidth-r.width)/2,c=(window.innerHeight-r.height)/2,a=i*t+r.width*t-window.innerWidth,u=Math.min(1*this.vtm.e,0),o=Math.min(1*this.vtm.f,0),h=n>0?u:-i*t,s=this.vtm.e;s=Math.max(n>0?u:-a,this.vtm.e),s=Math.min(h,s);var w=c*t+r.height*t-window.innerHeight,v=e>0?o:-w,d=this.vtm.f;d=Math.min(e>0?o:-c*t,d),d=Math.max(d,v),this.vtm=this.createSVGMatrix().translate(s,d).scale(Math.max(this.vtm.a,1))},n.createSVGMatrix=function(){return this.svg.createSVGMatrix()},n.move=function(t,n,e,r,i){return this.vtm=this.createSVGMatrix().translate(this.x-t,this.y-n).scale(this.vtm.a),this.clamp(this.vtm.a,e,r,i),this.vtm},n.scale=function(t,n,e,r,i,c){this.vtm=this.createSVGMatrix().translate(e.x,e.y).scale(t,n).translate(-e.x,-e.y).multiply(this.vtm);var a=Math.max(this.vtm.a,1);return this.clamp(a,r,i,c),this.vtm},t}(),i=function(){function t(){this.touchA={clientX:0,clientY:0,t:0},this.touchB={clientX:0,clientY:0,t:0}}var n=t.prototype;return n.down=function(t,n){this.touchA={clientX:t.clientX,clientY:t.clientY,t:Date.now(),velocity:0},this.touchB={clientX:n.clientX,clientY:n.clientY,t:Date.now(),veloctiy:0}},n.calc=function(t,n){var e=t.clientX,r=t.clientY,i=Date.now(),c=e-n.clientX,a=r-n.clientY,u=i-n.t,o=Math.sqrt(c*c+a*a)/u;n.velocity=o,n.clientX=e,n.clientY=r,n.t=i},n.getVelocity=function(t,n){return this.calc(t,this.touchA),this.calc(n,this.touchB),this.touchA.velocity+this.touchB.velocity},t}(),c=function(t,n){return Math.hypot(t.pageX-n.pageX,t.pageY-n.pageY)};export default function(){var a=t({initX:0,initY:0,newX:0,newY:0}),u=t(),o=t(),h=t(),s=t(new r),w=t(new i),v=t({time:0,x:0,run:!1}),d=t({scaling:!1,x1:0,x2:0,y1:0,y2:0,lastHypo:0,originX:0,originY:0,value:1,max:1}),l=n(!1),m=l[0],g=l[1],f=function(t){t.preventDefault();var n=1+.1*(t.deltaY<0?1:-1),e=n*window.innerHeight/window.innerWidth;if(!(d.current.value*n>=d.current.max)){var r=(window.innerWidth-u.current.width*s.current.vtm.a)/2,i=(window.innerHeight-u.current.height*s.current.vtm.a)/2,c={x:r>0?window.innerWidth/2:t.pageX,y:i>0?window.innerHeight/2:t.pageY},a=s.current.scale(n,e,c,r,i,u.current);h.current.style.transform="translate("+a.e+"px,"+a.f+"px) scale("+a.d+")",d.current.value=a.d}};e(function(){window.addEventListener("wheel",f,{passive:!1})},[]);var p=function(t){Y(t.clientX,t.clientY)},x=function(){window.removeEventListener("mousemove",p),y()},X=function(t,n){a.current.initX=t,a.current.initY=n,s.current.x=s.current.vtm.e,s.current.y=s.current.vtm.f},Y=function(t,n){if(!d.current.scaling){var e=(window.innerWidth-u.current.width*s.current.vtm.a)/2,r=(window.innerHeight-u.current.height*s.current.vtm.a)/2;a.current.newX=a.current.initX-t,a.current.newY=a.current.initY-n;var i=s.current.move(e>=0?0:a.current.newX,r>=0?0:a.current.newY,e,r,u.current);h.current.style.transform="matrix("+i.a+","+i.b+","+i.c+","+i.d+","+i.e+", "+i.f+")"}},y=function(){s.current.x-=a.current.newX,s.current.y-=a.current.newY,d.current.scaling=!1,o.current=s.current.vtm.d,d.current.lastHypo=0},M=function(t){if(d.current.scaling){var n=t.touches;!function(t,n,e){var r=c(t,n),i=r/d.current.lastHypo;i=i>=1?1:-1;var a=1+.1*w.current.getVelocity(t,n)*i;if(!(d.current.value*a>=d.current.max)){var o=a*window.innerHeight/window.innerWidth,v=(window.innerWidth-u.current.width*s.current.vtm.a)/2,l=(window.innerHeight-u.current.height*s.current.vtm.a)/2,m={x:v>0?window.innerWidth/2:d.current.originX,y:l>0?window.innerHeight/2:d.current.originY},g=s.current.scale(a,o,m,v,l,u.current);h.current.style.transform="translate("+g.e+"px, "+g.f+"px) scale("+g.d+")",d.current.value=g.d,d.current.lastHypo=r,d.current.scaling=!0}}(n[0],n[1])}else Y(t.touches[0].pageX,t.touches[0].pageY)},H=function t(n){y(),window.removeEventListener("touchmove",M),window.removeEventListener("touchend",t),window.removeEventListener("touchcancel",t)};return{events:{onLoad:function(){var t=h.current,n=t.naturalWidth;(n>window.innerWidth||t.naturalHeight>window.innerHeight)&&g(!0),d.current.max=Math.max(n/window.innerWidth,1),u.current=function(t,n,e,r){var i=Math.min(e/t,r/n);return{width:t*i,height:n*i,ratio:i}}(h.current.naturalWidth,h.current.naturalHeight,window.innerWidth,window.innerHeight)},onTouchStart:function(t){var n=2===t.touches.length,e=t.touches,r=e[0],i=e[1];d.current.scaling=n,h.current.classList.remove("tr"),n?(function(t,n){o.current=s.current.vtm.a;var e=[Math.min(t.pageX,n.pageX),Math.max(t.pageX,n.pageX)],r=[Math.min(t.pageY,n.pageY),Math.max(t.pageY,n.pageY)],i=(r[1]-r[0])/2+r[0];d.current.originX=(e[1]-e[0])/2+e[0],d.current.originY=i,d.current.lastHypo=Math.trunc(c(t,n))}(r,i),w.current.down(r,i)):((new Date).getTime()-v.current.time<250&&Math.abs(v.current.x-r.pageX)<=20&&(h.current.classList.add("tr"),function(t,n){var e=s.current.vtm.a,r=1+(e>1?e-1:.5)*(e>1?-1:1),i=r*window.innerHeight/window.innerWidth;if(!(d.current.value*r>=d.current.max)){var c=(window.innerWidth-u.current.width*Math.max(r*e,1))/2,a=(window.innerHeight-u.current.height*Math.max(r*e,1))/2,o={x:c>0?window.innerWidth/2:t,y:a>0?window.innerHeight/2:n},w=s.current.scale(r,i,o,c,a,u.current);d.current.value=w.d,h.current.style.transform="translate("+w.e+"px, "+w.f+"px) scale("+w.d+")"}}(r.pageX,r.pageY)),v.current.time=(new Date).getTime(),v.current.x=r.pageX,X(r.pageX,r.pageY)),window.removeEventListener("touchmove",M),window.removeEventListener("touchend",H),window.addEventListener("touchmove",M),window.addEventListener("touchend",H)},onMouseDown:function(t){X(t.clientX,t.clientY),window.addEventListener("mousemove",p),window.addEventListener("mouseup",x)}},objectFit:m,imgRef:h}}
//# sourceMappingURL=index.module.js.map
