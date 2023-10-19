var id = prompt('아이디를 입력해주세요.');
var password = prompt('비밀번호를 입력해주세요.');

if(id=='soldesk510' && password=='12345'){
	location.href="login.html"
}else if(id=='soldesk1004' && password=='54321'){
	location.href="login.html"
}else if(id=='soldesk' && password=='11111'){
	location.href="login.html"
}else{
	location.href="error.html"
}
