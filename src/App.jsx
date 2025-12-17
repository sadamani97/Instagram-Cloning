import React from 'react'
import Sidebar from './Sidebar'
import Feed from './feed'
import Suggestions from './Suggestions'


function App() {
  return (
    <div className="d-flex" style={{width:"80%", margin:"auto"}}>
      <div className="col-3" ><Sidebar/></div>
      <div className="col-5" ><Feed/></div>
      <div className="col-3" ><Suggestions/></div>
    </div>
  )
}


export default App