
BIN_DIR = ./node_modules/.bin
BROWSERIFY = $(BIN_DIR)/browserify
STANDARD = $(BIN_DIR)/standard
WATCHIFY = $(BIN_DIR)/watchify

all: standard examples/app.bundle.js

.PHONY: standard
standard:
	$(STANDARD)

%.bundle.js: %.js
	$(BROWSERIFY) $< -o $@

.PHONY: watch
watch:
	$(WATCHIFY) examples/app.js \
		--outfile examples/app.bundle.js \
		--debug \
		--verbose \

.PHONY: clean
clean:
	rm -rf ./examples/app.bundle.js
