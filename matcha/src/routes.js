import React, { Component } from 'react'
import Home from './containers/home/home'
import NotFound from './components/Notfound'
import Info from './containers/info'
import Tag from './containers/tag'
import Connexion from './containers/connexion'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

class Routes extends Component {    
       render () {
           return (
           <div>
                <Router history={browserHistory }>
                <Route path="/" component={Home}/>
                <Route path="/info" component={Tag}/>
                <Route path="/connexion" component={Connexion}/>
                <Route path="*" component={NotFound}/>
                </Router>
           </div>
           )
       }
   }
   export default Routes