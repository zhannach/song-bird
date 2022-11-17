import sectionsData from '@/birdData'
import { addBirdCard } from './galery'
import interpolate from './interpolate'
import { initPlayer } from './quiz'

class Game {
  maxScore = 30
  count = 0
  wrongAnswersCount = 0
  sectionsData
  currentMaxScore = 0
  currentSectionIndex = 0 // 0 - 5
  currentAnswerIndex // 0 - 5
  correctAnswerFound = false

  constructor(sectionsData) {
    this.birds = document.querySelectorAll('.bird-name')
    this.randonSection = document.querySelector('.random-bird')
    this.sectionsData = sectionsData
    this.sideContainer = document.querySelector('.bird-card')
    this.instursion = document.querySelector('.instruction')
    this.answersName = document.querySelector('.bird-names')
    this.currentAnswerIndex = Math.floor(Math.random() * 6);
    this.playerTemplate = document.querySelector('#side-item')
    this.nextBtn = document.querySelector('.btn-next')
    this.nextBtn.addEventListener('click', () => this.switchNextSection())
    this.paginationSection = document.querySelector('.pagination__items')
    this.addAnswers(this.currentSectionIndex)
    this.updateCurrentMaxScore()
    this.renderTopPayer(false) 
  }

  renderTopPayer(isFull) {
    const item = {
      ...this.sectionsData[this.currentSectionIndex][this.currentAnswerIndex]
    }

    if (!isFull) {
      item.name = '*****'
      item.image = '/img/black-bird.jpg'
    }

    this.randonSection.innerHTML = interpolate(this.playerTemplate.innerHTML, { item })
    initPlayer(this.randonSection)
    const info = this.randonSection.querySelector('.bird-card__info')
    const subtitle = this.randonSection.querySelector('.bird-card__subtitle')
    const player = this.randonSection.querySelector('.bird-card__group')
    const score = document.createElement('li')
    score.className = 'bird__score'
    score.innerHTML = `
    <span>Score:</span>
    <span class="score-point">${this.count}</span>
    `   
    player.appendChild(score)
    info.classList.add('hidden') 
    subtitle.classList.add('hide')
    player.classList.add('main')
  }

  addAnswers(index) {
    let answersDataArray = this.sectionsData[index]
    this.answersName.innerHTML = ""
    this.sideContainer.innerHTML = this.instursion.innerHTML
    // this.sideContainer.innerHTML = this.instursion.innerHTML
    for (let index = 0; index < answersDataArray.length; index++) {
      const answer = document.createElement('li')
      answer.className = 'bird-name'
      const currentAnswer = answersDataArray[index]
      answer.addEventListener('click', (e) => {
        this.handleAnswerClick(e.target, currentAnswer, index)
      })
      answer.innerHTML = `<span class="li-btn"></span> ${currentAnswer.name}`
      this.answersName.appendChild(answer)
    }
  }

  addSideItem(item) {
    const sideSection = document.querySelector('.bird-card')
    sideSection.innerHTML = interpolate(this.playerTemplate.innerHTML, { item })
    initPlayer(sideSection)
  }

  handleAnswerClick(elem, item, index) {

    this.addSideItem(item)
    if(this.correctAnswerFound) return

    // check right or wrong
    // add classes
    // play sound
    if (index === this.currentAnswerIndex) {
      const succesAudio = new Audio('/sound/success-sound.mp3')
      succesAudio.play()
      this.renderTopPayer(true)  
      elem.classList.add('correct')
      this.nextBtn.classList.add('active') 
      this.correctAnswerFound = true
      this.count = this.currentMaxScore - this.wrongAnswersCount
      // this.score.innerText = count 
      let score = document.querySelector('.score-point')
      score.innerHTML = this.count

    } else {
      const failAudio = new Audio('/sound/failure-sound.mp3');
      elem.classList.add('wrong')
      failAudio.play()
      this.wrongAnswersCount += 1
    }
  }

  updateCurrentMaxScore() {
    //how much answers in sections
    const answersCount = this.sectionsData[this.currentSectionIndex].length 
    this.currentMaxScore = (this.currentSectionIndex + 1) * (answersCount - 1) 
  }

  switchNextSection() {
    if (!this.correctAnswerFound) return
    this.currentSectionIndex += 1 
    this.currentAnswerIndex = Math.floor(Math.random() * 6);
    this.updateCurrentMaxScore()
    this.addAnswers(this.currentSectionIndex)
    this.renderTopPayer(false)
    this.correctAnswerFound = false
    this.paginationSection.children[this.currentSectionIndex].classList.add('active')
    this.paginationSection.children[this.currentSectionIndex - 1].classList.removecq('active')

  }

 



}




const game = new Game(sectionsData)