/* small, useful functions for small tasks */

export function drawStatusText(ctx, input, player) {
  ctx.font = '30px Helvetica, cursive'
  ctx.fillText('Last Input: ' + input.lastKey, 20, 50)
  ctx.fillText('Active State: ' + player.currentState.state, 20, 90)
}