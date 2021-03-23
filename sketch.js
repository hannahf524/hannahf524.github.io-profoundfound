function setup() {
  noCanvas();
  var generateButton = select('#generate');
  generateButton.mousePressed(generate);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearIt);
}

function clearIt() {
  var markovs = selectAll('.markov');
  for (var i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}

function generate() {
  var order = select('#order');
  var length = select('#length');
  var textinput = select('#text');
  var markov = new MarkovGeneratorWord(Number(order.value()), Number(length.value()));
  var lines = textinput.value().split('\n');

  for (var i = 0; i < lines.length; i++) {
    markov.feed(lines[i].trim());
  }

  var par = createP(markov.generate());
  par.class('markov');
  par.parent('results');
}
