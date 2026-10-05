install: # Установить зависимости проекта «с нуля» (на основе package-lock.json)
	npm ci

brain-games: # Запустить "входной" исполняемый файл
	node bin/brain-games.jsц

brain-even: # Запустить исполняемый файл игры "Проверка на чётность"
	node bin/brain-even.js

publish: # Протестировать публикацию пакета и установить пакет в систему (без реальной отправки в npm)
	npm publish --dry-run
	npm link

lint: # Проверить код линтером (oxlint) и форматтером (oxfmt) на наличие ошибок
	npx oxlint && npx oxfmt --check

lint-fix: # Автоматически отформатировать код и исправить ошибки, найденные линтером
	npx oxfmt && npx oxlint --fix