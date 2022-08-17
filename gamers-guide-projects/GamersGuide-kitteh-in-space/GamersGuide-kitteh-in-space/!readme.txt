Kitteh in Space

This is a bonus game example from the book  _The Gamer's Guide to Coding_. All code is open source and provided 
under the Creative Commons 4.0 Sharealike license. See https://creativecommons.org/licenses/by-sa/4.0/ 
for more information. Some games may require additional third-party open source libraries; they are provided with 
their own license.

Bonus games are primarily designed as a teaching tool rather than as ready-to-go commercial games. They are 
functional examples of creating 2D games using bitmap graphics, so you can easily change and update them. The latest
version of Google Chrome is recommended as the development platform. All code and art is included. Consider them 
as springboards for your own unique creations. Refer to comments in the code.

Level: 3
Supported Interface: mouse only, keyboard

Description: Kitteh in Space is a “side scroller” arcade game, where a black-and-white tuxedo LOLcat 
flies a space ship and tries to navigate through a cluttered asteroid belt. The object of the game 
is to avoid getting hit by the rocks, paint cans, and paint brushes that might damage Kitteh’s new 
space ship. If struck by these objects, the body of the ship changes color. To reverse the damage, 
allow the ship to be struck by a water balloon. At the end of play, the ship should be blemish-free 
and showroom silver.

Demonstrates: Uses a wide graphic for the scrolling background; background is animated in a kind of 
“player roll,” with a repeat once every 130 seconds; CSS animation when an object explodes against 
Kitteh’s space ship; background sound effects (ship hover); synchronized sound effects of object 
collisions; collision object detection; overlapped graphics; objects that follow SVG paths; animation 
via requestAnimationFrame method; randomized selection of SVG paths (1 of 10); randomized selection 
of objects (1 of 18); user-defined objects; control of element visibility; score display; pause/unpause 
of game; timed play; initial splash screen; pop-up help screen.

To play: At the splash screen click the “U Clik to Plai” button (Kitteh can’t spell.) Destroy obstacles 
by shooting at them (click the mouse to fire a laser cannon). Or move the mouse up and down to steer 
the ship around obstacles. If a rock, paint can, or paint brush strikes the ship, it will cause damage 
that can only be undone by subsequently colliding with a water balloon. There are four damage levels; 
each level changes the appearance of the ship. Each strike of a water balloon undoes one damage level.

