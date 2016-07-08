
BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
STANDARD = $(BIN)/standard

all: standard src/app.bundle.js

.PHONY: standard
standard:
	$(STANDARD)

%.bundle.js: %.js
	$(BROWSERIFY) $< -t [ babelify --presets [es2015 stage-0 react] ] -o $@

.PHONY: clean
clean:
	rm -rf ./src/app.bundle.js
