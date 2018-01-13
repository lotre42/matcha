import React, { Component } from 'react'
import Home from './containers/home/home'
import NotFound from './components/Notfound'
import Information from './containers/information/information'
import Info from './containers/information/info'
import Connexion from './containers/connexion/connexion'
import Search from './containers/search/search'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'

class Routes extends Component {    
       render () {
           return (
           <div>
                <Router history={browserHistory }>
                <Route path="/" component={Home}/>
                <Route path="/info" component={Information}/>
                <Route path="/infos" component={Info}/>
                <Route path="/search" component={Search}/>
                {/* <Route path="/img" component={Img}/> */}
                <Route path="/connexion" component={Connexion}/>
                <Route path="*" component={NotFound}/>
                </Router>
           </div>
           )
       }
   }
   export default Routes