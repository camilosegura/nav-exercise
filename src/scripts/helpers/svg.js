  import Handlebars from 'handlebars';
  import path from 'path';
  import fs from 'fs';

  const svg = (svgName, className) => {
    let result = '';
    // console.error('svgName', svgName)
    if (svgName) {
      try {
        result = `<span class="svg ${className}">${fs
              .readFileSync(`${path.resolve('./')}/src/assets/images/${svgName}.svg`, 'utf8')}
            </span>`;
      } catch (e) {
        result = `<small><pre>[SVG not found: ${svgName} ${e}]</pre></small>`;
      }
    } else {
      result = `<small><pre>[SVG undefined: ${svgName}]</pre></small>`;
    }

    return new Handlebars.SafeString(result);
  };

  export default svg;
