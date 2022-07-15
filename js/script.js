// Music
const menuMusic = document.getElementById('music__menu')
const loseMusic = document.getElementById('music__lose')
const wonMusic = document.getElementById('music__won')
const gameMusic = document.getElementById('music__match')

const btnMusicPlay = document.querySelector('.audio__mute--true')
const btnMusicStop = document.querySelector('.audio__mute--false')

menuMusic.volume = .1
loseMusic.volume = .1
wonMusic.volume = .1
gameMusic.volume = .3

btnMusicPlay.addEventListener('click', function (){
    btnMusicStop.style.display = 'inline-block'
    btnMusicPlay.style.display = 'none'
    menuMusic.volume = .1
    loseMusic.volume = .1
    wonMusic.volume = .1
    gameMusic.volume = .3
})

btnMusicStop.addEventListener('click', function (){
    btnMusicPlay.style.display = 'inline-block'
    btnMusicStop.style.display = 'none'
    menuMusic.volume = 0
    loseMusic.volume = 0
    wonMusic.volume = 0
    gameMusic.volume = 0
})

// Intro & Rules
const introStart = document.querySelector('.intro')
const rulesStart = document.querySelector('.rules')
const btnStart = document.querySelector('.btn__start')
const papyrusPerson = document.querySelector('.person__papyrus')
const papyrusIntroDiolog = document.querySelector('.papyrus__intro')

btnStart.addEventListener('click', function (){
    menuMusic.play()
    menuMusic.muted=false
    introStart.classList.add('active')
    rulesStart.classList.add('active')
    papyrusIntroDiolog.innerHTML = 'Ты знаешь правила?'
})

//  Rules & Information & Level
const btnRulesTrue = document.querySelectorAll('.btn__rules--true')
const btnRulesFalse = document.querySelector('.btn__rules--false')
const rulesInformation = document.querySelector('.information')
const chooseLevel = document.querySelector('.choose__level')

btnRulesFalse.addEventListener('click', function (){
    rulesStart.classList.remove('active')
    rulesInformation.classList.add('active')
    papyrusIntroDiolog.innerHTML = 'Так ознакомься с ними'
})

btnRulesTrue.forEach(element => {
    element.addEventListener('click', function (){
        rulesStart.classList.remove('active')
        rulesInformation.classList.remove('active')
        chooseLevel.classList.add('active')
        papyrusIntroDiolog.innerHTML = 'Отлично, а теперь выбери уровень!'
    })
})


//Choose level & Game
const currentLevels = document.querySelectorAll('.btn__choose--level')
const chooseLevelInfo = document.querySelector('.choose__level--start')
const valueTry = document.querySelector('.counter__try')
const maxValue = document.querySelectorAll('.max__value')
const wrapper = document.querySelector('.wrapper')
const enemy = document.querySelector('.enemy')
const btnStartGame = document.querySelector('.btn__start--level')

//Start Game
const gameSection = document.querySelector('.game')

btnStartGame.addEventListener('click', function (){
    menuMusic.muted=true

    //Обнуление
    wrapper.style.display = 'none'
    chooseLevel.classList.remove('active')
    chooseLevelInfo.classList.remove('active')
    papyrusPerson.style.display = 'none'
    papyrusIntroDiolog.style.display = 'none'

    gameSection.classList.add('active')

    setTimeout(function (){
        gameMusic.play()
        wrapper.style.display = 'block'
    }, 1000)
})

//Logic Game
const valueHitPoint = document.querySelector('.hp__value')
const recordValue = document.querySelector('.record__current')
const btnSend = document.querySelector('.btn__send')
const popUp = document.querySelector('.popup')
const resultBattle = document.querySelector('.result__battle')
const btnReloadGame = document.querySelector('.btn__reload')

let maxRange = 0,
    counterTry = 0,
    userValue = document.querySelector('.user__value--input'),
    counterUserInt = '',
    coorDinates = document.querySelector('.coordinate'),
    plusOrMinus = document.querySelector('.coordinate--help'),
    coldOrHot = document.querySelector('.coordinate--warm');

function game() {
    currentLevels.forEach(element => {
        element.addEventListener('click', function () {
            if (element.innerHTML === 'Супер Легкий') {
                maxRange = 5
                counterTry = 3
                enemy.src = 'image/enemy-1.webp'
            }
            if (element.innerHTML === 'Легкий') {
                maxRange = 25
                counterTry = 5
                enemy.src = 'image/enemy-2.webp'
            }
            if (element.innerHTML === 'Средний') {
                maxRange = 1000
                counterTry = 10
                enemy.src = 'image/enemy-3.webp'
            }
            if (element.innerHTML === 'Сложный') {
                maxRange = 100000
                counterTry = 18
                enemy.src = 'image/enemy-4.webp'
            }
            if (element.innerHTML === 'Невозможный') {
                maxRange = 999999
                counterTry = 25
                enemy.src = 'image/enemy-5.webp'
            }
            let randomInt = Math.floor(Math.random() * maxRange)
            let averageCounter = Math.floor(maxRange / counterTry)

            valueTry.innerHTML = counterTry
            maxValue.forEach(element => {
                element.innerHTML = maxRange
            })
            valueHitPoint.innerHTML = counterTry
            chooseLevelInfo.classList.add('active')

            //Действия после нажатие кнопки Отправить
            btnSend.addEventListener('click', function () {
                counterUserInt = userValue.value

                //Проверка на корректность
                if (isNaN(Number(counterUserInt)) || counterUserInt > maxRange || counterUserInt < 0 || counterUserInt == '') {
                    coorDinates.classList.add('active')
                    plusOrMinus.innerHTML = 'Набранная вами значение не подходит!'
                    coldOrHot.style.display = 'none'
                    return ('Не подходит')
                }

                if (randomInt == counterUserInt) {
                    gameMusic.muted = true
                    wonMusic.play()
                    wonMusic.muted = false
                    resultBattle.innerHTML = 'выиграли'
                    popUp.classList.add('show')
                    enemy.classList.add('active')
                    if (recordValue.innerHTML < counterTry) {
                        recordValue.innerHTML = counterTry
                    }
                    btnReloadGame.addEventListener('click', function () {
                        popUp.classList.remove('show')
                    })
                    return ('win')
                }

                counterTry--
                valueHitPoint.innerHTML = counterTry
                coldOrHot.style.display = 'block'

                if (counterTry <= 0) {
                    gameMusic.muted = true
                    loseMusic.play()
                    loseMusic.muted = false
                    resultBattle.innerHTML = 'проиграли'
                    popUp.classList.add('show')
                    btnReloadGame.addEventListener('click', function () {
                        popUp.classList.remove('show')
                    })
                    return ('Вы проиграли')
                }

                if (randomInt > counterUserInt) {
                    coorDinates.classList.add('active')
                    plusOrMinus.innerHTML = 'Больше'
                    if (Number(counterUserInt) + averageCounter >= randomInt) {
                        coldOrHot.innerHTML = 'Горячо'
                    }
                    if (Number(counterUserInt) + averageCounter < randomInt) {
                        coldOrHot.innerHTML = 'Холодно'
                    }
                    return ('Больше')
                }

                if (randomInt < counterUserInt) {
                    coorDinates.classList.add('active')
                    plusOrMinus.innerHTML = 'Меньше'
                    if (Number(counterUserInt) - averageCounter <= randomInt) {
                        coldOrHot.innerHTML = 'Горячо'
                    }
                    if (Number(counterUserInt) - averageCounter > randomInt) {
                        coldOrHot.innerHTML = 'Холодно'
                    }
                    return ('Меньше')
                }
            })
        })
    })
}

game()

