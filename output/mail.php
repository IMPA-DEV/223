<?php
if (!empty($_POST)) {
//theleadtornado@gmail.com
//$to = 'sane490@gmail.com';
$to = 'maxon.pro2015@gmail.com';

$subject = 'LEAD FROM WEST COAST SIGNS';
$subject = "=?utf-8?b?". base64_encode($subject) ."?=";

// данные с мыла
$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$formid = trim($_POST["formid"]);


$start = array('utm_source', 'utm_campaign', 'utm_keyword', 'utm_geo', 'utm_matchtype', 'utm_site', 'utm_placement', 'utm_position', 'utm_ad');
$finish = array('Source', 'ID Campaign', 'Keyword', 'GEO', 'Matchtype', 'Google', 'Placement', 'AD Position', 'ID AD');
$repl = array('+','%20','%2B','%3A','%2F','%3D','%26','%23','%3F');
$replto = array(' ',' ','+',':','/','=','&','#','?');
preg_match_all('/([a-zA-Z_]+?)=([a-zA-Z0-9+:\/.%]+)/', $_SERVER['HTTP_REFERER'], $out);
for ($i=0;$i<count($out[0]);$i++)
{
    $advertising .= "<tr><td class=\"bold\">".str_replace($start, $finish, $out[1][$i]).':</td><td>'.str_replace($repl, $replto, $out[2][$i])."</td></tr>";
}


// текст письма
$message .= '
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">  
  <title>LEAD FROM WEST COAST SIGNS</title>
  <style>
   
    body {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
    }
    table {
	width: 100%;
    }
    h1 {
    font-size:medium;
    }
    caption {
     text-align:left;
     margin:1% 0;
     padding:5px;
     background-color: #E6E6E6;
     font-weight:600;
	 }
	 td {
	 width:50%
	 }	 
	 .subinfo {
	 background-color: #E6E6E6;
	 font-size:x-small;
	 line-height:1;
	 padding:5px;
	 }
	 .bold {
	 font-weight:bold;
	 }
  </style>
</head>
<body>
<h1>LEAD FROM WEST COAST SIGNS</h1>
<table>
<caption>Lead Information:</caption>
	<tr>
		<td class="bold">Name:</td>
		<td>'.$name.'</td>
	</tr>
	<tr>
		<td class="bold">Cell Phone:</td>
		<td>'.$phone.'</td>
	</tr>
	<tr>
		<td class="bold">Email:</td>
		<td>'.$email.'</td>
	</tr>
</table>';

if($advertising!="")
$message .= '
<table>
	<caption>Advertising Information:</caption>	
	'.$advertising.'
</table>';

$message .= '
<div class="subinfo">
  <p>Form id: '.$formid.'</p>
  <p>Visitor IP adress: '.$_SERVER['REMOTE_ADDR'].'</p>  
  <p>Form submitted from: '. preg_replace('/\?.*/', '', $_SERVER['HTTP_REFERER']).'</p>
</div>
</body>
</html>
';


$headers = 'Content-type: text/html; charset="utf-8"';
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Date: ". date('D, d M Y h:i:s O') ."\r\n";
$headers .= "From: WEST COAST SIGNS <admin@westcoastsignmakers.com>\r\n";

	mail($to, $subject, $message, $headers);


}
else {return true;
}
?>