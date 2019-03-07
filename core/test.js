// Tested against:
// https://www.h-schmidt.net/FloatConverter/IEEE754.html
// http://weitz.de/ieee/
// https://babbage.cs.qc.cuny.edu/IEEE-754/

class TestBinary {
  constructor() {
    this.samples = TESTED_VALUES;
    this.rawTests = {passed: [], failed: []};
    this._run();
  }

  _run() {
    for (const sample in this.samples) {
      let binary = new Binary(sample);
      let sampleList = [];
      let tested = {
        testedValue: sample,
        theoretical: binary.IEEE754,
        empirical: this.samples[sample],
      };

      for (const result in tested.empirical) {
        sampleList.push(tested.empirical[result]);
      }

      sampleList.includes(tested.theoretical)
      ? this.rawTests.passed.push(tested)
      : this.rawTests.failed.push(tested);
    }
  }

  _display(testSet) {
    testSet.forEach(test => {
      console.log(`\nTested value:\t${test.testedValue}`);
      console.log(`Theoretical:\t${test.theoretical}`);
      console.log(`Empirical:`);
      for (const sample in test.empirical) {
        console.log(`${sample}:\t${test.empirical[sample]}`);
      }
    });
  }

  print() {
    console.log(`\n\n${header('TESTS START')}`);
    console.log(header(`FAILED (${this.rawTests.failed.length})`));
    this._display(this.rawTests.failed);
    console.log(header(`PASSED (${this.rawTests.passed.length})`));
    this._display(this.rawTests.passed);
    console.log(`\n${header('TESTS END')}\n`);
  }
}
