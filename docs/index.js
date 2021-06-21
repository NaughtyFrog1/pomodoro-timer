(()=>{"use strict";var e,t,o,n=new Audio("assets/sounds/click.mp3"),a=new Audio("assets/sounds/bell.mp3"),r=document.querySelectorAll(".modal"),c=document.querySelectorAll(".modal__close"),s=document.querySelectorAll(".modal__ok"),i=document.querySelector(".modal--options"),l=document.querySelector(".btn--options"),d=document.querySelectorAll(".options__preset"),u=document.querySelector("#options-work"),m=document.querySelector("#options-break"),p=document.querySelector("#options-long-break");u.value=parseInt(null!==(e=localStorage.getItem("workTime"))&&void 0!==e?e:25,10),m.value=parseInt(null!==(t=localStorage.getItem("breakTime"))&&void 0!==t?t:5,10),p.value=parseInt(null!==(o=localStorage.getItem("longBreakTime"))&&void 0!==o?o:15,10);var v,f=document.querySelector(".pomodoro__timer"),g=document.querySelector(".pomodoro__start"),_=document.querySelector(".pomodoro__restart"),L=document.querySelector(".pomodoro__skip"),S=document.querySelectorAll(".pomodoro__step"),k=parseInt(u.value,10),E=parseInt(m.value,10),y=parseInt(p.value,10),I=u.value,h=0,q=0,T=!1,b=!0,w=function(e){return"".concat(e<10?"0":"").concat(e)},A=function(){var e="".concat(w(I),":").concat(w(h));document.title="".concat(e," | Pomodoro Timer"),f.innerText=e},N=function(){S[q-1>=0?q-1:3].classList.remove("pomodoro__step--active"),S[q].classList.add("pomodoro__step--active")},B=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];h>0?h-=1:I>0?(I-=1,h=59):(q<3?b?I=E:(I=k,q+=1,N()):b||3!==q?I=y:(q=0,I=k,N()),b=!b,e&&a.play(),t&&M(!1)),A()},M=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e&&n.play(),T?(g.innerHTML='<i class="fas fa-play"></i>',clearInterval(v)):(g.innerHTML='<i class="fas fa-pause"></i>',v=setInterval(B,1e3)),T=!T},x=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e&&n.play(),S[q].classList.remove("pomodoro__step--active"),S[q=0].classList.add("pomodoro__step--active"),I=k,h=0,b=!0,T&&M(!1),A()},D=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e&&n.play(),h=0,I=0,B(!1,T)},H=function(e){var t=e instanceof MouseEvent?e.target:e;S[q].classList.remove("pomodoro__step--active"),S[t.dataset.step].classList.add("pomodoro__step--active"),T&&M(!1),q=parseInt(t.dataset.step,10),I=k,h=0,b=!0,A()},K=function(e){b&&(I=e-(k-I))<0&&D(!1),k=e,u.value=e,localStorage.setItem("workTime",e),A()},P=function(e){!b&&q<=2&&(I=e-(E-I))<0&&D(),E=e,m.value=e,localStorage.setItem("breakTime",e),A()},R=function(e){b||3!==q||(I=e-(y-I))<0&&D(),y=e,p.value=e,localStorage.setItem("longBreakTime",e),A()},U=function(){var e=-1;if(25===k&&5===E&&15===y?e=0:45===k&&10===E&&30===y?e=1:90===k&&20===E&&60===y&&(e=2),-1!==e){var t=document.querySelector(".options__preset.active");t&&t.classList.remove("active"),d[e].classList.add("active")}};A(),N(),U(),localStorage.setItem("workTime",k),localStorage.setItem("breakTime",E),localStorage.setItem("longBreakTime",y),g.addEventListener("click",M),_.addEventListener("click",x),L.addEventListener("click",D),S.forEach((function(e){return e.addEventListener("click",H)})),document.addEventListener("keydown",(function(e){if("INPUT"!==e.target.tagName)if("Space"===e.code)M(!1);else if("KeyR"===e.code)x(!1);else if("KeyS"===e.code)D(!1);else if(e.code.includes("Digit")||e.code.includes("Numpad")){var t=parseInt(e.code.split("Digit").pop().split("Numpad").pop(),10);t>=1&&t<=4&&H(S[t-1])}})),l.addEventListener("click",(function(){return i.classList.toggle("hidden")})),r.forEach((function(e){return e.addEventListener("click",(function(t){t.target.classList.contains("modal")&&e.classList.add("hidden")}))})),c.forEach((function(e){return e.addEventListener("click",(function(){e.parentElement.parentElement.parentElement.classList.add("hidden")}))})),s.forEach((function(e){return e.addEventListener("click",(function(){e.parentElement.parentElement.parentElement.classList.add("hidden")}))})),u.addEventListener("change",(function(){K(parseInt(u.value,10)),U()})),m.addEventListener("change",(function(){P(parseInt(m.value,10)),U()})),p.addEventListener("change",(function(){R(parseInt(p.value,10)),U()})),d.forEach((function(e){return e.addEventListener("click",(function(){var t=document.querySelector(".options__preset.active");t&&t.classList.remove("active"),e.classList.add("active"),"popular"===e.dataset.preset?(K(25),P(5),R(15)):"medium"===e.dataset.preset?(K(45),P(10),R(30)):"extended"===e.dataset.preset&&(K(90),P(20),R(60))}))}))})();