import React, { Component } from 'react'
import Info from './info'
import Logo from '../../components/logo'
import Tag from './tag'
import Img from './Img'
import styled from 'styled-components'

const PhotoTag = styled.div`
width: 85%;
display: flex;
justify-content: space-between;
`;
const Titre = styled.div`
width: 81%;
display: flex;
justify-content: space-between;
`;
const H2= styled.h2`
color: rgb(87,141,210);
`;

class Information extends Component {
    render () {
        return (
            <div>
                <Logo/>
                <Info/>
                {/* <PhotoTag> */}
                    <Img/>
                    <Tag/>
                {/* </PhotoTag> */}
            </div>
        )
    }
}

export default Information