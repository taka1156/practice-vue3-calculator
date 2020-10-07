enum ERROR_MSG {
  INPUT = '0の時に00は入力できません。',
  REVERSE = '0に+/-はつけられません。',
  OPERATOR = '演算子を入力してください。(+,-,×,÷)',
  RESULT = '前回の結果でエラーが生じているので一度ACします',
  MSGUNDEFINE = 'エラー定義がありません。'
}

enum ERROR_LIST {
  INPUT,
  REVERSE,
  OPERATOR,
  RESULT
}

class CalculatorClass implements Calculator {
  private static instance: CalculatorClass;
  private nums: string[];
  private ope: string;

  private constructor() {
    this.nums = ['0', '0'];
    this.ope = '';
  }

  public static getInstance(): CalculatorClass {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new CalculatorClass();
      return this.instance;
    }
  }

  public display(): string {
    const INDEX = this.inputNum();
    return this.nums[INDEX];
  }

  public pushBtn(keyCode: string): void {
    const keyType: keyCodeType = this.keyCodeAnalyze(keyCode);
    if (keyType === 'clear') {
      this.reset();
    } else if (keyType === 'ope') {
      this.ope = keyCode;
    } else if (keyType === 'cal') {
      this.calInit();
    } else if (keyType === 'ope,cal') {
      this.ope = keyCode;
      this.calInit();
    } else if (keyType === 'reverse') {
      this.reverseNum(this.inputNum());
    } else {
      this.setNum(this.inputNum(), keyCode);
    }
  }

  private keyCodeAnalyze(keyCode: string): keyCodeType {
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

  private inputNum(): calIndex {
    if (this.ope === '') {
      return 0;
    } else {
      return 1;
    }
  }

  private reset(): void {
    this.nums = ['0', '0'];
    this.ope = '';
  }

  private errorCheck(msg: ERROR_LIST): void {
    switch (msg) {
      case 0:
        alert(ERROR_MSG.INPUT);
        return;
      case 1:
        alert(ERROR_MSG.REVERSE);
        return;
      case 2:
        alert(ERROR_MSG.OPERATOR);
        return;
      case 3:
        alert(ERROR_MSG.RESULT);
        return;
      default:
        alert(ERROR_MSG.MSGUNDEFINE);
        console.error('新しいエラー定義を追加してください。');
        return;
    }
  }

  private reverseNum(setKey: calIndex): void {
    if (this.nums[setKey] === '0') {
      this.errorCheck(ERROR_LIST.REVERSE);
      return;
    }

    if (this.nums[setKey].includes('-')) {
      this.nums[setKey].replace('-', '');
    } else {
      this.nums[setKey] = '-' + this.nums[setKey];
    }
  }

  private setNum(setKey: calIndex, num: string): void {
    if (this.nums[setKey] === '0' && num !== '.') {
      if (num === '00') {
        this.errorCheck(ERROR_LIST.INPUT);
        return;
      } else {
        this.nums[setKey] = num;
      }
    } else {
      this.nums[setKey] = this.nums[setKey] + num;
    }
  }

  private calInit() {
    if (this.ope === '') {
      this.errorCheck(ERROR_LIST.OPERATOR);
    }
    const result: calAns = this.cal();
    this.nums[0] = result.toString();
    this.nums[1] = '0';
    this.ope = '';
    if (this.nums[0] === 'E') {
      this.errorCheck(ERROR_LIST.RESULT);
      this.reset();
    }
  }

  private cal(): calAns {
    switch (this.ope) {
      case '+':
        return Number(this.nums[0]) + Number(this.nums[1]);
      case '-':
        return Number(this.nums[0]) - Number(this.nums[1]);
      case '×':
        return Number(this.nums[0]) * Number(this.nums[1]);
      case '÷':
        return Number(this.nums[0]) / Number(this.nums[1]);
      case '%':
        return Number(this.nums[0]) / 100;
      default:
        return 'E';
    }
  }
}

export { CalculatorClass };
