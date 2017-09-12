<?php

	$postData = file_get_contents('php://input');
	$data = json_decode($postData, true);

	if ($data["action"] == "save") {
		# Сохранить результаты
		file_put_contents("js/candidates.js", json_encode($data["candidates"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
		file_put_contents("js/ballots.js", json_encode($data["ballots"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
		echo '{"responce": "saved"}';
		return;
	}

	if ($data["action"] == "clear") {
		# Очистать  результаты
		file_put_contents("js/candidates.js", "");
		file_put_contents("js/ballots.js", "");
		echo '{"responce": "cleared"}';
		return;
	}


	return;



?>