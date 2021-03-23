String.prototype.tokenize = function() {
  return this.split(/\s+/);
}

Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

function MarkovGeneratorWord(n, max) {
  this.n = n;
  this.max = max;
  this.ngrams = {};
  this.beginnings = [];

  this.feed = function(text) {

    var tokens = text.tokenize();

    // Discard this line if it's too short
    if (tokens.length < this.n) {
      return false;
    }

    // Store the first ngram of this line
    var beginning = tokens.slice(0, this.n).join(' ');
    this.beginnings.push(beginning);

      // Now let's go through everything and create the dictionary
    for (var i = 0; i < tokens.length - this.n; i++) {
      // Usings slice to pull out N elements from the array
      gram = tokens.slice(i, i + this.n).join(' ');
      // What's the next element in the array?
      next = tokens[i + this.n];

      // Is this a new one?
      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }
      // Add to the list
      this.ngrams[gram].push(next);
    }
  }

  this.generate = function() {

    var current = this.beginnings.choice();

    var output = current.tokenize();

    for (var i = 0; i < this.max; i++) {
      if (this.ngrams[current]) {
        var possible_next = this.ngrams[current];
        var next = possible_next.choice();
        output.push(next);
        current = output.slice(output.length - this.n, output.length).join(' ');
      } else {
        break;
      }
    }
    return output.join(' ');
  }
}
