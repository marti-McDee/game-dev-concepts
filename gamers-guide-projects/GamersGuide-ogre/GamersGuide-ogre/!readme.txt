Ogre!

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

Description: Ogre is a simple arcade game where the goal is to lob a rock at the ogre before it 
walks across the play field. 

Demonstrates: CSS sprite sheet animation (ogre walking), object following over an SVG path; animation 
via both timer and requestAnimationFrame methods; randomized selection of SVG paths (1 of 5); totalizing 
and score display; collision object detection.

To play: Click anywhere on the game board to hurl a rock at the oncoming ogre. The game randomly selects
a rock path, and rock speed. Only one rock may be thrown at a time. If the rock strikes the ogre,
the player scores a hit. If the ogre gets too close for a rock to hit it, that ogre disappears and 
is replaced by another that begins its journey across the game board. The game ends after five ogres
have been dispatched.

