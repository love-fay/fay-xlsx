/**
 * Create by fay on 2019-07-17 16:53
 */
import React from 'react';
import Border from "./border";
import transformNumToLetter from "./transformNumToLetter";
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-content';
import '../style/content.scss';
import {connect} from 'react-redux';
import reducerName from '../reducerName';

class Content extends React.Component{

    static defaultProps = {
        merges: []
    };

    constructor(props) {
        super(props);
        this.contentTableRef = React.createRef();
        this.state = {
            trArr: [], width: 0
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {sheet, rows, cols, maxCol, maxRow, merges} = nextProps;
        if(maxCol && maxRow){
            const {trArr, width} = this.loopData(sheet, rows, cols, maxCol, maxRow, merges);
            this.setState({trArr, width});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {maxCol, maxRow} = nextProps;
        return maxCol && maxRow;
    }

    loopData = (sheet, rows, cols, maxCol, maxRow, merges) => {
        const mergesMap = {};
        merges.map((merge, i) => {
            for(let i = merge.s.r; i < merge.e.r+1; i++){
                for(let j = merge.s.c; j < merge.e.c+1; j++){
                    mergesMap[i+'-'+j] = {hidden: true};
                }
            }
            mergesMap[merge.s.r+'-'+merge.s.c] = {colspan: merge.e.c - merge.s.c + 1, rowspan: merge.e.r - merge.s.r + 1};
        });

        let trArr = [];
        let letter = '';
        const firstTdArr = [];
        for(let i = 0; i < maxCol; i++){
            letter = transformNumToLetter(i);
            let wpx = cols[i] && cols[i].wpx || 40;
            if(i===0)wpx+=1;
            firstTdArr.push(
                <td key={i} style={{width: wpx+'px'}}/>
            );
        }
        trArr.push(<tr key={-1} style={{height: 0}}>{firstTdArr}</tr>);

        let height = 0;
        let width = 0;
        for(let i = 0; i < maxRow; i++){
            let letter = '';
            const tdArr = [];
            width = 0;
            for(let j = 0; j < maxCol; j++){
                letter = transformNumToLetter(j);
                const merge = mergesMap[i+'-'+j];
                if(!(merge && 'hidden' in merge)){
                    let style = {};
                    let v = '';
                    if(sheet && sheet[letter+(i+1)]){
                        style = tdStyle(sheet[letter+(i+1)]);
                        v = sheet[letter+(i+1)].v;
                    }
                    tdArr.push(
                        <td key={j} style={style} colSpan={merge && 'colspan' in merge ? merge.colspan : 1} rowSpan={merge && 'rowspan' in merge ? merge.rowspan:1}>
                            <span>{v}</span>
                        </td>
                    );
                }
            }
            let hpx = parseInt((rows[i] || {hpx: 23}).hpx + 1);
            trArr.push(
                <tr key={i} style={{height: hpx+'px'}}>
                    {tdArr}
                </tr>
            );
            height += hpx;
        }
        return {trArr, width};
    };

    render(){
        return (
            <div className={stylePrefix} ref={this.contentTableRef}>
                <table cellPadding={0} style={{width:this.state.width, tableLayout: 'fixed'}}>
                    <tbody>
                    {this.state.trArr}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        maxRow: state[reducerName].maxRow,
        maxCol: state[reducerName].maxCol
    }
};

export default connect(mapStateToProps)(Content);

function tdStyle(tdData) {
    const style = {};
    if(tdData.s){
        const {alignment, font, border} = tdData.s;
        if(alignment){
            style.verticalAlign = alignment.vertical;
            style.textAlign = alignment.horizontal;
        }
        if(font){
            if(font.bold) style.fontWeight = 'bold';
            if(font.sz) style.fontSize = font.sz;
        }
        if(border){
            const {bottom, right, left, top} = border;
            if(bottom){
                if(bottom.style === 'thin') style.borderBottom = '1px solid';
            }
            if(right){
                if(right.style === 'thin') style.borderRight = '1px solid';
            }
            if(left){
                if(left.style === 'thin') style.borderLeft = '1px double';
            }
            if(top){
                if(top.style === 'thin') style.borderTop = '1px double';
            }
        }

    }
    return style;
}