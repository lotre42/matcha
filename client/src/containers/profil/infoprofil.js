import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import { infoProfil, changeImg } from '../../actions/search'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'


const Img = styled.img`
 src : ${props => props.src};
`;

const H2= styled.h2`
color: rgb(205, 111, 190);
`;
const Div = styled.div`
font-family: Mothproofscriptregular;
display: flex;
justify-content: space-between;
width: 100%;
`;
const Divimg = styled.div`
display: flex;
// width: 70%;


`;
const CARD= styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
max-width: 30%;
margin: auto;
text-align: center;
`;
const B = styled.div`
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
max-width: 10%;
// margin: auto;
// text-align: center;
`;
const BIO= styled.div`
width: 50%;
// padding: 2%;
`;
const GEO= styled.div`
width: 50%;
// padding: 2%;
`;
const IMG= styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
padding: 2%;
width: 70%;
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
font-size: 18px;
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
const Span = styled.span`
    font-weight: bold;
    font-family: Mothproofscriptregular;
`;
const Input = styled.input`
// width: 45%;
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
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
            return (<div></div>)
        }
        else{
            return (
                <Div>
                    {/* <H2>Profil de {this.props.profil.info.nom} {this.props.profil.info.prenom}</H2> */}
                    <CARD>
                        <Img src={this.props.profil.image.profile_picture}/>
                        <h3>{this.props.profil.info.nom}</h3>
                        <P>{this.props.profil.info.prenom}</P>
                        <P>{this.props.profil.info.sexe}</P>
                        <P>{this.props.profil.info.orientation}</P>
                        <P>{this.props.profil.info.age}ans</P>
                        <p><Button rose>LIKER</Button></p>
                    </CARD> 
                  <IMG>
                    {/* <BIOGEO>
                        <BIO>
                            <Span>Biographie:</Span>
                            <p>{this.props.profil.info.bio}</p>
                        </BIO>
                        <GEO>
                            GEOLOCALISATION
                        </GEO>    
                    </BIOGEO> */}
                    <Span>Photos:</Span>
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
                            {/* <Galerie>                            
                                <Img src={this.props.profil.image.profile_picture} width="150" height="150"/>
                            </Galerie>
                            <Galerie>                            
                                <Img src={this.props.profil.image.profile_picture} width="150" height="150"/>
                            </Galerie>
                            <Galerie>
                                <Img src={this.props.profil.image.profile_picture} width="150" height="150"/>
                            </Galerie> */}
                    </Divimg>
                    </IMG>
             </Div>
        )}
    }
}

function mapStateToProps(state){
    console.log("state.users", state)
    return{
      profil: state.profil
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({infoProfil,changeImg}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImgProfil)
