import React, { lazy, Suspense } from "react"

const UserList = lazy(() => import('./components/UserList'))

function App() {
  return (
    <Suspense fallback={'app is loading...'}>
      <UserList />
    </Suspense>
  )
}

export default App
