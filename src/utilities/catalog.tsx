/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
export const getColNumber = ( elementsPerRow: number | undefined ) => {
  let colNumber = 3;
  elementsPerRow = elementsPerRow ? elementsPerRow : 4;
  switch ( elementsPerRow ) {
    case 1:
      colNumber = 12;
      break;
    case 2:
      colNumber = 6;
      break;
    case 3:
      colNumber = 4;
      break;
    case 4:
      colNumber = 3;
      break;
    case 6:
      colNumber = 2;
      break;
    default:
      colNumber = 3;
      break;
  }
  let mediumCols = 0;
  if ( elementsPerRow === 6 ) { mediumCols = 4; }
  else if ( elementsPerRow === 4 ) { mediumCols = 4; }
  else if ( elementsPerRow === 3 ) { mediumCols = 6; }
  else mediumCols = colNumber;
  let smCols = 0;
  if ( elementsPerRow === 6 || elementsPerRow === 4 || elementsPerRow === 3 ) { smCols = 6; }
  else mediumCols = colNumber;
  return {
    sm: smCols,
    md: mediumCols,
    lg: colNumber,
    xl: colNumber
  };
};
