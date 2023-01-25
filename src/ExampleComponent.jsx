import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  let buttonClickCallback;
  let buttonClickCallback2;

  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    const exportPlugin = hot.getPlugin('exportFile');

    //csv download
    buttonClickCallback = () => {
      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Boat_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
      });
    };

    //json download
    buttonClickCallback2 = () => {
      let string = exportPlugin.exportAsString('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: false,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'Boat_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\n',
        rowHeaders: true
      });

      //var csv is the CSV file with headers
      function csvJSON(csv){

        var lines=csv.split("\n");

        var result = [];

        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(",");

        for(var i=1;i<lines.length;i++){

            var obj = {};
            var currentline=lines[i].split(",");

            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
      }

      function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }

      //console.log(string.split('\n').map((line) => line.split(',')))
      console.log(csvJSON(string))

      download("table.json",csvJSON(string));
    };
  });

  return (
    <><HotTable
      ref={hotRef}
      data={[
        ['Boat Name', 'Type', 'Dimension', 'Color', 'Fuel', 'Location'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13]
      ]}
      rowHeaders={true}
      colHeaders={true}
      height="auto"
      licenseKey="non-commercial-and-evaluation" // for non-commercial use only
    />
    <br/><div className="controls">
      <button id="export-file" onClick={(...args) => buttonClickCallback(...args)}>Download CSV</button>
      <button id="export-file" onClick={(...args) => buttonClickCallback2(...args)}>Download JSON</button>
    </div></>
  );
};
