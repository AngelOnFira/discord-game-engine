import { deno_engine } from "../engine/core/game_loop.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts"

Deno.test("Test game loop", async () => {
  await deno_engine(load, game_loop).then(function (e) {
    assertEquals(e, "Loop Exited")
  })
})

function load(game_state: any) {
  game_state.counter = 0
}

function game_loop(game_state: any) {
  game_state.counter += 1
  if (game_state.counter == 5) {
    game_state.end_game = true
  }
}

deno_engine(load, game_loop)
