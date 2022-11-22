
import interpolate from './interpolate'
import initPlayer from './player'

export default class Game {
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
    this.mainEl = document.querySelector('.main__container')
    this.resultEl = document.querySelector('.result__container')
    this.sectionsData = sectionsData
    this.sideContainer = document.querySelector('.bird-card')
    this.instursion = document.querySelector('.instruction')
    this.answersName = document.querySelector('.bird-names')
    this.currentAnswerIndex = Math.floor(Math.random() * 6);
    this.playerTemplate = document.querySelector('#side-item')
    this.nextBtn = document.querySelector('.btn-next')
    this.nextBtn.addEventListener('click', () => this.switchNextSection())
    this.paginationSection = document.querySelector('.pagination__items')
    this.updateCurrentMaxScore()
    this.renderTopPayer(false)
    // this.count = JSON.parse(localStorage.getItem('currentGame'))["score"]
    // console.log(this.count)
    // this.currentSectionIndex = JSON.parse(localStorage.getItem('currentGame'))["currentSectionIndex"]
    this.addAnswers(this.currentSectionIndex)
  }

  renderTopPayer(isFull) {
    const item = {
      ...this.sectionsData[this.currentSectionIndex][this.currentAnswerIndex]
    }

    if (!isFull) {
      item.name = '*****'
      item.image = 'assets/img/black-bird.jpg'
    }

    this.randonSection.innerHTML = interpolate(this.playerTemplate.innerHTML, { item })
    initPlayer(this.randonSection)
    const infoEl = this.randonSection.querySelector('.bird-card__info')
    const subtitleEl = this.randonSection.querySelector('.bird-card__subtitle')
    const playerEl = this.randonSection.querySelector('.bird-card__group')
    const scoreEl = document.createElement('div')
    scoreEl.className = 'bird__score'
    scoreEl.innerHTML = `
    <span>Score:</span>
    <span class="score-point">${this.count}</span>
    `
    playerEl.appendChild(scoreEl)
    infoEl.classList.add('hidden')
    subtitleEl.classList.add('hide')
    playerEl.classList.add('main')
  }

  addAnswers(index) {
    let answersDataArray = this.sectionsData[index]
    this.answersName.innerHTML = ""
    this.sideContainer.innerHTML = this.instursion.innerHTML

    for (let index = 0; index < answersDataArray.length; index++) {
      const answer = document.createElement('div')
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
    if (this.correctAnswerFound || elem.classList.contains('wrong')) {
      return
    }
    // check right or wrong
    // add classes
    // play sound
    if (index === this.currentAnswerIndex) {
      const succesAudio = new Audio('assets/sound/success-sound.mp3')
      succesAudio.play()
      this.renderTopPayer(true)
      elem.classList.add('correct')
      this.nextBtn.classList.add('active')
      this.correctAnswerFound = true
      this.count = this.currentMaxScore - this.wrongAnswersCount
      // this.score.innerText = count 
      const score = document.querySelector('.score-point')
      score.innerHTML = this.count

    } else {
      const failAudio = new Audio('assets/sound/failure-sound.mp3');
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
    if (this.currentSectionIndex >= this.sectionsData.length - 1) {
      this.showResultPage()
      return
    }
    this.currentSectionIndex += 1
    this.currentAnswerIndex = Math.floor(Math.random() * 6);
    this.updateCurrentMaxScore()
    // localStorage.setItem('currentGame', JSON.stringify({"currentSectionIndex": this.currentSectionIndex, "currentAnswerIndex": this.currentAnswerIndex, "score": this.count}))
    this.addAnswers(this.currentSectionIndex)
    this.renderTopPayer(false)
    this.correctAnswerFound = false
    this.paginationSection.children[this.currentSectionIndex].classList.add('active')
    this.paginationSection.children[this.currentSectionIndex - 1].classList.remove('active')

  }

  showResultPage() {
    this.mainEl.classList.add('end-game')
    this.resultEl.classList.add('show-result')
    const resultTextEls = this.resultEl.querySelectorAll('.result__text')
    const resultCount = this.resultEl.querySelector('.score__result')
    resultCount.innerHTML = this.count
    if (this.count === 30) {
      resultTextEls[0].style.display = ''
      resultTextEls[1].style.display = 'none'
    } else {
      resultTextEls[0].style.display = 'none'
      resultTextEls[1].style.display = ''
    }

  }



}
