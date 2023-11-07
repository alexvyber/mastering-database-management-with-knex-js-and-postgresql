import { knex } from "./config/knex"

// Authors

export async function getAuthors(limit = 10, offset = 0) {
  const authors = await knex("authors")
    .limit(limit)
    .offset(offset)
    .select("id")
    .orderBy("id", "asc")

  return authors
}

export async function getAuthorById(id: number) {
  const author = await knex("authors").where({ id }).first()

  return author
}

export async function createAuthor(data: any) {
  return (await knex("authors").insert(data, ["name", "id"]))[0]
}

export async function updateAuthor(id: number, data: any) {
  const author = await exists("authors", id)
  if (author[0] === ":error") return false

  const values = await knex("authors").where({ id }).update(data, "*")

  return values[0]
}

export async function deleteAuthor(id: number) {
  const author = await exists("authors", id)
  if (author[0] === ":error") return [":error", "no author with provided id"]

  const booksCount = (await knex("books").where({ author_id: id }).count().first())?.count

  if (booksCount && Number(booksCount) > 0) return [":error", "The author has books"]

  const values = await knex("authors").where({ id }).delete("*")

  return [":ok", values[0]]
}

// Books
export async function getBooks(limit = 10, offset = 0) {
  const authors = await knex("books")
    .limit(limit)
    .offset(offset)
    .select("id", "price", "title")
    .orderBy("price", "desc")

  return authors
}

export async function getBookById(id: number) {
  const book = await knex("books").where("id", "=", id).first()

  return book
}

async function exists(
  uid: "authors" | "books" | "genres",
  id: number | undefined
): Promise<[":error" | ":ok", any]> {
  if (typeof id === "undefined") return [":error", "No id provided"]

  const entry = await knex(uid).where({ id }).first()

  if (!entry) return [":error", `No entry ${uid} found`]

  return [":ok", entry]
}

export async function createBook(data: any) {
  const author = await exists("authors", data.author_id)
  if (author[0] === ":error") return false

  const genre = await exists("genres", data.genre_id)
  if (genre[0] === ":error") return false

  return [":ok", (await knex("books").insert(data, ["title", "id"]))[0]]
}

export async function updateBook(data: any) {
  if (data.author_id) {
    const author = await exists("authors", data.author_id)
    if (author[0] === ":error") return false
  }

  if (data.genre_id) {
    const genre = await exists("genres", data.genre_id)
    if (genre[0] === ":error") return false
  }

  return [":ok", (await knex("books").insert(data, ["title", "id"]))[0]]
}
