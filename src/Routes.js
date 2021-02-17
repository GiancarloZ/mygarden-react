import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
// import Seeds from './Pages/Seeds'
import Signup from './Components/Signup'
import Login from './Components/Login'
// import Seed from './Pages/Seed'

const Seeds = React.lazy(() => import('./Pages/Seeds/Seeds'))
const Seed = React.lazy(() => import('./Pages/Seeds/Seed'))
const Gardens = React.lazy(() => import('./Pages/Gardens/Gardens'))
const Garden = React.lazy(() => import('./Pages/Gardens/Garden'))
const Plant = React.lazy(() => import('./Pages/Plants/Plant'))

const Routes = ({seedsList, gardensList, currentUser, plantsList, plantImagesList}) => {
    console.log(seedsList)
    console.log(gardensList)
    console.log(currentUser)
    console.log(plantsList)
    console.log(plantImagesList)
    return (
        <>
        <Redirect exact from="/" to="/home" render={(props) => <Home {...props}/>}/>
        <Route exact path="/home" render={() => <Home props={{seedsList, gardensList, currentUser, plantsList}}/>}/> 
        <Route exact path="/seeds" render={() => <Seeds props={seedsList} />} />
        <Route exact path="/seeds/:id" render={() => <Seed props={seedsList} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route exact path="/gardens" render={() => <Gardens props={{gardensList, plantsList, plantImagesList}} />} />
        <Route exact path="/gardens/:id" render={() => <Garden props={{gardensList, plantsList, seedsList, plantImagesList}} />} />
        <Route exact path="/gardens/:gardenId/plants/:plantId" render={() => <Plant props={{gardensList, plantsList, seedsList, plantImagesList}} />} />
        </>
    )
}
export default Routes