const kamera = document.getElementById("kamera")
const hammer = document.getElementById("hammer")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")
const startScreen = document.getElementById("startScreen")

let gameLoopInterval = 0

const startGame = () => {
  gameOver.style.display = "none";
  hintergrund.classList.add("bg-animation")
  hammer.classList.add("hammer-animation")
  startScreen.style.display = "none"
  resetScore()
  startGameLoop()
}



const resetScore = () => {
  score.innerText = 0
}

const jump = () => {
  kamera.classList.add("jump-animation")
  setTimeout(() => {
    kamera.classList.remove("jump-animation")
  }, 500)
}

const dieAnimation = () => {
  kamera.classList.add("kamera-dies")
  return new Promise(resolve => setTimeout(() => {
    kamera.classList.remove("kamera-dies")
    resolve()
  }, 500));

}

document.addEventListener('click', (event) => {
  if (!gameLoopInterval) {
    startGame()
  }
  else {
    if (!kamera.classList.contains('jump-animation')) {
      jump()
    }
  }

})

const stopGame = async () => {
  await dieAnimation()
  const scoreNumber = Number(score.innerText)
  const highscoreNumber = Number(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
    gameOver.style.display = "block";
  }
  hintergrund.classList.remove("bg-animation")
  hammer.classList.remove("hammer-animation")
  startScreen.style.display = "block"
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(kamera)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(hammer)
      .getPropertyValue('left'))

    score.innerText = Number(score.innerText) + 1

    if (rockLeft < 0) {
      hammer.style.display = 'none'
    } else {
      hammer.style.display = ''
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame()
    }
  }, 50)

}
