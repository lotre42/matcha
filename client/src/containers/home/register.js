import React from'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {createUser} from '../../actions/index'
import {Link} from 'react-router'
import styled from 'styled-components'
import {reduxForm} from 'redux-form'
import {browserHistory} from 'react-router'
import validate from '../../validation/validation_register'


const Error = styled.div`
color: rgb(117, 6, 149);
width: 40%;
font-size: 100%;
`;
const Input = styled.input`
width: ${props => props.long ? '90%' : '40%'};
background: white;
border: 1px rgb(224, 226, 227) solid;
border-radius: 3px;
`;
const Button = styled.button`
background: palevioletred;
color: white;
border: 1px solid palevioletred;
border-radius: 3px;
width: ${props => props.long ? '90%' : '40%'};
`;

const DivInput = styled.div`
    display: flex;
    height: ${props => props.error ? '20px' : '30px'};
    justify-content: space-around;
`;

const DivPanel = styled.div`
height: 15%;
border: 1px rgb(224, 226, 227) solid;
background: rgba(230, 233, 234, 0.7);
font-weight: bold;
color: rgb(8, 2, 46);
text-align: center;
margin-bottom: 10px;
font-size: 130%;
`;

const Wrapper = styled.section`
width: 32%;
padding-bottom: 20px;
margin: auto;
border: 1px rgb(224, 226, 227) solid;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
background: rgba(255, 255, 255, 0.8);
font-family: Mothproofscriptregular;
font-size: 90%;
`;

const formConfig = {
    form: "createUserForm",
    fields: ['username', 'nom', 'prenom', 'email', 'password', 'confirm'],
    validate
}
class Register extends React.Component {
    render() {
        const {
            fields,
            handleSubmit,
            errors
        } = this.props;
        return(
            <div>
                <Wrapper>
                    <form onSubmit={handleSubmit(this.createUser.bind(this))}>
                        <DivPanel>Inscrivez-vous sur Matcha</DivPanel>
                        <DivInput>
                            <Input long type="text" placeholder="Entrer Username" {...fields.username}/>
                        </DivInput>
                        <DivInput error>
                            <Error>{fields.username.touched && errors.username}</Error>
                        </DivInput>
                        <DivInput>
                            <Input type="text" placeholder="Nom" {...fields.nom}/> 
                            <Input type="text" placeholder="Prenom" {...fields.prenom}/>
                        </DivInput>
                        <DivInput error>
                            <Error>{fields.nom.touched && errors.nom}</Error>
                            <Error>{fields.prenom.touched && errors.prenom}</Error>
                        </DivInput>
                        <DivInput>
                            <Input long type="email" placeholder="Adresse email" {...fields.email}/>
                        </DivInput>
                        <DivInput error>
                            <Error>{fields.email.touched && errors.email}</Error>
                        </DivInput>
                        <DivInput>
                            <Input type="password" placeholder="Mot de passe" {...fields.password}/>
                            <Input type="password" placeholder="Confirmation mot de passe" {...fields.confirm}/>
                        </DivInput>
                        <DivInput error>
                            <Error>{fields.password.touched && errors.password}</Error>
                            <Error>{fields.confirm.touched && errors.confirm}</Error>
                        </DivInput>
                        <DivInput>
                            <Button long type="submit" disabled={this.props.invalid}>Valider</Button>
                        </DivInput>
                    </form>
                </Wrapper>
            </div>
        )
    }
    createUser(user){
        this.props.createUser(user)
    }  
}

function mapStateToProps(state){
    // console.log(state)
    return{
       users: state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({createUser}, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(Register))