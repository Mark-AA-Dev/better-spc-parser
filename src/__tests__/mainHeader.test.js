import { mainHeader } from '../mainHeader';

const { readFileSync } = require('fs');

const { IOBuffer } = require('iobuffer');

const pathFiles = `${__dirname}/files/`;

test('mainHeader parsing test', () => {
  const mxyxy = mainHeader(
    new IOBuffer(readFileSync(`${pathFiles}m_xyxy.spc`)),
  );
  const raman = mainHeader(new IOBuffer(readFileSync(`${pathFiles}RAMAN.SPC`)));
  const mOrdZ = mainHeader(
    new IOBuffer(readFileSync(`${pathFiles}m_ordz.spc`)),
  );
  expect(mxyxy.parameters.xyxy).toStrictEqual(true);
  expect(mxyxy.parameters.multiFile).toStrictEqual(true);
  expect(mxyxy.xUnitsType).toStrictEqual('Mass (M/z)');
  expect(mxyxy.zUnitsType).toStrictEqual('Minutes');
  expect(mxyxy.wUnitsType).toBeUndefined();
  expect(mxyxy.date).toMatch(/1986-01-09T08:47/);
  expect(mxyxy.memo).toMatch(/^Multiple [^]*X & Y arrays/);
  expect(raman.date).toMatch(/1994-08-26T16:45/);
  expect(raman.xyzLabels).toMatch(/Rmn Intensity/);
  expect(mOrdZ.memo).toMatch(/^Multiple [^]*ordered Z spacing/);
});
