// This file is meant to show how you can create multiple commands in the same file if you wish.
import { Message } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/structures/message.ts"
import { botCache } from "../../../mod.ts"
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/handlers/channel.ts"
import { editMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/handlers/message.ts"
import { cache } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/utils/cache.ts"

const pingCommand = async (message: Message) => {
  console.log(message.channel.name)
  let test = sendMessage(message.channel, "`⬜`")
  test.then(function (message) {
    ;(async function displayLoop(i: any, original: any) {
      setTimeout(function () {
        let progress = "`"
        for (var j = 0; j < original - i; j++) {
          progress += "⬜"
        }
        progress += "`"
        editMessage(message, progress)

        if (--i) displayLoop(i, original)
      }, 1000)
    })(50, 50)
  })

  return sendMessage(message.channel, `Ping MS: ${Date.now() - message.timestamp}ms`)
}

botCache.commands.set(`p`, {
  callback: pingCommand,
})

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
