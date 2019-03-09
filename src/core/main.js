

let tests = Binary.tests();
tests.print(verbose=false); // passe verbose à true pour plus d infos

let a = new Binary("123.7781", 32);
a.print(verbose=true);

let b = new Binary("4189764.9999", 32);
b.print(verbose=true);


let c = a.add(b);

c.print(verbose=true);

