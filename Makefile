
BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
ESLINT = $(BIN)/eslint

all: js/app.bundle.js

%.bundle.js: %.js
	$(BROWSERIFY) $< -t [ babelify --stage 0 ] -o $@

lint: ./js/*.js
	$(ESLINT) $^

clean:
	rm ./js/app.bundle.js

.PHONY: lint clean
