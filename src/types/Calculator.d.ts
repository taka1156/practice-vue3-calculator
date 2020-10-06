interface Calculator {
  keyCodeAnalyze(keyCode: String): string;
  cal(num1: string, num2: string, ope: string): number | string;
}
