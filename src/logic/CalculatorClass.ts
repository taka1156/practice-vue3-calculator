class CalculatorClass implements Calculator {
  public keyCodeAnalyze(keyCode: string): keyCode {
    switch (keyCode) {
      case 'AC':
        return 'clear';
      case '=':
        return 'cal';
      case '+':
      case '-':
      case '×':
      case '÷':
        return 'ope';
      case '%':
        return 'ope,cal';
      case '+/-':
        return 'reverse';
      default:
        return 'num'; // 小数点も数字として扱う
    }
  }

  public cal(num1: string, num2: string, ope: string): number | string {
    console.log(`${num1} ${ope} ${num2}`);
    switch (ope) {
      case '+':
        return Number(num1) + Number(num2);
      case '-':
        return Number(num1) - Number(num2);
      case '×':
        return Number(num1) * Number(num2);
      case '÷':
        return Number(num1) / Number(num2);
      case '%':
        return Number(num1) / 100;
      default:
        return 'E';
    }
  }
}

export { CalculatorClass };
