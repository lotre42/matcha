import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import { infoProfil, changeImg } from '../../actions/search'
import { profilMessage, updateReceveur } from '../../actions/message'
import { readUser } from '../../actions/user'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import Like from './like'


const Img = styled.img`
 src : ${props => props.src};
`;

const H2= styled.h2`
color: rgb(205, 111, 190);
`;
const Div = styled.div`
font-family: Mothproofscriptregular;
display: flex;
width: 100%;
margin-left: 18%;
`;
const Divimg = styled.div`
// display: flex;
width: 400px;
`;
const CARD= styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
width: 30%;
text-align: center;
`;
const TAG = styled.button`
background: white;
color: palevioletred;
border: 2px solid palevioletred;
border-radius: 3px;
`;
const Info = styled.div`
height: 50%;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
width: 67%;
display: flex;
flex-direction: column;
margin-left: 18%;
`;

const Match = styled.div`
margin: ${props => props.button ? "0%" : "2%"};
display: flex;
justify-content: space-between;
`;

const Divbutton= styled.div`
width: 400px;
display: flex;
`;
const Galerie= styled.div`
margin: 5px;
border: 1px solid #ccc;
float: left;
width: 150px;

`;
const P = styled.p`
color: grey;
// font-size: 18px;
overflow-x: scroll;;

`;
const But = styled.button`
width: 50%;
`;
const FULL = styled.div`
width: 100%;
height: 100%;
`;
const Button = styled.button`
border: none;
outline: 0;
display: inline-block;
padding: 8px;
color: white;
background-color: ${props => props.rose ? 'rgb(205, 111, 190)' : 'rgb(87,141,210)'};
text-align: center;
cursor: pointer;
width: 100%;
font-size: 18px;
:hover {
    background-color: ${props => props.rose ? 'rgb(87,141,210))' : 'rgb(205, 111, 190)'};
    }
`;

class ImgProfil extends Component {
    render () {
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (isEmpty(this.props.profil))
        {
            let id = localStorage.getItem('profil')
            this.props.infoProfil(id)
            // this.props.readUser(id)
            return (<div></div>)
        }
        else{
            let tab = [];
            for(let key in this.props.profil.tag) {
                tab.push(key);
            }
            return (
                <FULL>
                    <Info>
                        <Match>
                            <p>Derniere connexion</p>
                            <p>{this.props.profil.date}</p>
                        </Match>
                        <Match>
                            <p>Match</p>
                            <p>{this.props.profil.like}</p>
                        </Match>
                        <Match button>                   
                            {this.props.profil.like == "Le match a commencé" ? <But onClick={e => {this.props.profilMessage(this.props.profil.info.id, this.props.idmessage); this.props.updateReceveur(this.props.profil.info.id)}}>Message</But> : isEmpty()} 
                            <But>Blocker</But>
                        </Match>
                    </Info>
                    <Div>
                        <CARD>
                            <h3>{this.props.profil.info.nom}</h3>
                            <P>{this.props.profil.info.prenom}</P>
                            <P>{this.props.profil.info.sexe}</P>
                            <P>{this.props.profil.info.orientation}</P>
                            <P>{this.props.profil.info.age}ans</P>
                            <P>{this.props.profil.info.bio}ans</P>
                            {tab.map(t => {
                                return <span key={t}><TAG>{t}</TAG></span>
                            })}
                            <Like />
                        </CARD> 
                        <Divimg>
                                <Galerie>
                                    <Img src={this.props.profil.image.display} width="400" height="400"/>
                                    <Divbutton>
                                        <Button onClick={(e)=>this.props.changeImg(this.props.profil, this.props.profil.image.picture_1)}>IMAGE1</Button>
                                        <Button onClick={(e)=>this.props.changeImg(this.props.profil, this.props.profil.image.picture_2)}>IMAGE2</Button>
                                        <Button onClick={(e)=>this.props.changeImg(this.props.profil, this.props.profil.image.picture_3)}>IMAGE3</Button>
                                        <Button onClick={(e)=>this.props.changeImg(this.props.profil, this.props.profil.image.picture_4)}>IMAGE4</Button>
                                    </Divbutton>
                                </Galerie> 
                        </Divimg>
                </Div>
             </FULL>
        )}
    }
}

function mapStateToProps(state){
    return{
      profil: state.profil,
      idmessage: state.idmessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({infoProfil,changeImg, readUser, updateReceveur, profilMessage}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImgProfil)
