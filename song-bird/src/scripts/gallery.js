import '@/assets/styles/gallery.scss';
import 'swiper/css'
import Swiper from 'swiper'
import birdsData from './data/birds.ru'
import interpolate from './helpers/interpolate'
import initMenu from './helpers/menu';
import initPlayer from './helpers/player';

function addBirdCards() {
  const cardContainer = document.querySelector('.swiper-wrapper');


  const template = document.querySelector('#gallery-item');
  if (!cardContainer) return
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      const cardHTML = interpolate(template.innerHTML, { item: birdsData[i][j] })
      cardContainer.innerHTML += cardHTML
    }
  }

}
addBirdCards()
initMenu()

const birdSwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: '.swiper-pagination',
  paginationClickable: true,
  spaceBetween: 30,
  loop: false,
  speed: 800,
})

const cards = document.querySelectorAll('.swiper-slide')
cards.forEach(card => {
  initPlayer(card)
})

// https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3
// https://xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3
