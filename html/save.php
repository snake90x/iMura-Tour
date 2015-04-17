<?PHP

$data = json_decode(file_get_contents("php://input"),true) ;
$filename = $data['filename'] ;
$out = json_encode($data['data']) ;
file_put_contents($filename,$out) ;
echo "file $filename salvato correttamente." ;

?>
