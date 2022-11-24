import '@/assets/styles/quiz.scss';
import '@/assets/styles/result.scss'
import '@/scripts/helpers/game'
import Game from '@/scripts/helpers/game';
import birdsDataRu from './data/birds.ru'
import birdsDataEn from './data/birds.en'
import initMenu from './helpers/menu';

// create audio player
initMenu()
const game = new Game(localStorage.getItem('lang') == 'EN' ? birdsDataEn : birdsDataRu)

















