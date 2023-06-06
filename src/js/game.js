const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')


let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        num: 0,
        question: "Quel est le nom de la larve du papillon ?",
        choice1: "Tentrhède",
        choice2: "Nymphite",
        choice3: "Chenille",
        choice4: "Ver",
        answer: 3,
    },
    {
        num: 1,
        question: "À quelle famille appartiennent les bourdons ?",
        choice1: "Apidés (Apidae)",
        choice2: "Meliponini",
        choice3: "Xylocopinae",
        choice4: "Insectes",
        answer: 1,
    },
    {
        num: 2,
        question: "Quel genre de fourmis soignent les chenilles des papillons du genre Phengaris ?",
        choice1: "Ectatommini",
        choice2: "Probolomyrmecini",
        choice3: "Dolichoderus",
        choice4: "Myrmica",
        answer: 4,
    },
    {
        num: 3,
        question: "Comment reconnaît-on un frelon Européen ?",
        choice1: "Il est plus petit que le frelon Asiatique",
        choice2: "Il a des couleurs rougeatre",
        choice3: "Il ressemble à une grosse mouche",
        choice4: "Car il parle français",
        answer: 2,
    },
    {
        num: 4,
        question: "Combien de pucerons mange en moyenne une larve de Coccinelle, par jour ?",
        choice1: "+/- 50",
        choice2: "+/- 500",
        choice3: "+/- 150",
        choice4: "+/- 15",
        answer: 3,
    },
    {
        num: 5,
        question: "Quel insecte de la famille des Cynipidés provoque la formation de galles sur les feuilles de l'Érable sycomore ?",
        choice1: "Pediaspis aceris",
        choice2: "Dichatomus acerinus",
        choice3: "Cécidomyie du Hêtre",
        choice4: "Car il parle français",
        answer: 1,
    },
    {
        num: 6,
        question: 'Que mange principalement la chenille du papillon "Livrée des arbres" ?',
        choice1: "Aubépines, pruneliers, charme, chênes, saules, peupliers, bouleaux, tilleuds, arbres fruitiers",
        choice2: "Les jeunes tiges des de n'importe quel arbre",
        choice3: "Les fruits bien sucrés",
        choice4: "Uniquement les feuilles des arbres fruitier",
        answer: 1,
    },
    {
        num: 7,
        question: "Où retrouve-t'on principalement le Pholidoptère Cendrée ?",
        choice1: "USA",
        choice2: "Afrique du Sud",
        choice3: "Asie centrale",
        choice4: "En Europe (sauf péninsule Ibérique et îles Méditérranéennes)",
        answer: 4,
    },
    {
        num: 8,
        question: "Quel est la maladie la plus connue que peut transmettre le Tique du mouton, à l'être humain ?",
        choice1: "Rhume des foins",
        choice2: "Galle",
        choice3: "Maladie de Lyme",
        choice4: "Encéphalite virale ovine",
        answer: 3,
    },
    {
        num: 9,
        question: "Combien de mues la larve de la Mouche de Mai (ephemera danica) effectue avant de parvenir à son stage de subimago ?",
        choice1: "5",
        choice2: "32",
        choice3: "13",
        choice4: "35",
        answer: 2,
    },
    {
        num: 10,
        question: 'Quel est le "surnom" des larves de Tentrhèdes ?',
        choice1: "Fausse chenille",
        choice2: "Tenthrènidium",
        choice3: "Ver vert aérien",
        choice4: "42, c'est toujours 42",
        answer: 1,
    },
]


// CONSTANTS
const CORRECT_BONUS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [ ... questions]
    console.log(availableQuestions)
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        // go to the end page
        return window.location.assign("https://gobelynn.github.io/dexinsect/end.html")
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
    // update progressbar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`


    // random question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            if(classToApply === 'correct'){
                incrementScore(CORRECT_BONUS)
            }
        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
