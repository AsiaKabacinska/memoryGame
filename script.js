const cardsColor = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "brown",
  "brown",
  "yellow",
  "yellow",
  "gray",
  "gray",
  "cadetblue",
  "cadetblue",
  "violet",
  "violet",
  "lightgreen",
  "lightgreen",
];

let cards = document.querySelectorAll("div");

cards = [...cards]; //zamiana na tablice z nodelist - mamy 18 divow

// const startTime = newDate().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2; //9
let gameResult = 0;

const clickCard = function () {
  activeCard = this;
  if (activeCard == activeCards[0]) return;

  activeCard.classList.remove("hidden");
  //czy to pirewsze klikniecie
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    console.log("1");
    return; //zakoncz funkcje
  } else {
    console.log("2");
    //czy to drugie klikniecie - jesli drugie to zablokowanie na czas klikniecia zeby nie mozna bylo dalej klikac
    cards.forEach((card) => {
      card.removeEventListener("click", clickCard); // blokujemy klikniecie
      activeCards[1] = activeCard;
      console.log(activeCards);
      setTimeout(function () {
        if (activeCards[0].className === activeCards[1].className) {
          console.log("wygrana");
          activeCards.forEach((card) => card.classList.add("off"));
          gameResult++;
          cards = cards.filter((card) => !card.classList.contains("off"));
          if (gameResult == gamePairs) {
            // const endTime = newDate().getTime();
            // const gameTime = (endTime - startTime) / 1000;
            alert(`Udało się ! `);
            location.reload; //ta metoda odswieza nam strone
          }
        } else {
          console.log("przegrana");
          activeCards.forEach((card) => card.classList.add("hidden"));
        }
        //chcemy zeby zmienna przechowujaca ostatnie klikniecie byla pusta
        activeCard = "";
        activeCards.length = 0; //reset dwoch el.do stanu wyjsciowego

        cards.forEach((card) => card.addEventListener("click", clickCard)); //dzieki temu pozemu klikac ponownie
      }, 1000);
    });
  }
};

const init = function () {
  cards.forEach((card) => {
    const position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position]);
    cardsColor.splice(position, 1);
    //usun mi element od position 1 element - cyfra mowi ile elemnetow usunac
  });
  setTimeout(function () {
    cards.forEach((card) => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 2000);
};

init();
