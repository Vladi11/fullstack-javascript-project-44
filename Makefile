install: # Установить зависимости проекта
	npm ci

brain-games: # Запустить "Знакомство"
	node bin/brain-games.js

brain-even: # Запустить игру "Проверка на чётность"
	node bin/brain-even.js

brain-calc: # Запустить игру "Калькулятор"
	node bin/brain-calc.js

brain-gcd: # Запустить игру "НОД"
	node bin/brain-gcd.js

brain-progression: # Запустить игру "Арифметическая прогрессия"
	node bin/brain-progression.js

brain-prime: # Запустить игру "Простое ли число?"
	node bin/brain-prime.js

publish: # Протестировать публикацию пакета (без реальной отправки в npm) и установить пакет в систему
	npm publish --dry-run
	npm link

lint: # Проверить код линтером (oxlint) и форматтером (oxfmt) на наличие ошибок
	npx oxlint && npx oxfmt --check

lint-fix: # Автоматически отформатировать код и исправить ошибки, найденные линтером
	npx oxfmt && npx oxlint --fix