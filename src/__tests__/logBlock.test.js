import { readDataBlock } from '../dataBlock';
import { readLogBlock } from '../logBlock';
import { mainHeader } from '../mainHeader';

const fs = require('fs');

const { IOBuffer } = require('iobuffer');

const pathFiles = `${__dirname}/files/`;

const nmrBuffer = new IOBuffer(fs.readFileSync(`${pathFiles}NMR_SPC.SPC`));

const nmrMain = mainHeader(nmrBuffer);
readDataBlock(nmrBuffer, nmrMain);
const nmrLog = readLogBlock(nmrBuffer, nmrMain.logOffset);
test('Log block parsing', () => {
  expect(nmrLog.data).toHaveLength(nmrLog.meta.binarySize);
  expect(nmrLog.text).toMatch(/^INSTRUM=drx400[^]*NMREND=NMREND[^]{1}\n\0$/);
});
