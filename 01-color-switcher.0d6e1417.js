const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.stopBtn.setAttribute("disabled","disabled"),t.startBtn.addEventListener("click",(function(){const e=setInterval((()=>{t.stopBtn.addEventListener("click",d),document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.startBtn.setAttribute("disabled","disabled"),t.stopBtn.removeAttribute("disabled","disabled")}),1e3);function d(){clearInterval(e),t.startBtn.removeAttribute("disabled","disabled"),t.stopBtn.setAttribute("disabled","disabled")}}));
//# sourceMappingURL=01-color-switcher.0d6e1417.js.map
