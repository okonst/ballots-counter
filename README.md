# Ballots-counter

## Простая считалка голосов для многомандатных выборов.
Требуется локальный сервер с PHP. Локальный домен необходимо настроить на index.html.
1. Список кандидатов указывается вручную в файле js/data.js
2. Введенные бюллетени записываются в js/ballots.js в формате json
3. Итоги подсчета записываются в файл js/candidates.js в формате json

При оглашении бюллетеня нажимаем мышкой на фамилии отмеченных кандидатов, и жмем "Готово". 
Если возникла ошибка, то последние 10 бюллетеней отражаются внизу и могут быть отредактированы / удалены.

Если в процессе подсчета произошел перерыв и страница в браузере была закрыта, то потом можно открыть заново страницу в браузере и нажать кнопку "Load" - загрузятся сохраненные данные и можно продолжить работу.

Чтобы очистить все введенные данные и начать сначала - нажать кнопку "Restart".

В архиве "counter.rar" лежит упрощенная версия, которая работает без бэкенда - только на клиенте в браузере. 
Соответственно в упрощенной версии при перегазрузке страницы все данные теряются.

Используется фреймворк AngularJS и Bootstrap 3 (локальные копии).

## Simple counter of ballots for multi-mandate elections

Requires local server with PHP. Local domain should be directed to index.html

1. List of candidates is in file js/data.js
2. New ballots are added to file js/ballots.js in json format
3. Total summary of election is in file js/candidates.js in json format

Uses framework AngularJS and Bootstrap 3 (local copy).
