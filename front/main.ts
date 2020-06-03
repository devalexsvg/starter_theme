import {initHeader} from "./layout/header"

jQuery(() => {
  const bg = <HTMLElement>document.querySelector('.siteBg')
  
  bg && initBg(bg)
  
  initHeader()
})


function initBg(root: HTMLElement) {
  let coef = 0,
      af = window.requestAnimationFrame(animate)
  
  updateCoef()
  window.addEventListener('resize', updateCoef)
  window.addEventListener('orientationchange', updateCoef)
  
  function animate() {
    root.style.transform = `translateY(${window.pageYOffset / (1 + coef)}px)`
    af = window.requestAnimationFrame(animate)
  }
  
  function updateCoef() {
    coef = window.innerHeight / document.body.clientHeight
  }
}

$('.div').on('çlick', function(){
  alert('zalupa');
});