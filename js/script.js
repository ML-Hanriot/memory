//création d'un tableau avec les 12 images de base
const cardsArray = [
	{
		name: "mouton",
		img: "img/1.jpg",
	},
	{
		name: "ane",
		img: "img/2.jpg",
	},
	{
		name: "taureau",
		img: "img/3.jpg",
	},
	{
		name: "coq",
		img: "img/4.jpg",
	},
	{
		name: "belier",
		img: "img/5.jpg",
	},
	{
		name: "dinde",
		img: "img/6.jpg",
	},
	{
		name: "canard",
		img: "img/7.jpg",
	},
	{
		name: "chat",
		img: "img/8.jpg",
	},
	{
		name: "mouton2",
		img: "img/9.jpg",
	},
	{
		name: "dindon",
		img: "img/10.jpg",
	},
	{
		name: "dinosaure1",
		img: "img/11.jpg",
	},
	{
		name: "dinosaure2",
		img: "img/12.jpg",
	},
];

// Création d'un tableau gamegrid avec les doublons des images précédentes
// .concat permet de doubler les images dans cardsArray
// .sort et la formule trient les éléments du tableau de manière aléatoire
const gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

// Variables utilisées plus tard
// 1ère carte retournée
let firstGuess = "";
// 2ème carte retournée
let secondGuess = "";
// en combien de couops ont été trouvés toutes les paires
let count = 0;
let previousTarget = null;
//temps se passant avant l'animation de remise des cartes faces cachées, ou qui disparaissent qand elles sont trouvées
let delay = 1200;

// Construction du plateau de jeu
// La div avec l'id game est stockée dans la constante game
const game = document.getElementById("game");
// Construction d'une section stockée dans la const grid
const grid = document.createElement("section");
//ajout de la class .grid  à la const grid
grid.setAttribute("class", "grid");
// la section devient enfant de la div game => gameGrid
game.appendChild(grid);

// Boucle foreach pour la création des cartes dans la section
// Pour chaque image (name, img du tableau)
gameGrid.forEach((item) => {
	// Extrait les 2 valeurs de chaque image
	const name = item.name;
	const img = item.img;
	// création de la div card qui va contenir les 2 faces d'une carte
	const card = document.createElement("div");
	//ajout de la .class card à cette nouvelle div
	card.classList.add("card");
	//on lui donne le name qui etait dans le tableau
	card.dataset.name = name;

	// création de la div qui contiendra la face front
	const front = document.createElement("div");
	//on lui ajoute la .class front
	front.classList.add("front");

	// création de la div qui contiendra la face back
	const back = document.createElement("div");
	// on lui donne la .class back
	back.classList.add("back");
	//ajoute une background image à la face back
	back.style.backgroundImage = `url(${img})`;
	// Intégration d'une carte (qui va contenir un front et un back)////////////////////////////////
	grid.appendChild(card);
	card.appendChild(front);
	card.appendChild(back);
});

// Fonction de check si les cartes ont été trouvées ou pas
const match = () => {
	//la fonction va chercher si la .class selected est trouvée quelque part
	const selected = document.querySelectorAll(".selected");
	//ajoute la .class match à toutes les cartes selectionnées
	selected.forEach((card) => {
		card.classList.add("match");
	});
};

// Ré initiallisation des cartes pour chercher une nouvelle paire
const resetGuesses = () => {
	firstGuess = "";
	secondGuess = "";
	count = 0;
	previousTarget = null;

	var selected = document.querySelectorAll(".selected");
	selected.forEach((card) => {
		card.classList.remove("selected");
	});
};

// 2coute de l'event click sur nos cards
grid.addEventListener("click", (event) => {
	const clicked = event.target;

	if (
		clicked.nodeName === "SECTION" ||
		clicked === previousTarget ||
		clicked.parentNode.classList.contains("selected") ||
		clicked.parentNode.classList.contains("match")
	) {
		return;
	}

	if (count < 2) {
		count++;
		if (count === 1) {
			firstGuess = clicked.parentNode.dataset.name;
			console.log(firstGuess);
			clicked.parentNode.classList.add("selected");
		} else {
			secondGuess = clicked.parentNode.dataset.name;
			console.log(secondGuess);
			clicked.parentNode.classList.add("selected");
		}

		if (firstGuess && secondGuess) {
			if (firstGuess === secondGuess) {
				setTimeout(match, delay);
			}
			setTimeout(resetGuesses, delay);
		}
		previousTarget = clicked;
	}
});
