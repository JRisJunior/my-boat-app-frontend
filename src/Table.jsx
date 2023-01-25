import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const data = [
    ['Boat Type', 'Boat Full Name', 'Year', 'Make', 'Model', 'Class', 'Length', 'Fuel Type']
  ];

  return (
    <div>
      <HotTable
        data={data}
        rowHeaders={true}
        colHeaders={true}
        height={500}
        width={500}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
    </div>
  );
};