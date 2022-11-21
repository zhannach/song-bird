export default function initMenu() {
  const burger = document.querySelector('.header__burger')
  const nav = document.querySelector('.header__nav')
  burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger-active')
    burger.classList.toggle('burger-open')
    nav.classList.toggle('active')
    document.body.classList.toggle('has-overlay')
  })

  const lang = localStorage.getItem('lang')

  const switchLang = document.createElement('a')
  switchLang.className = 'nav__link'
  switchLang.innerHTML = lang === 'EN' ? 'RU' : 'EN' 
  switchLang.href = '#'
  nav.appendChild(switchLang)
  switchLang.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('lang', switchLang.innerHTML)
    location.reload()
  })
}


