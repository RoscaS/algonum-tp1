
let tests = Binary.tests();
tests.print(verbose=false);

let a = new Binary("0.000001", 32);
a.print(verbose=true);

let b = new Binary("0.000002", 32);
b.print(verbose=true);


a.add(b);


