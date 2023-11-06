import { Knex } from "knex"
import { faker } from "@faker-js/faker"
import { fromArray } from "../src/lib"

const COUNT = 100

const createBook = ({ author_id, genre_id }: Record<string, number>) => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(4),
  price: faker.number.int({ min: 30, max: 300 }),
  author_id,
  genre_id,
})

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("books").del()

  // Generate data
  const authorIds = (await knex("authors").select("id")).map(({ id }) => id)
  const genresIds = (await knex("genres").select("id")).map(({ id }) => id)

  const books = Array.from({ length: COUNT }, () =>
    createBook({ author_id: fromArray(authorIds), genre_id: fromArray(genresIds) })
  )

  // Inserts seed entries
  await knex("books").insert(books)
}
