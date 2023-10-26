import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"


const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Link href={Routes.ContactsPage()}>
        Contacts
      </Link>
    </Layout>
  )
}

export default Home
