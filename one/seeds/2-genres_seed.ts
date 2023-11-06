import { Knex } from "knex"
import { faker } from "@faker-js/faker"

const COUNT = 10

const createGenre = () => ({ name: faker.lorem.words(2) })

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("genres").del()

  // Generate data
  const genres = Array.from({ length: COUNT }, () => createGenre())

  // Inserts seed entries
  await knex("genres").insert(genres)
}
