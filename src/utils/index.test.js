import { fieldElementProps } from './index';

test('fieldElementProps with errors', () => {
  const expectedProps = {
    name: 'fieldName',
    label: 'Fieldname',
    color: 'error',
    inputProps: { 'data-testid': 'field-name-input' },
    FormHelperTextProps: { style: { color: '#d32f2f', fontWeight: '400' } },
    helperText: 'error',
    focused: true
  };

  const props = fieldElementProps('fieldName', { fieldName: 'error' }, { fieldName: 'Fieldname' });

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});
