import { Knex } from "knex"
import { faker } from "@faker-js/faker"

const COUNT = 100

const createAuthor = () => ({ name: faker.person.fullName(), bio: faker.lorem.paragraph(1) })

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("authors").del()

  // Generate data
  const authors = Array.from({ length: COUNT }, () => createAuthor())

  // Inserts seed entries
  await knex("authors").insert(authors)
}
