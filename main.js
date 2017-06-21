const facts = [
	{
		fact: 'Earth is the only planet with life on it (that we know of).',
		photo: 'http://apod.nasa.gov/apod/image/1112/IMG_1552ribeiro900.jpg',
	},
	{
		fact: 'Mercury, Venus, Earth, Mars, and Jupiter have no rings.',
		photo: 'http://apod.nasa.gov/apod/image/1112/zagorje-2Boris900.jpg',
	},
	{
		fact: 'Saturn has the brightest rings.',
		photo: 'http://apod.nasa.gov/apod/image/1112/aurora2_salomonsen_900h.jpg',
	},
	{
		fact: 'Uranus and Neptune have rings, but they are dim.',
		photo: 'http://apod.nasa.gov/apod/image/1112/sh2_239block900c.jpg',
	},
]

const screenBg = document.querySelector('.screen-bg')
const card = document.querySelector('.card')
const cardText = document.querySelector('.card__text')

const animateBackground = (element, direction, callback) => {

	const keyframes = {
		transform: [1, 1.5].map(n => `scale(${n})`),
		opacity: ['0', '1'],
	}

	const options = {
		duration: direction === 'in' ? 400 : 400,
		fill: "forwards",
		easing: "cubic-bezier(.2, .3, .4, 1)",
		direction: direction === 'in' ? 'normal' : 'reverse',
	}

	const animation = element.animate(keyframes, options)

	if(callback) animation.addEventListener("finish", callback, {once: true})
}

const animateCard = (element, direction, callback) => {

	const transformValues =
		direction == 'left' ? [0, -110] : [110, 0]

	const keyframes = {
		transform: transformValues.map(n => `translateX(${n}%)`),
		opacity: ['0', '1'],
	}

	const options = {
		duration: 400,
		fill: "forwards",
		easing: "cubic-bezier(.2, 1, .2, 1)",
	}

	const animation = element.animate(keyframes, options)
	window.ra = animation
	if(callback) animation.addEventListener("finish", callback, {once: true})
}

const setActive = (fact) => {
	animateCard(card, 'left', () => {
		card.style.backgroundImage = `url(${fact.photo})`
		cardText.textContent = fact.fact
		animateCard(card, 'right')
	})

	animateBackground(screenBg, 'out', () => {
		screenBg.style.backgroundImage = `url(${fact.photo})`
		animateBackground(screenBg, 'in')
	})
}


let activeFact = 0
setActive(facts[activeFact])

setInterval(() => {
	activeFact = activeFact + 1
	if(activeFact === facts.length) activeFact = 0
	const fact = facts[activeFact]
	setActive(fact)
}, 4000)
