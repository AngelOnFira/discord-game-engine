let current_time = () => new Date().valueOf()

/**
 *
 * @param ticks_per_second Number of game ticks each second
 * @param game_loop_callback Callback function for game loop
 */
export async function deno_engine(
  game_load_callback: (game_state: {}) => void,
  game_loop_callback: (game_state: {}) => void
) {
  let game_state = {
    end_game: false,
    ticks_per_second: 1,
  }

  game_load_callback(game_state)

  let tick_rate = (1 / game_state.ticks_per_second) * 1000
  let tick_delta = 0

  let game_promise = new Promise((resolve, reject) => {
    // Start the game loop
    let game_loop_interval = setInterval(() => {
      let start_tick_time = current_time()
      console.log(current_time())

      game_loop_callback(game_state)

      let tick_delta = current_time() - start_tick_time

      if (game_state.end_game === true) {
        clearInterval(game_loop_interval)
        resolve("Loop Exited")
      }
    }, tick_rate - tick_delta) // Wait for the length of the tick rate minus how long the last tick took
  })

  return game_promise
}
