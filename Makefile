install: # Установить зависимости проекта
	npm ci

brain-games: # Запустить исполняемый файл
	node bin/brain-games.js

publish: # Протестировать публикацию пакета (без реальной отправки в npm) и установить пакет в систему
	npm publish --dry-run
	npm link

lint: # Проверить код линтером (oxlint) и форматтером (oxfmt) на наличие ошибок
	npx oxlint && npx oxfmt --check

lint-fix: # Автоматически отформатировать код и исправить ошибки, найденные линтером
	npx oxfmt && npx oxlint --fix