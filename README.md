# Five-Card Draw

Five-Card Draw is a web version of Video Poker with no money involved. While a player can choose to aim for a high score, the game itself is just for fun with no real stakes.

## Instructions

The DEAL NEW button deals the user a new hand of cards. After it is selected, five HOLD buttons appear that allow the user to keep the card above each button in their hand. The DEAL button then replaces each card not held with a new card and displays the user's final winnings for the hand. Between hands, a form appears that allows the user to set the amount that they want to bet.

## How It Works

The application waits for the user to press the DEAL NEW button using `document.querySelector("#deal").onclick`. This first empties the user's initial hand, final hand, and cards held and calls a `function` named `dh()` that deals a new hand by generating random integers using `Math.floor(Math.random())` to create a new rank and suite for each card. `dh()` also makes sure that no cards have the same rank and suite combination. The functions `dth()` and `rank()` are then called to display and rank the hand, respectively. `rank()` calls another `function` named `rankdisp()` to display the hand rank at the top left corner. Finally, the user's stats are updated, the HOLD buttons appear, and the DEAL NEW button changes to the DEAL button by `document.querySelector("#deal").innerHTML = "DEAL";`.

The HOLD buttons call a `function` named `hold()` to change the numbers in the array `holdcards`, which is initially set to `[0, 0, 0, 0, 0]`, indicating that no cards are held yet. When one of the buttons is pressed, it becomes black and changes the corresponding number in the array to `1` to represent that a card is now being held. If the user changes their mind, the HOLD buttons can be pressed again to revert them to their original color and set the corresponding number in `holdcards` back to `0`.

When the DEAL button (which was formally the DEAL NEW button) is selected, it also calls `dh()` to deal the final hand by copying cards held from the initial hand and generating new cards (which are then compared against cards in both the initial and final hands to prevent any repeats) for those that weren't held. `dth()` and `rank()` are called again to display the final hand and its rank. This time, `rankdisp()` (called by `rank()`) displays the amount which the user has won or lost in addition to the hand rank. The stats are updated again, and the DEAL button reverts back to the DEAL NEW button so that the user can start a new hand.

Between hands, the user can change their bet by typing any number greater than zero in the number input and selecting the Set Bet submit input. This calls a `function` named `setbet()` that changes the user's current bet and displays it in the user's stats. Additionally, `setbet()` also calls `rankdisp()` to update the numbers in the hand winnings list at the bottom of the page.

## Languages Used

* HTML
* CSS
* JavaScript