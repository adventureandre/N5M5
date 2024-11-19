
//Validacao da senha evitanto injecao SQL
export function validatePassword(password: string):boolean{
const trimmedPassword =  password.trim();

const passwordRegex =  /('|--|;|\/\*|\*\/|\\|"|or\s+\d+\s*=\s*\d+)/i;

return !passwordRegex.test(trimmedPassword)
}