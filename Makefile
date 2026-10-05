install: # Установить зависимости проекта «с нуля» (на основе package-lock.json)
	npm ci

brain-games: # Запустить исполняемый файл игры
	node bin/brain-games.js

publish: # Протестировать публикацию пакета (без реальной отправки в npm)
	npm publish --dry-run

lint: # Проверить код линтером (oxlint) и форматтером (oxfmt) на наличие ошибок
	npx oxlint && npx oxfmt --check

lint-fix: # Автоматически отформатировать код и исправить ошибки, найденные линтером
	npx oxfmt && npx oxlint --fix