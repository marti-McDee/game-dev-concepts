// Algo 2 for detection of collision between circles
const circle1 = { x: 10, y: 10, radius: 300 }
const circle2 = { x: 500, y: 500, radius: 150 }

/* If distance between two center points of circles is:

MORE THAN circle1.radius + circle2.radius - we know they CAN'T COLLIDE, if distance is
SAME - we know they touch, and if the distance is 
SMALLER than circle1.radius + circle2.radius - we know the circles OVERLAP - THEY COLLIDE */

// calculate the distance as the hypotenuse of an imaginary triangle

// these 2 sides from the right angle of triangle
let dx = circle2.x - circle1.x
let dy = circle2.y - circle1.y
let distance = Math.sqrt(dx * dx + dy * dy)
let sumOfRadii = circle1.radius + circle2.radius

if (distance < sumOfRadii) {
  // circles collide
} else if (distance === sumOfRadii) {
  // circles are touching
} else if (distance > sumOfRadii) {
  // no collision
}