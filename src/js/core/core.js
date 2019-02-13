import forEach from 'lodash/each'

/*
  Return the value of the card.
  First it checks if the length of text on the card is 2.
    If it is 2 then it checks the first character.
    If it is numeric then it returns the value.
    If it isn't then it checks if it is an A, J, Q, K and returns the corresponding value.
  If the length is 3 then it must be a 10, it returns the value 10.
*/
export const getCardValue = (card) => {
  if(card.length === 2) {
    const v = card.charAt(0);
    if(!isNaN(v)) {
      return Number(v);
    } else {
      switch(v) {
        case 'A':
          return 11
        case 'J':
        case 'Q':
        case 'K':
          return 10;
        default:
          return 0
      }
    }
  } else {
    return 10;
  }
}

/*
  This function returns the value of the deck by summing up the values.
*/
export const getScore = (deck) => {
  let score = 0;
  forEach(deck, (card) => {
    score = score + getCardValue(card);
  });
  return score
}

/*
  This function return the highest card from the deck.
*/
export const getSingleCardHighestValue = (deck) => {
  let highest = 0;
  let highestCard = '';
  forEach(deck, (card) => {
    const value = getCardValue(card)
    if(value > highest) {
      highest = value
      highestCard = card;
    } else if(value == highest) {
      if (value == 10) {
        const v1 = getHighest10(card);
        const v2 = getHighest10(highestCard);
        if (v1 > v2) {
          highest = value
          highestCard = card;
        }
      }
    }
  });
  return highestCard;
}

/*
  This function return the highest card from the deck.
  It caters for the scenario whereby the highest value might be the same and the only difference is the suite.
*/
export const getSingleCardHighestSuiteValue = (deck) => {
  let highest = 0;
  let highestCard = '';
  forEach(deck, (card) => {
    const value = getCardValue(card)
    if(value > highest) {
      highest = value
      highestCard = card;
    } else if(value == highest) {
      let found = false;
      if (value == 10) {
        const v1 = getHighest10(card);
        const v2 = getHighest10(highestCard);
        if (v1 > v2) {
          highest = value
          highestCard = card;
          found = true;
        }
      }
      if (!found) {
        const sv1 = getSuiteValue(card);
        const sv2 = getSuiteValue(highestCard);
        if (sv1 > sv2) {
          highest = value;
          highestCard = card;
        }
      }
    }
  });
  return highestCard;
}

export const getHighest10 = (card) => {
  if(card.length === 3) {
    return 1;
  }
  switch (card.charAt(0)) {
    case 'K':
      return 4
    case 'Q':
      return 3
    case 'J':
      return 2
    default:
      return 0
  }
  return 0
}
/*
  Given a card, this function would return the value of the suite.
  The suites are assigned values as follows
    s = 4, H = 3, C = 2, D = 1
*/
export const getSuiteValue = (card) => {
  const suite = card.charAt(card.length - 1);
  switch(suite) {
    case 'S':
      return 4
    case 'H':
      return 3
    case 'C':
      return 2
    case 'D':
      return 1
    default:
      return 0
  }
  return 0
}


export const getWinner = (deckA, deckB) => {
  const playerA = getScore(deckA);
  const playerB = getScore(deckB);

  // we have a winner
  if(playerA != playerB) {
    if (playerA > 21 && playerB <= 21) {
      return false
    } else if (playerA <= 21 && playerB > 21) {
      return true
    }
    return playerA > playerB ? true : false
  }


  let check = true
  let tempDeckA = deckA
  let tempDeckB = deckB
  let highestA = ''
  let highestB = ''
  while(check) {
    tempDeckA = tempDeckA.filter(c => {
      return c != highestA
    })
    tempDeckB = tempDeckB.filter(c => {
      return c != highestB
    })
    if(tempDeckA.length === 0 || tempDeckB.length == 0) {
      check = false;
    } else {
      highestA = getSingleCardHighestValue(tempDeckA)
      highestB = getSingleCardHighestValue(tempDeckB)
      const valueA = getCardValue(highestA);
      const valueB = getCardValue(highestB);
      if(valueA != valueB) {
        check = false;
        return valueA > valueB ? true : false
      } else if(valueA === 10 && valueB === 10) {
        const highest10A = getHighest10(highestA);
        const highest10B = getHighest10(highestB);
        if(highest10A != highest10B) { // we have a winner
          check = false;
          return highest10A > highest10B ? true : false
        }
      }
    }
  }

  highestA = getSingleCardHighestSuiteValue(deckA)
  highestB = getSingleCardHighestSuiteValue(deckB)

  const suiteA = getSuiteValue(highestA);
  const suiteB = getSuiteValue(highestB);

  return suiteA > suiteB ? true : false;

}
