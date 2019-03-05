class ValueRepr {

  constructor() {
    this._value = 0.0;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  convert() {
    return this._value * 2;
  }
}
