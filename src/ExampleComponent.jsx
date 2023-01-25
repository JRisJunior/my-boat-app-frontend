import { useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotRef = useRef(null);

  let buttonClickCallback;

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
    </div></>
  );
};
