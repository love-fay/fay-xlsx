/**
 * Create by fay on 2019-07-17 16:53
 */
import React from 'react';
import transformNumToLetter from "./transformNumToLetter";
import prefix from '../../classNamePrefix';
const stylePrefix = prefix + '-empty';
import '../style/empty.scss';

export default ({sheet, rows, cols, maxLetter, maxRow, merges=[]}) => {

    const loopData = () => {

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
        let letterNum = 0;
        let letter = '';
        const firstTdArr = [];
        while (letter !== maxLetter) {
            letter = transformNumToLetter(letterNum);
            let wpx = cols[letterNum].wpx || 40;
            if(letterNum===0)wpx+=1;
            firstTdArr.push(
                <td key={letterNum} style={{width: wpx+'px'}}/>
            );
            letterNum ++;
        }
        trArr.push(<tr key={-1} style={{height: 0}}>{firstTdArr}</tr>);

        let height = 0;
        let width = 0;
        for(let i = 0; i < maxRow; i++){
            let letterNum = 0;
            let letter = '';
            const tdArr = [];
            width = 0;
            while (letter !== maxLetter) {
                letter = transformNumToLetter(letterNum);
                const merge = mergesMap[i+'-'+letterNum];
                if(!(merge && 'hidden' in merge)){
                    let style = {};
                    let v = '';
                    if(sheet && sheet[letter+(i+1)]){
                        style = tdStyle(sheet[letter+(i+1)]);
                        v = sheet[letter+(i+1)].v;
                        if(letter+(i+1) === 'D3')console.log(v);
                    }
                    tdArr.push(
                        <td key={letterNum} style={style} colSpan={merge && 'colspan' in merge ? merge.colspan : 1} rowSpan={merge && 'rowspan' in merge ? merge.rowspan:1}>
                            <span>{v}</span>
                        </td>
                    );
                }
                letterNum ++;
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

    const {trArr, width} = loopData();

    return (
        <div className={stylePrefix}>
            <table cellPadding={0} style={{width:width, tableLayout: 'fixed'}}>
                <tbody>
                {trArr}
                </tbody>
            </table>
        </div>
    )
}

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
                if(left.style === 'thin') style.borderLeft = '1px solid';
            }
            if(top){
                if(top.style === 'thin') style.borderTop = '1px solid';
            }
        }

    }
    return style;
}