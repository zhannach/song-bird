import '@/assets/styles/galery.scss';
import 'swiper/css'
import Swiper from 'swiper'
import birdsData from './birdData'
import interpolate from './interpolate'

function addBirdCards() {
  const cardContainer = document.querySelector('.swiper-wrapper');
  const template = document.querySelector('#gallery-item');
  if (!cardContainer) return
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      const card = interpolate(template.innerHTML, { item: birdsData[i][j] })
      cardContainer.innerHTML += card
    }
  }

}
addBirdCards()

const birdSwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: '.swiper-pagination',
  paginationClickable: true,
  spaceBetween: 30,
  loop: true,
  speed: 800,
})