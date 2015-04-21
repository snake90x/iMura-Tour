<?PHP
	$data = json_decode(file_get_contents("php://input"),true) ;
	foreach ($data as $value){
		if(!empty($value['data'])){
			$filename = $value['filename'] ;
			$out = json_encode($value['data']) ;
			file_put_contents($filename,$out) ;
			echo "file $filename salvato correttamente." ;
		}
	}

?>