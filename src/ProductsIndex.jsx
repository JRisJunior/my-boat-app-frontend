import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { ExampleComponent } from './ExampleComponent';

registerAllModules();

export function ProductsIndex() {
  return (
    <div>
      <h1>Boat Stuff</h1>
      <ExampleComponent/>
    </div>
  );
}
