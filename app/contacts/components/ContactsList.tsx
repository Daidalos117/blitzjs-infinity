import { useRouter } from "next/router"
import { useInfiniteQuery } from "@blitzjs/rpc"
import getContacts from "../queries/getContacts"
import React, { useCallback } from "react"
import { ContactForm } from "./ContactForm"
import { a } from "@blitzjs/auth/dist/index-ced88017"
import { faker } from "@faker-js/faker"

export const ContactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [
    contactPages,
    { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, setQueryData },
  ] = useInfiniteQuery(getContacts, (page = { take: 3, skip: 0 }) => page, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const onOnContactSave = (contactFormValues: { name: string }) => {
    // typescript throws error here, even tho it should be possible to return just old data
    // setQueryData(oldData => oldData)
    //
    // old data is in fact undefined
    //setQueryData((oldData) => {
    // console.log({ oldData })
    //})
    //
    // typed like this but that doesn't work
    setQueryData({
      contacts: [{ ...contactFormValues, id: faker.datatype.uuid() }],
      ...contactPages[0]
    }, {refetch: false})

    // kinda make sense to use it like this, but also doesn't work
    /*const [firstPage, ...restPages] = contactPages;
    setQueryData([
      {
        ...firstPage,
        contacts: [
          { ...contactFormValues, id: faker.datatype.uuid() },
          ...firstPage.contacts
        ],
      },
      ...restPages
    ], {refetch: false})*/
  }

  return (
    <div>
      {contactPages.map((page, i) => (
        <React.Fragment key={i}>
          {page.contacts.map((contact) => (
            <p key={contact.id}>{contact.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || !!isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <div style={{ marginTop: 40 }}>
        <ContactForm
          onSubmit={async (val) => {
            onOnContactSave(val)
          }}
        ></ContactForm>
      </div>
    </div>
  )
}
