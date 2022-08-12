export const cardExpirationDateValidator = (value: string) => {
  if (value.length !== 5) {
    return 'Podaj poprawny format';
  }
  const [month, year] = value.split('/');
  if (Number(month) > 12) {
    return 'Podaj poprawny miesiąc';
  }
  return true;
};
