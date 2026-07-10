
export type Operation = '+' | '-' | '×' | '÷';


export function calculate(a: number, b: number, op: Operation): number {
  switch (op) {
    case '+':
      return a + b; // soma
    case '-':
      return a - b; // subtração
    case '×':
      return a * b; // multiplicação
    case '÷':
      // Evita erro de divisão por zero: se b for 0, retorna 0
      return b === 0 ? 0 : a / b;
    default:
      // Se chegar aqui, algo inesperado aconteceu; devolve o segundo valor
      return b;
  }
}


export function formatResult(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return parseFloat(value.toFixed(10)).toString();
}
