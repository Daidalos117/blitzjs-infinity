import React from "react"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useInfiniteQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"

import getContacts from "app/contacts/queries/getContacts"
import { ContactsList } from "../../app/contacts/components/ContactsList"

const ITEMS_PER_PAGE = 100


const ContactsPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewContactPage()}>
            Create Contact
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ContactsList />
        </Suspense>
      </div>
    </>
  )
}

export default ContactsPage
