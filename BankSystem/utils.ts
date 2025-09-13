/* Getting the card's bank name based in the first 4 digits */
export const getNameCard = (cardNumber: string) => {
    const first2 = cardNumber.substring(0,2);
    const first4 = cardNumber.substring(0,4);

    if(first4 == '4242') return 'Test Card'; 
    if(first4 == '5399' || first4 == '5108') return 'Banca Transilvania';
    else if(first4 == '4506' || first4 == '5108') return 'BCR';
    else if(first4 == '4216' || first4 == '5237') return 'BRD';
    else if(first2 == '36' || first2 == '38') return 'Diners Club';
    else if(first4 == '3528' || first4 == '3589') return 'JCB';
    else if(first4 == '4573' || first4 == '5283') return 'ING Bank Romania';
    return null;
}

/* Luhn's algorithm to check if the numbers on the card are valid */
const luhn = (cardNumber: string) => {
    let arr = [];
    for(let i=0;i<cardNumber.length;i++){
        if(cardNumber[i] != ' ') arr.push(Number(cardNumber[i]));
    }
    let sum = 0;
    const isEven = arr.length % 2 == 0;
    for(let i=0;i<arr.length;i++){
        if((i % 2 === 0 && isEven) || (i % 2 === 1 && !isEven)){
            arr[i]*=2;
            if(arr[i] >= 10) arr[i] -= 9; 
        }
        sum += arr[i];
    }
    return sum % 10 == 0;
}

/* Getting the bank name */
export const getBankName = (iban: string) => {
    const first4 = iban.substring(0,4);
    if(first4 == 'RNCB') return 'BCR';
    else if(first4 == 'BRDE') return 'BRD';
    else if(first4 == 'INGB') return 'ING Bank';
}

/* Some crazy shit out there */
const mod97 = (input: string): number => {
  let remainder = '';
  for (let i = 0; i < input.length; i += 7) {
    const block = remainder + input.substr(i, 7);
    remainder = String(parseInt(block, 10) % 97);
  }
  return parseInt(remainder, 10);
};

/* Generating the IBAN */
export const generateIBAN = () => {
    const banks = ['RNCB','BRDE','INGB'];
    const banksNumbers = ['27231211','11271314','18231611'];

    const randBank = Math.floor(Math.random() * banks.length);
    const bankNum = banksNumbers[randBank];

    let accountNumber = '';
    for(let i = 0; i < 16; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }

    const numericString = bankNum + accountNumber + '272400';
    const remainder = mod97(numericString);
    const checkDigits = String(98 - remainder).padStart(2, '0');

    const formatted = `${accountNumber.slice(0,4)} ${accountNumber.slice(4,8)} ${accountNumber.slice(8,12)} ${accountNumber.slice(12,16)}`;
    return `RO${checkDigits} ${banks[randBank]} ${formatted}`;
}

/* Function to check if the card is valid */
export const checkCard = (cardNumber: string) => {
    if(cardNumber.length < 16) return false;
    else{
        const cardName = getNameCard(cardNumber);
        if(cardName == null) return false;
        return luhn(cardNumber); 
    }  
}

export const isValidName = (iban: string) => {
    const first4 = iban.substring(5,9);
    if(first4 == 'RNCB') return 'BCR';
    else if(first4 == 'BRDE') return 'BRD';
    else if(first4 == 'INGB') return 'ING Bank';
}