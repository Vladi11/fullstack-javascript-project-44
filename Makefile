install: # установить зависимости
	npm ci

brain-games: # запуск исполняемого файла
	node bin/brain-games.js

publish: # публикация npm пакета
	npm publish --dry-run