/**
 * Create by fay on 2019-07-15 16:52
 */
import React from 'react';
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-row-num';
import '../style/row-num.scss';
import Border from './border';
import {connect} from 'react-redux';
import {setMaxRow} from '../actions';

class RowNum extends React.Component{

    constructor(props) {
        super(props);
        this.rowTableRef = React.createRef();
        this.state = {
            trArr: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.numTrs(nextProps.maxRow, nextProps.rows)
    }

    numTrs = function(maxRow, rows){
        let trArr = [];
        let height = 0;
        for(let i = 0; i < maxRow; i++){
            let hpx = parseInt((rows[i] || {hpx: 23}).hpx + 1);
            const borderStyle = {height: hpx+'px', top: height+'px', left: '40px'};
            const borderHorizontalStyle = {width: '40px', top: height+hpx+'px', left: '0'};
            trArr.push(
                <tr key={i}>
                    <td style={{height: hpx+'px'}}>
                        {i === 0 && <Border style={{width: '40px', top: '0', left: '0'}} type='horizontal'/>}
                        <span className={stylePrefix+'-content'}>{i+1}</span>
                        <Border style={borderStyle}/>
                        <Border style={borderHorizontalStyle} type='horizontal'/>
                    </td>
                </tr>
            );
            height += hpx;
        }
        let rowNum = parseInt(maxRow);
        while(this.rowTableRef.current && this.rowTableRef.current.clientHeight - height > 24){
            console.log(typeof rowNum, rowNum);
            let hpx = 24;
            const borderStyle = {height: hpx+'px', top: height+'px', left: '40px'};
            const borderHorizontalStyle = {width: '40px', top: height+hpx+'px', left: '0'};
            trArr.push(
                <tr key={rowNum}>
                    <td style={{height: hpx+'px'}}>
                        <span className={stylePrefix+'-content'}>{rowNum+1}</span>
                        <Border style={borderStyle}/>
                        <Border style={borderHorizontalStyle} type='horizontal'/>
                    </td>
                </tr>
            );
            height += hpx;
            rowNum++;
        }
        this.props.setMaxRow(rowNum);
        this.setState({trArr});
    };

    render() {
        return (
            <div className={stylePrefix} ref={this.rowTableRef}>
                <table cellPadding={0}>
                    <tbody>
                        {this.state.trArr}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        setMaxRow: function (row) {
            dispatch(setMaxRow(row));
        }
    }
};

export default connect(null, mapDispatchToProps)(RowNum);
