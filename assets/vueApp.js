let valueRepr = new ValueRepr();

let app = new Vue({
  el: '#app',
  data: () => ({
    valueRepr: valueRepr,
    poule: 12,
  }),
  computed: {

    value: {
      get() {
        return this.valueRepr.value;
      },
      set(value) {
        this.valueRepr.value = value
      }
    },
    converted() {
      return this.valueRepr.convert()
    }
  },
});
