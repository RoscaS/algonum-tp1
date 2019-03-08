const RANGES = {
  '32': {
    bits: 32,
    mantissa: 23,
    exponent: 8,
    lower: -126,
    upper: 127,
  },
  '64': {
    bits: 64,
    mantissa: null,
    exponent: null,
    lower: -1022,
    upper: 1023,
  },
  '128': {
    bits: 128,
    mantissa: null,
    exponent: null,
    lower: -16382,
    upper: 16383,
  },
};

const SPECIAL_PATTERNS = {
  '+0': '00000000000000000000000000000000',
  '-0': '10000000000000000000000000000000',
  '+inf': '01111111100000000000000000000000',
  '-inf': '11111111100000000000000000000000',
};

const TESTED_VALUES = {
  '263.3': {
    'nearest value': '01000011100000111010011001100110',
    'towards zero': '01000011100000111010011001100110',
    'towards +inf': '01000011100000111010011001100111',
    'towards -inf': '01000011100000111010011001100110',
  },
  '849.45': {
    'nearest value': '01000100010101000101110011001101',
    'towards zero': '01000100010101000101110011001100',
    'towards +inf': '01000100010101000101110011001101',
    'towards -inf': '01000100010101000101110011001100',
  },
  '276.674': {
    'nearest value': '01000011100010100101011001000110',
    'towards zero': '01000011100010100101011001000101',
    'towards +inf': '01000011100010100101011001000110',
    'towards -inf': '01000011100010100101011001000101',
  },
  '26.3': {
    'nearest value': '01000001110100100110011001100110',
    'towards zero': '01000001110100100110011001100110',
    'towards +inf': '01000001110100100110011001100111',
    'towards -inf': '01000001110100100110011001100111',
  },
  '8.456': {
    'nearest value': '01000001000001110100101111000111',
    'towards zero': '01000001000001110100101111000110',
    'towards +inf': '01000001000001110100101111000111',
    'towards -inf': '01000001000001110100101111000110',
  },
  '0.674': {
    'nearest value': '00111111001011001000101101000100',
    'towards zero': '00111111001011001000101101000011',
    'towards +inf': '00111111001011001000101101000100',
    'towards -inf': '00111111001011001000101101000011',
  },
  '0.1': {
    'nearest value': '00111101110011001100110011001101',
    'towards zero': '00111101110011001100110011001100',
    'towards +inf': '00111101110011001100110011001101',
    'towards -inf': '00111101110011001100110011001100',
  },
  '-263.3': {
    'nearest value': '11000011100000111010011001100110',
    'towards zero': '11000011100000111010011001100110',
    'towards +inf': '11000011100000111010011001100111',
    'towards -inf': '11000011100000111010011001100110',
  },
  '-849.45': {
    'nearest value': '11000100010101000101110011001101',
    'towards zero': '11000100010101000101110011001100',
    'towards +inf': '11000100010101000101110011001101',
    'towards -inf': '11000100010101000101110011001100',
  },
  '-276.674': {
    'nearest value': '11000011100010100101011001000110',
    'towards zero': '11000011100010100101011001000101',
    'towards +inf': '11000011100010100101011001000110',
    'towards -inf': '11000011100010100101011001000101',
  },
  '-26.3': {
    'nearest value': '11000001110100100110011001100110',
    'towards zero': '11000001110100100110011001100110',
    'towards +inf': '11000001110100100110011001100111',
    'towards -inf': '11000001110100100110011001100111',
  },
  '-8.456': {
    'nearest value': '11000001000001110100101111000111',
    'towards zero': '11000001000001110100101111000110',
    'towards +inf': '11000001000001110100101111000111',
    'towards -inf': '11000001000001110100101111000110',
  },
  '-0.674': {
    'nearest value': '10111111001011001000101101000100',
    'towards zero': '10111111001011001000101101000011',
    'towards +inf': '10111111001011001000101101000100',
    'towards -inf': '10111111001011001000101101000011',
  },
  '-0.1': {
    'nearest value': '10111101110011001100110011001101',
    'towards zero': '10111101110011001100110011001100',
    'towards +inf': '10111101110011001100110011001101',
    'towards -inf': '10111101110011001100110011001100',
  },
  '0.00000000000000000000000000000000000156': {
    'nearest value': '00000100000001001011010111001011',
    'towards zero': '00000100000001001011010111001010',
    'towards +inf': '00000100000001001011010111001011',
    'towards -inf': '00000100000001001011010111001010',
  },

};

