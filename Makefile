
BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
STANDARD = $(BIN)/standard

all: standard examples/app.bundle.js

.PHONY: standard
standard:
	$(STANDARD)

%.bundle.js: %.js
	$(BROWSERIFY) $< -o $@

.PHONY: clean
clean:
	rm -rf ./examples/app.bundle.js
