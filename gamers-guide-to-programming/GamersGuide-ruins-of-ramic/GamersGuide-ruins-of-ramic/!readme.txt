The Ruins of Ramic

This is a bonus game example from the book  _The Gamer's Guide to Coding_. All code is open source and provided 
under the Creative Commons 4.0 Sharealike license. See https://creativecommons.org/licenses/by-sa/4.0/ 
for more information. Some games may require additional third-party open source libraries; they are provided with 
their own license.

Bonus games are primarily designed as a teaching tool rather than as ready-to-go commercial games. They are 
functional examples of creating 2D games using bitmap graphics, so you can easily change and update them. The latest
version of Google Chrome is recommended as the development platform. All code and art is included. Consider them 
as springboards for your own unique creations. Refer to comments in the code.

Level: 3
Supported Interface: mouse, touchscreen

Click on any two cards to match them up. You score with each match.

ruins-of-ramic-lesson-1 – Basic shell of game only. Clicking on a card displays an alert box, showing the 
JavaScript ID name of the card that was clicked.

ruins-of-ramic-lesson-2 – Basic play: initial splash screen; New Game button starts; clicking on cards 
“turns them over” to display face. Click on any card to turn displayed cards back over. When any two cards 
match, those cards are hidden.

ruins-of-ramic-lesson-3 – As above, but using the addEventListener method to listen for click events 
(rather than using the onclick attribute with each card).

ruins-of-ramic-lesson-4 – As above, but now with self-timed splash screen that fades out when other page 
elements are loaded. Separate popup help screen is activated by clicking the Help button.  CSS transition 
added to transform rotate the card when it’s clicked. Unmatched cards automatically turn back over 
after short delay.

ruins-of-ramic-lesson-5 – Full lesson with all features, with added sound effects for card match. 
CSS transform rotation transition when dealing out the cards.