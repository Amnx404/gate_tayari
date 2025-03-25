import { auth } from "~/server/auth";


export default async function Home() {
    const session = await auth();



  return (
  // hellow world
  <div>
    {session ?  <>{session.user.name}</> : <>{'not logged in'}</>}

  </div>
  )
}