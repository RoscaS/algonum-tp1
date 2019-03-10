// let REGEX.validNumber = /^[-+]?[0-9]*\.?[0-9]+$/;
// let LEADING_ZEROS = /\b0{2,}/;

let app = new Vue({
  el: '#app',
  data: () => ({
    ranges: RANGES,
    bits: RANGES['32'],
    areas: [],
    areaA: {
      id: 'A',
      input: null,
      invalid: false,
      bin: null,
      sign: 0,
      exponent: 0,
      mantissa: 0,
      fields: [
        {name: 'Valeur'},
        {value: null, name: 'En mémoire'},
        {value: null, name: 'Erreur'},
        {value: null, name: 'IEEE754'},
      ],
    },
    areaB: {
      id: 'B',
      input: null,
      invalid: false,
      bin: null,
      sign: 0,
      exponent: 0,
      mantissa: 0,
      fields: [
        {name: 'Valeur'},
        {value: null, name: 'En mémoire'},
        {value: null, name: 'Erreur'},
        {value: null, name: 'IEEE754'},
      ],
    },
    inputsSize: 'is-normal',
    verbose: false
  }),
  watch: {
    'areaA.input': {
      handler: function (val) {
        this.updateFields(this.areaA, val);
      },
    },
    'areaB.input': {
      handler: function (val) {
        this.updateFields(this.areaB, val);
      },
    },
  },

  methods: {
    updateFields(area, val) {
      if (REGEX.validNumber.test(val) && !REGEX.leadingZeros.test(val)) {
        area.bin = new Binary(val, this.bits.bits);
        area.invalid = false;
      } else {
        area.invalid = true;
        this.reset(area);
        return;
      }
      area.fields[1].value = area.bin.storedValue;
      area.fields[2].value = area.bin.conversionError;
      area.fields[3].value = area.bin.IEEE754;

      area.fields[0]['size'] = val.length;

      area.sign = area.fields[3].value.slice(0, 1);
      area.exponent = area.fields[3].value.slice(1, 9);
      area.mantissa = area.fields[3].value.slice(9);
    },
    reset(area) {
      area.bin = null;
      area.fields[1].value = null;
      area.fields[2].value = null;
      area.fields[3].value = null;
      area.fields[0]['size'] = null;
      area.sign = 0;
      area.exponent = 0;
      area.mantissa = 0;
    },
    resetAll() {
      this.reset(this.areaA);
      this.reset(this.areaB);
      this.areaA.input = null;
      this.areaB.input = null;
    },
    fireTests() {
      let tests = Binary.tests();
      tests.print(verbose=true);
      alert('F12 pour afficher la console.');
    },
    eBitNumber(area) {
      let value = parseInt(area.bin.eBitNumber);
      return value > 0 ? `+${value}` : value;
    },
    copyToClipboard(value) {
      var el = document.createElement('textarea');
      el.value = value;
      el.setAttribute('readonly', '');
      el.style = {position: 'absolute', left: '-9999px'};
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Ajouté au presse-papier !');
    },
    setBitSize(value) {
      this.bits = this.ranges[value];
      this.inputsSize = this.bits.bits == 64 ? 'is-small' : 'is-normal';
      this.resetAll();
    },
    toggleVerbose() {
      this.verbose = !this.verbose;
    }

  },
  mounted() {
    this.areas.push(this.areaA);
    this.areas.push(this.areaB);
  },
});

