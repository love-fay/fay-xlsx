/**
 * Create by fay on 2019-07-15 16:52
 */
import React from 'react';
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-col-letter';
import '../style/col-letter.scss';
import Border from './border';
import transformNumToLetter from './transformNumToLetter';
import {connect} from 'react-redux';
import {setMaxCol} from '../actions';

class ColLetter extends React.Component{

    constructor(props) {
        super(props);
        this.letterTableRef = React.createRef();
        this.state = {
            cols: props.cols,
            width: 0,
            tdArr: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({cols: nextProps.cols});
        this.letterTds(nextProps.maxLetter, nextProps.cols);
    }

    letterTds = (maxLetter, cols) => {
        let letterNum = 0;
        let letter = '';
        const tdArr = [];
        let width = 41;
        let borderStyle = {height: '22px', top: '0', left: '40px'};
        tdArr.push(<td key={-1} style={{width: '41px'}}><span className={stylePrefix+'-content'}/><Border style={borderStyle}/></td>);
        while (letter !== maxLetter) {
            letter = transformNumToLetter(letterNum);
            let wpx = (cols[letterNum].wpx || 40) + 1;
            width += wpx;
            let borderStyle = {height: '22px', top: '0', left: width+'px'};
            tdArr.push(
                <td key={letterNum} style={{width: wpx+'px'}}>
                    <span className={stylePrefix+'-content'}>{letter}</span>
                    <Border style={borderStyle}/>
                </td>
            );
            letterNum ++;
        }
        console.log(width, this.letterTableRef.current && this.letterTableRef.current.clientWidth);
        while(this.letterTableRef.current && this.letterTableRef.current.clientWidth - width > 41){
            let wpx = 41;
            width += wpx;
            let borderStyle = {height: '22px', top: '0', left: width+'px'};
            tdArr.push(
                <td key={letterNum} style={{width:  wpx+'px'}}>
                    <span className={stylePrefix+'-content'}>{transformNumToLetter(letterNum)}</span>
                    <Border style={borderStyle}/>
                </td>
            );
            letterNum++;
        }
        this.props.setMaxCol(letterNum);
        this.setState({width, tdArr});
    };

    render() {
        return (
            <div className={stylePrefix} ref={this.letterTableRef}>
                <table cellPadding={0} width={this.state.width}>
                    <tbody>
                    <tr>
                        {this.state.tdArr}
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        setMaxCol: function(col){
            dispatch(setMaxCol(col));
        }
    }
};

export default connect(null, mapDispatchToProps)(ColLetter);