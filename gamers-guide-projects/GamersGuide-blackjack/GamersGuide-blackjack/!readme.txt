Ghoul’s Blackjack

This is a bonus game example from the book  _The Gamer's Guide to Coding_. All code is open source and provided 
under the Creative Commons 4.0 Sharealike license. See https://creativecommons.org/licenses/by-sa/4.0/ 
for more information. Some games may require additional third-party open source libraries; they are provided with 
their own license.

Bonus games are primarily designed as a teaching tool rather than as ready-to-go commercial games. They are 
functional examples of creating 2D games using bitmap graphics, so you can easily change and update them. The latest
version of Google Chrome is recommended as the development platform. All code and art is included. Consider them 
as springboards for your own unique creations. Refer to comments in the code.

Level: 2
Supported Interface: mouse, touchscreen

Description: Ghoul’s Blackjack is a simplified blackjack card game, where the user plays against the dealer. 
The dealer (computer) uses conditional tests that follow general “Vegas blackjack” rules: deal to 17, stand 
on 17 or above. The game keeps score as the cards are dealt. Numbered cards take their numeric value; face 
cards are 10, and aces are either 1 or 11, depending on the overall score. The player closest to 21, without 
going over, wins.

Demonstrates: using CSS to derive all 52 cards from a single graphic (using object-position style property); 
use of array to hold a deck of cards; shuffling of array elements; card scoring; external font (font displayed 
without installing it to the computer); full graphic play board background.

To play: Begin a new game by clicking the New Game button. Click Hit Me to deal another card, or Stand to 
call the game. The player’s score is shown, but the dealer’s score (plus dealer’s hole card) are hidden 
until the game comes to an end. To limit coding complexity, each game plays no more than 12 cards. 
More advanced blackjack rules such as splits and so-called "natural" blackjack (ace and face card 
in first two cards dealt) are not implemented.

