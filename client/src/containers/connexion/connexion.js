import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {checkConnexion, forget} from '../../actions/user'
import styled from 'styled-components'
import {reduxForm} from 'redux-form'
import {browserHistory} from 'react-router'

const Wrapper = styled.section`
width: 32%;
height: 300px;
margin: auto;
border: 1px rgb(224, 226, 227) solid;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
background: rgba(255, 255, 255, 0.8);
`;
const Input = styled.input`
width: 40%;
background: white;
border: 1px rgb(224, 226, 227) solid;
box-shadow: -1px 0.4px 0.4px 0.4px rgba(0, 0, 0, 0.3) inset;
border-radius: 3px;
`;
const Button = styled.button`
color: palevioletred;
border: 1px solid palevioletred;
border-radius: 3px;
`;
const formConfig = {
    form: "checkConnexionForm",
    fields: ['username', 'password']
}
class Connexion extends Component {
    render () {
        const {fields,handleSubmit} = this.props
        return (
            <Wrapper>
                 <form onSubmit={handleSubmit(this.checkConnexion.bind(this))}>
                    <Input type="text" placeholder="" {...fields.username}/>
                    <Input type="text" placeholder="" {...fields.password}/>
                    <Button type="submit">Valider</Button>
                 </form>
                 <Button onClick={e => browserHistory.push('/forgetpass')}>Mot de passe oublie</Button>
            </Wrapper>
        )
    }
    checkConnexion(user){
        this.props.checkConnexion(user)
    }
}
function mapStateToProps(state){
    return{
       users: state.users
    }
}
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({checkConnexion}, dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(reduxForm(formConfig)(Connexion))