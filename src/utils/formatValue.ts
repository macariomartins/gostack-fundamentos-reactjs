const formatConfiguration = {
  style: 'currency',
  currency: 'BRL',
};

const formatValue = (value: number): string =>
  Intl.NumberFormat([], formatConfiguration).format(value);

export default formatValue;
