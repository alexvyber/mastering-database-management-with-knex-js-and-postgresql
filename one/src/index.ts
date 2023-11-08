// ensure env variables
import "../env"

import { onDBConnect, knex } from "./config/knex"
import {
  createAuthor,
  createBook,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  getAuthorsWithBooksCount,
  getBookById,
  getBooks,
  getBooksWithAuthorAndGenre,
  updateAuthor,
} from "./crud"
import { generateAuthor, generateBook } from "./lib"
import { createAuthorWithBook } from "./transactions"

// onDBConnect()
//   .then(() => console.log("success"))
//   .catch(e => console.error(e))

async function main() {
  await onDBConnect()

  // const authors = await getAuthors()
  // const books = await getBooks()

  // const existingAuthor = await getAuthorById(50)
  // const nonExistingAuthor = await getAuthorById(150)

  // const existingBook = await getBookById(50)
  // const nonExistingBook = await getBookById(1500)

  // const author = await createAuthor(generateAuthor())

  // const book = await createBook(
  //   generateBook({
  //     author_id: Math.floor(Math.random() * 150),
  //     genre_id: Math.floor(Math.random() * 15),
  //   })
  // )

  // const one = await createAuthor(generateAuthor())
  // const two = await updateAuthor(one.id, { name: "Some Shit" + Math.random() })
  // const three = await deleteAuthor(one.id)
  // console.log({ one, two, three })

  // const del = await deleteAuthor(Math.floor(Math.random() * 150) + 1)

  // const joinedBooks = await getBooksWithAuthorAndGenre()

  // const authorsWithBooksCount = await getAuthorsWithBooksCount()

  const inserts = await createAuthorWithBook()
  console.log("🚀 ~ main ~ inserts:", inserts)

  process.exit()
}

main()
