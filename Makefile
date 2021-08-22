install: installDeps

installDeps:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-covverage:
	npm test -- --coverage --coverageProvider=v8