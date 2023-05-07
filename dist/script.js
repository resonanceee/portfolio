const subtitle = document.getElementsByClassName("card-subtitle")[0];

const createWord = (text, index) => {
  const word = document.createElement("span");
  
  word.innerHTML = `${text} `;
  
  word.classList.add("card-subtitle-word");
  
  word.style.transitionDelay = `${index * 40}ms`;
  
  return word;
}

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSubtitle = text => text.split(" ").map(addWord);

createSubtitle("Anarchy.bz è un server anarchy di Minecraft dove non esistono regole e dove ogni giocatore può fare ciò che vuole, come utilizzare client modificati, distruggere le basi degli altri giocatori e tentare di hackerare il server stesso. Potrai accedere al server a partire dal venerdì 12 maggio e l'indirizzo IP per accedervi è anarchy.bz. Ti preghiamo di attendere, stiamo lavorando sugli ultimi dettagli del server per darvi un'esperienza impeccabile.");