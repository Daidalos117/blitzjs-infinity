import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { faker } from "@faker-js/faker"

interface GetContactsInput {
  skip: number
  take: number
}

export interface Contact {
  id: string;
  name: string
}
const CONTACTS_COUNT = 150
const contacts: Contact[] = []
for (let x = 0; x <= CONTACTS_COUNT; x++) {
  contacts.push({name: faker.name.fullName(), id: faker.datatype.uuid()})
}



export default resolver.pipe(
  async ({ skip = 0, take = 5 }: GetContactsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const end = skip + take


    return {
      contacts: contacts.slice(skip, end),
      nextPage: {},
      hasMore: end < CONTACTS_COUNT,
      count: CONTACTS_COUNT,
    }
  }
)
