import { faker } from "@faker-js/faker"

export function fromArray<const T extends readonly any[]>(arr: T): T[number] {
  return arr[Math.floor(arr.length * Math.random())]
}

export const generateAuthor = () => ({
  name: faker.person.fullName(),
  bio: faker.lorem.paragraph(1),
})
export const generateGenre = () => ({ name: faker.lorem.words(2) })

export const generateBook = ({
  author_id,
  genre_id,
}: Record<"author_id" | "genre_id", number>) => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(4),
  price: faker.number.int({ min: 30, max: 300 }),
  author_id,
  genre_id,
})
