/**
 * Create by fay on 2019-07-15 10:20
 */
import Excel from 'exceljs';

export const read = function () {
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('/assets/内蒙古表样.xlsx')
        .then(function() {
            // use workbook
            console.log(workbook);
        });

// // pipe from stream
//     var workbook = new Excel.Workbook();
//     stream.pipe(workbook.xlsx.createInputStream());
//
// // load from buffer
//     var workbook = new Excel.Workbook();
//     workbook.xlsx.load(data)
//         .then(function() {
//             // use workbook
//         });
}