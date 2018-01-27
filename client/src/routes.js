import React, { Component } from 'react'
import Home from './containers/home/home'
import NotFound from './components/Notfound'
import Information from './containers/information/information'
import Popularity from './containers/popularity/popularity'
import Profil from './containers/profil/profil'
import Connexion from './containers/connexion/connexion'
import Message from './containers/message/message'
import Forget from './containers/forget/forget_password'
import Search from './containers/search/search'
import Verifemail from './components/verifemail'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

class Routes extends Component {    
       render () {
           return (
           <div>
                <Router history={browserHistory }>
                <Route path="/" component={Home}/>
                <Route path="/info" component={Information}/>
                <Route path="/search" component={Search}/>
                <Route path="/verifemail" component={Verifemail}/>
                <Route path="/popularity" component={Popularity}/>
                <Route path="/forgetpass" component={Forget}/>
                <Route path="/profil" component={Profil}/>                
                <Route path="/connexion" component={Connexion}/>
                <Route path="/messages" component={Message}/>
                <Route path="*" component={NotFound}/>
                </Router>
           </div>
           )
       }
   }
   export default Routes