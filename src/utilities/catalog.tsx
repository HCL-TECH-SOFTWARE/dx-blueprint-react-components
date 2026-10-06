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
