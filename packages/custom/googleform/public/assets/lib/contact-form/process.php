<?php

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$to_email = 'email@destino.com';
	$subject = 'Mensaje de contacto';
	$message = 'Mensaje de ' . $name . 'con email de contacto ' . $email . ' .\r\n\n'
               'Cuerpo del mensaje:\r\n' . $message;
	$headers = 'From: ' 		. mysql_escape_string('prueba@no-reply.com') . '\r\n'
			 . 'Reply-To: '		. mysql_escape_string('prueba@no-reply.com') . '\r\n'
			 . 'X-Mailer: PHP/'	. phpversion();

	if (!mail($to_email,$subject,$message,$headers))
	{
		echo 'Error';
	}
	else
	{
		echo "Email sent";
	}


?>