const letters = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','w','x','y','z'];
const numbers = ['1','2','3','4','5','6','7','8','9','0'];
const special = ['/','_','&','^','%','$','#','@','!','?'];

export function generate(){
  let rand_length = 20;
  let checkArr = [1,2,3,4];
  let finalPassword = '';

  for(let i=1;i<=rand_length;i++){
    let rand_choice = Math.floor(Math.random() * checkArr.length);
    
    if(checkArr[rand_choice] == 1){
      let rand_letter = Math.floor(Math.random() * letters.length);
      finalPassword += letters[rand_letter];
    }else if(checkArr[rand_choice] == 2){
      let rand_number = Math.floor(Math.random() * numbers.length);
      finalPassword += numbers[rand_number];
    } else if(checkArr[rand_choice] == 3){
      let rand_ch = Math.floor(Math.random() * special.length);
      finalPassword += special[rand_ch];
    } else if(checkArr[rand_choice] == 4){
      let rand_letter = Math.floor(Math.random() * letters.length);
      finalPassword += letters[rand_letter].toUpperCase();
    }
  }

  return finalPassword; 
}