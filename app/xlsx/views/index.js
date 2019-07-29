/**
 * Create by fay on 2019-07-08 15:45
 */
import React,{useState, useEffect} from 'react';
import {get} from '@fay-react/lib/fetch';
import {readUrl} from './read-url';
// import {read} from './read';
import Tool from './tool';
import ColLetter from './col-letter';
import RowNum from './row-num';
import Content from './content';
import Empty from './empty';

export default () => {

    const [data, setData] = useState({});
    const [maxLetter, setMaxLetter] = useState('A');
    const [cols, setCols] = useState([]);
    const [state, setState] = useState({maxLetter: 'A', cols: [{}], maxRow: 1, rows: [{}]});
    const [colsBy, setColsBy] = useState(0);
    const [rowsBy, setRowsBy] = useState(0);
    let sheets = undefined;
    let sheets_styles = undefined;
    let sheetNamesButtons;

    const showSheet = (sheetName) => {
        const table = getSheet(sheetName);
        setData({sheetNamesButtons, table});
    };

    const getSheet = (sheetName) => {
        const sheet = sheets[sheetName];
        console.log(sheets);
        const sheet_styles = sheets_styles[sheetName];
        const cols = sheet['!cols'];
        // setCols(cols);
        // setMaxLetter(sheet['!ref'].split(':')[1].replace(/[0-9]/g, ''));
        setState({
            maxLetter: sheet['!ref'].split(':')[1].replace(/[0-9]/g, ''),
            cols: sheet['!cols'],
            maxRow: sheet['!ref'].split(':')[1].replace(/[A-Z]/g, ''),
            rows: sheet['!rows'],
            merges: sheet['!merges'],
            sheet: sheet_styles
        });

        const rows = sheet['!rows'];
        console.log(sheet);
        console.log(sheet_styles);
        const letter = sheet['!ref'].split(':')[1].replace(/[0-9]/g, '');

        const num = sheet['!ref'].split(':')[1].replace(/[A-Z]/g, '');
        const merges = sheet['!merges'];
        const mergesMap = {};
        merges.map((merge, i) => {
            for(let i=merge.s.r; i < merge.e.r+1; i++){
                for(let j=merge.s.c; j < merge.e.c+1; j++){
                    mergesMap[i+'-'+j] = {hidden: true};
                }
            }
            mergesMap[merge.s.r+'-'+merge.s.c] = {colspan: merge.e.c - merge.s.c + 1, rowspan: merge.e.r - merge.s.r + 1};
        });
        // console.log(mergesMap);
        // console.log(letter, num);
        let trArr = [];
        let cellXfNum = 0;
        for(let i=0; i<num; i++){
            let tdArr = [];
            if(i === 0){
                const firstTrTds = [];
                for(let j=0; j<letterMap[letter]; j++){
                    let initStyle = {textAlign: 'center', width: '50px'};
                    let style = cols[j] ? {...initStyle, width: cols[j].wpx+'px'} : initStyle;
                    if(j === 0) firstTrTds.push(<td key={-1}/>);
                    firstTrTds.push(<td key={j} style={style}>{colPosition[j]}</td>);
                }
                trArr.push(<tr key={-1}>{firstTrTds}</tr>);
            }
            for(let j=0; j<letterMap[letter]; j++){
                // console.log(i+'-'+j);
                // console.log(colPosition[j] + i, sheet[colPosition[j] + i]);
                if(j === 0){
                    let initStyle = {textAlign: 'center', height: '50px'};
                    let style = rows[j] ? {...initStyle, height: rows[j].hpx+'px'} : initStyle;
                    tdArr.push(<td key={-1} style={style}>{i+1}</td>);
                }
                const cellData = sheet[colPosition[j] + (i+1)];
                const cellData_style = sheet_styles[colPosition[j] + (i+1)];
                const v = (cellData || {v: ''}).v;
                let style = {verticalAlign: 'bottom', textAlign: 'left'};
                if(cellData){
                    cellXfNum++;
                    if(cellData_style.s){
                        const {alignment={}, border={}, fill={}, font={}} = cellData_style.s;
                        alignment.vertical && (style.verticalAlign = alignment.vertical);
                        alignment.horizontal && (style.textAlign = alignment.horizontal);
                        const {fgColor} = fill;
                        fgColor && (style.backgroundColor = '#' + fgColor.rgb.substr(2, 6));
                        const {color, sz, name, bold} = font;
                        color && (style.color = '#' + color.rgb.substr(2, 6));
                        sz && (style.fontSize = sz+'px');
                        bold && (style.fontWeight = 'bold');
                        border.bottom && (style.borderBottom = '1px #000000 solid')
                    }
                }
                if(mergesMap[i+'-'+j]){
                    const {colspan=1, rowspan=1, hidden} = mergesMap[i+'-'+j];
                    if(!hidden){
                        tdArr.push(<td style={style} colSpan={colspan} rowSpan={rowspan} key={j}>{v}</td>);
                    }
                }else{
                    tdArr.push(<td key={j}>{v}</td>);
                }
            }
            trArr.push(<tr key={i}>{tdArr}</tr>);
        }
        return <table border="1"><tbody>{trArr}</tbody></table>;
    };

    const handleData = (data) => {
        const {XLSX, XLSX_STYLE} = data;
        const {SheetNames, Sheets, Styles} = XLSX;
        sheets = XLSX.Sheets;
        sheets_styles = XLSX_STYLE.Sheets;
        sheetNamesButtons = SheetNames.map((sheetName, i) => {
            return <button key={i} onClick={() => showSheet(sheetName)}>{sheetName}</button>
        });
        const table = getSheet(SheetNames[0]);
        setData({sheetNamesButtons, table});
    };

    useEffect(()=>{
        // getData();
        readUrl(handleData);
    }, [true]);

    return (
        <div style={{width: '80%', height: '80%'}}>
            <Tool/>
            <ColLetter maxLetter={state.maxLetter} cols={state.cols}/>
            <div>
                <RowNum maxRow={state.maxRow} rows={state.rows}/>
                <Content sheet={state.sheet} cols={state.cols} rows={state.rows} maxLetter={state.maxLetter} maxRow={state.maxRow} merges={state.merges}/>
                {/*<Empty sheet={state.sheet} cols={state.cols} rows={state.rows} maxLetter={state.maxLetter} maxRow={state.maxRow} merges={state.merges}/>*/}
            </div>
        </div>
    )
}

const letterMap = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10,
    'K': 11,
    'L': 12,
    'M': 13,
    'N': 14,
    'O': 15,
    'P': 16,
    'Q': 17,
    'R': 18,
    'S': 19,
    'T': 20,
    'U': 21,
    'V': 22,
    'W': 23,
    'X': 24,
    'Y': 25,
    'Z': 26,
};

const colPosition = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
};
