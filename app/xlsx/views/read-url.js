/**
 * Create by fay on 2019-07-15 10:42
 */
import XLSX from 'xlsx';
import XLSX_STYLE from 'xlsx-style';

export const readUrl = function (cb) {
    /**
     * Create by fay on 2019-07-15 10:20
     */
    const url = "/assets/内蒙古表样.xlsx";

    /* set up async GET request */
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
        var data = new Uint8Array(req.response);
        var workbook = XLSX.read(data, {type:"array", cellStyles: true});
        // console.log(workbook);
        const workbookStyle = readStyle(data);
        cb({'XLSX': workbook, 'XLSX_STYLE': workbookStyle});
        // console.log(workbook_style);
        /* DO SOMETHING WITH workbook HERE */
    };
    req.send();
};

const readStyle = function (data) {
    /* convert data to binary string */
    const arr = new Array();
    for(let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    const bstr = arr.join("");
    /* Call XLSX */
    return XLSX_STYLE.read(bstr, {type:"binary", cellStyles: true});
};