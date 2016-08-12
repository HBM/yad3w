
BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
STANDARD = $(BIN)/standard

all: standard example/app.bundle.js

.PHONY: standard
standard:
	$(STANDARD)

%.bundle.js: %.js
	$(BROWSERIFY) $< -o $@

.PHONY: clean
clean:
	rm -rf ./example/app.bundle.js
