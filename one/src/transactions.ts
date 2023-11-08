import { knex } from "./config/knex"
import { generateAuthor, generateBook } from "./lib"

export async function createAuthorWithBook() {
  try {
    return await knex.transaction(async trx => {
      const author = (await trx("authors").insert(generateAuthor(), "*"))[0]

      const book = (
        await trx("books").insert(
          generateBook({
            author_id: author.id,
            genre_id: Math.floor(Math.random() * 15),
          }),
          "*"
        )
      )[0]

      return { author, book }
    })
  } catch (error) {
    console.error("🚀 ~ createAuthorWithBook ~ error:", error)
  }
}
