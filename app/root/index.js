import React from 'react';
import {withRouter} from 'react-router-dom';
import Xlsx from '../xlsx';

class Root extends React.Component{

    render(){
        const {location} = this.props;
        const {pathname} = location;
        const pathPrefix = pathname.split('/')[1];
        const router = {
            '': <Xlsx/>,
        };
        return (
            <div style={{width: '100%', height: '100%'}}>
                {router[pathPrefix]}
            </div>
        )
    }
}


export default withRouter(Root);