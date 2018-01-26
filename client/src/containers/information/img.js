import React, { Component } from 'react'
import axios from 'axios'
import FormData from 'form-data';
import styled from 'styled-components'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
// import {imgCreate} from '../../actions/index'
import {imgInfo} from '../../actions/user'

const Img = styled.img`
 src : ${props => props.src};
 -moz-border-radius: 8px;
-webkit-border-radius: 8px;
-khtml-border-radius: 8px;
border-radius: 8px;
`;
const DivProfil = styled.div`
display: flex;
flex-direction: column;
// align-items: center;
`;
const DivPrincipal = styled.div`
//display: flex;
`;
const Div = styled.div`
// display: flex;

 src : ${props => props.src};
`;

const Fdiv = styled.div`
display: flex;
width: 50%;
height: 55%;
`;

const Blockdiv = styled.div`
background: rgba(180, 190, 196, 0.3);
height: 250px;
width: 200px;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 10px;
`;

const Sdiv = styled.div`
display: flex;
width: 70%;
height: 34%;
align-items: center;
`;
const Label = styled.label`
border-radius: 5px;
background: url('../../style/images.jpg') no-repeat center center fixed;
color: rgb(61, 69, 74);
border: 1px solid rgb(61, 69, 74);
font-family: Mothproofscriptregular;
width:70%;
text-align: center;
`;
const Input = styled.input`
display: none;
`;
const H3= styled.h3`
color: rgb(87,141,210);
`;
// const Img = styled.img`
// -moz-border-radius: 4px;
// -webkit-border-radius: 4px;
// -khtml-border-radius: 4px;
// border-radius: 4px;
// `;

class ImageUpload extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {file: '', imagePreviewUrl: '../../avatar.png'};
    // }
  
    // _handleSubmit(e) {
    //   e.preventDefault();
    //   const ret = this.state.file
    //   const formData = new FormData();
    //   formData.append("webmasterfile", ret);
    //   const END_POINT = "http://localhost:3000"
    //   axios.post(`${END_POINT}/users`, formData, {
    //     headers: { 'content-type': 'multipart/form-data' }
    //   }).then(result => {
    //     // location.reload();
    //   }).catch(err => alert('Failed to upload img'));
    // }
  
    // ImageChange(e) {
    //   e.preventDefault();
  
    //   let reader = new FileReader();
    //   let file = e.target.files[0];
    //   reader.onloadend = () => {
    // let ret = {...this.props.users}
    // ret['image_profil'] = reader.result;
    // console.log(ret)
    //     // this.setState({
    //     //   file: file,
    //     //   imagePreviewUrl: reader.result
    //     // });
    //   }
  
    //   reader.readAsDataURL(file)
    // }
  
    render() {
        // if (this.props.image.profile_picture == undefined){
        //     this.props.imgCreate(1);
        // }
        console.log("pb",this.props.users);
      return (
        // <p>coucou</p>
        // <DivPrincipal>
            /* <div>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
          </div> */
        <DivProfil>
            <H3>Image</H3>             
            <Fdiv>
                <Blockdiv>
                    <Img src={this.props.users.image.profile_picture} width="200" height="200"/>
                    <Label>Photo de Profil
                    <Input
                        type="file" 
                        onChange={(e)=>this.props.imgInfo(e, this.props.users, 'profile_picture')} 
                    /></Label>
                </Blockdiv>
                <Blockdiv>
                    <Img src={this.props.users.image.picture_1} width="200" height="200"/>
                    <Label>Photo 1
                    <Input
                        type="file" 
                        onChange={(e)=>this.props.imgInfo(e, this.props.users, 'picture_1')} 
                    /></Label>
                </Blockdiv>
            </Fdiv>
            <Sdiv>
                 <Blockdiv>
                    <Img src={this.props.users.image.picture_2} width="200" height="200"/>
                    <Label>Photo 2
                    <Input
                        type="file" 
                        onChange={(e)=>this.props.imgInfo(e, this.props.users, 'picture_2')} 
                    /></Label>
                </Blockdiv>
                <Blockdiv>
                    <Img src={this.props.users.image.picture_3} width="200" height="200"/>
                    <Label>Photo 3
                    <Input
                        type="file" 
                        onChange={(e)=>this.props.imgInfo(e, this.props.users, 'picture_3')} 
                    /></Label>
                </Blockdiv>
                <Blockdiv>
                    <Img src={this.props.users.image.picture_4} width="200" height="200"/>
                    <Label>Photo 4
                    <Input
                        type="file" 
                        onChange={(e)=>this.props.imgInfo(e, this.props.users, 'picture_4')} 
                    /></Label>
                </Blockdiv>
            </Sdiv>
        </DivProfil>
        // </DivPrincipal>
      )
    }
  }

function mapStateToProps(state){
    return{
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({imgInfo}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)