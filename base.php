<?
	function is_logged(){
		if($_SESSION['logged'] != false) return true;
		else return false;
	}

	class baseDef{
		public function __construct(){
			var_dump('start');
			$_SESSION['logged'] = false;
			$_SESSION['user'] = false;
			$_SESSION['picture'] = false;
		}
	}

	$main = new baseDef();
	//$main->__construct();

?>