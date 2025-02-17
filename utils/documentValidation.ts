export function areAllDigitsEqual(number: string | number) {
  // let str = number.toString();
  // let firstDigit = str.charAt(0);
  // for (let index = 1; index < str.length; index++) {
  //   if (firstDigit !== str.charAt(index)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  //^ Never again get stuff from the internet smh

  const numberString = number.toString();
  return numberString
    .split("")
    .every((digit) => digit === numberString.charAt(0));
}

export function isCPFValid(cpf: string) {
  if (areAllDigitsEqual(cpf)) return false;

  if (cpf.length !== 11) return false;
  let sum = 0;
  for (let index = 0; index < 9; index++) {
    sum += parseInt(cpf.charAt(index)) * (10 - index);
  }
  let rest = (sum * 10) % 11;
  if (rest === 10) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let index = 0; index < 10; index++) {
    sum += parseInt(cpf.charAt(index)) * (11 - index);
  }
  rest = (sum * 10) % 11;
  if (rest === 10) {
    rest = 0;
  }

  if (rest === parseInt(cpf.charAt(10))) return true;
  return false;
}

export function isCNPJValid(cnpj: string) {
  console.log("cnpj: ", cnpj);
  console.log("cnpj.len: ", cnpj.length);

  if (cnpj.length !== 14) return false;
  if (areAllDigitsEqual(cnpj)) return false;
  const digitsToMultiply = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let index = 0; index < 12; index++) {
    sum += parseInt(cnpj.charAt(index)) * digitsToMultiply[index];
  }
  console.log("Soma:", sum);
  let rest = sum % 11;
  console.log("Resto:", rest);
  return false;
}
