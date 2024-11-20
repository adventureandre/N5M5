// Validação de entrada evitando injeção SQL
export function validateInput(input: string): boolean {
    const trimmedInput = input.trim();
    const sqlInjectionRegex = /('|--|;|\/\*|\*\/|\\|"|or\s+\d+\s*=\s*\d+)/i;
    return !sqlInjectionRegex.test(trimmedInput);
  }
  