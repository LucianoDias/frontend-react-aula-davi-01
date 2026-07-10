
'use client';
import { useState } from 'react';
import CalculatorButton from './CalculatorButton';

import { calculate, formatResult, type Operation } from '../utils/calculator';


export default function Calculator() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  function inputDigit(digit: string): void {
    setDisplay((prev) => {
      if (waitingForNewValue) {return digit;  }
      if (prev === '0') { return digit;  }
      return prev + digit; // adiciona ao final
    });
    setWaitingForNewValue(false); // próximo dígito será adicionado, não substituído
  }

  function inputDecimal(): void {
    setDisplay((prev) => {
      if (waitingForNewValue) {return '0.';  }
      if (prev.includes('.')) {return prev; }
      return prev + '.';
    });
    setWaitingForNewValue(false);
  }

  function handleOperation(op: Operation): void {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      // Primeira operação: guarda o valor atual
      setPreviousValue(currentValue);
    } else if (operation && !waitingForNewValue) {
      // Já existe operação pendente: calcula o resultado parcial
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(formatResult(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  }

  function handleEquals(): void {
    if (operation === null || previousValue === null) { return; }
    const currentValue = parseFloat(display);
    const result = calculate(previousValue, currentValue, operation);
    setDisplay(formatResult(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true); // próximo número substituirá o resultado
  }

  function clearAll(): void {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  }

  function deleteLast(): void {
    setDisplay((prev) => {
      if (waitingForNewValue) return prev;
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1); // remove o último caractere
    });
  }

  return (
    // Container externo: ocupa toda a tela com um gradiente de fundo escuro.
    <div className=" bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      {/* Corpo da calculadora: card com gradiente, sombra e cantos arredondados */}
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700/50">
        {/* Título da calculadora */}
        <h1 className="text-center text-slate-400 text-sm font-semibold tracking-[0.3em] mb-4 uppercase">
          Calculadora
        </h1>
        <div className="bg-slate-950/60 rounded-2xl px-5 py-4 mb-4 min-h-[10px] flex flex-col items-end justify-end overflow-hidden">
          {previousValue !== null && operation && (
            <span className="text-slate-500 text-lg font-medium mb-1">
              {formatResult(previousValue)} {operation}
            </span>
          )}
          <span className="text-white text-5xl font-light tracking-tight break-all text-right leading-tight">
            {display}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <CalculatorButton label="C" onClick={clearAll} variant="action" />
          <CalculatorButton label="⌫" onClick={deleteLast} variant="action" />
          <CalculatorButton label="÷" onClick={() => handleOperation('÷')} variant="operator" />
          <CalculatorButton label="×" onClick={() => handleOperation('×')} variant="operator" />
          <CalculatorButton label="7" onClick={() => inputDigit('7')} />
          <CalculatorButton label="8" onClick={() => inputDigit('8')} />
          <CalculatorButton label="9" onClick={() => inputDigit('9')} />
          <CalculatorButton label="-" onClick={() => handleOperation('-')} variant="operator" />
          <CalculatorButton label="4" onClick={() => inputDigit('4')} />
          <CalculatorButton label="5" onClick={() => inputDigit('5')} />
          <CalculatorButton label="6" onClick={() => inputDigit('6')} />
          <CalculatorButton label="+" onClick={() => handleOperation('+')} variant="operator" />
          <CalculatorButton label="1" onClick={() => inputDigit('1')} />
          <CalculatorButton label="2" onClick={() => inputDigit('2')} />
          <CalculatorButton label="3" onClick={() => inputDigit('3')} />
          <CalculatorButton label="=" onClick={handleEquals} variant="equals" tall />
          <CalculatorButton label="0" onClick={() => inputDigit('0')} wide />
          <CalculatorButton label="." onClick={inputDecimal} />
        </div>
      </div>
    </div>
  );
}
