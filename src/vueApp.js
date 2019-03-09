let validNumber = /^[-+]?[0-9]*\.?[0-9]+$/;
let leadingZeros = /\b0{2,}/;

let app = new Vue({
  el: '#app',
  data: () => ({
    bits: 32,
    areas: [],
    areaA: {
      id: 'A',
      input: null,
      invalid: false,
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
      fields: [
        {name: 'Valeur'},
        {value: null, name: 'En mémoire'},
        {value: null, name: 'Erreur'},
        {value: null, name: 'IEEE754'},
      ],
    },
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
      let bin = null;

      if (validNumber.test(val) && !leadingZeros.test(val)) {
        // console.log('Bien !');
        bin = new Binary(val);
        area.invalid = false;
      } else {
        // console.log('Pas bien !');
        area.invalid = true;
        return;
      }

      area.fields[1].value = bin.storedValue;
      area.fields[2].value = bin.conversionError;
      area.fields[3].value = bin.IEEE754;

      area.fields[0]['size'] = val.length;
      area.fields[1]['size'] = area.fields[1].value.length;
      area.fields[2]['size'] = area.fields[2].value.length;
      area.fields[3]['size'] = area.fields[3].value.length;
    }

  },
  mounted() {
    this.areas.push(this.areaA);
    this.areas.push(this.areaB);
  },
});

