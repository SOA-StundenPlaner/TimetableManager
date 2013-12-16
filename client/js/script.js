var i = 4;
var h = 600;
var url = "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl";
var ns = "http://service.tomcat.denevell.org";
var timebool = false;
var registercheck = false;
var regcounter = 0;
var _this = this;

$(document).ready(
		function() {
			$('.registerbutton').click(function(e){
				var em = document.forms["formreg"].elements["email"].value;
				var un = document.forms["formreg"].elements["username"].value;
				var pw = document.forms["formreg"].elements["pw"].value;
				var pw2 = document.forms["formreg"].elements["pw2"].value;
				
				if(un == "" || un == null || pw == "" || pw == null || pw2 == "" || pw2 == null || em == "" || em == null){
					console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
				}else if(pw != pw2){
					console.log("Passwörter stimmen nicht überein.");
				}else{
										
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:createAccount><q0:username>' + un + '</q0:username><q0:password>' + pw + '</q0:password><q0:email>' + em + '</q0:email></q0:createAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createAccount');

			            },
			            success : function (respxml) {
			                //var respxml = msg.responseXML;
			                //console.log("response: "+respxml);
							var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
							console.log("Erfolgreich registriert: "+bool);
							_this.showPopup2(bool);		
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			
			/*$('.createtimetablebutton').click(function(e){
				var ttname = document.forms["formtimetable"].elements["ttname"].value;
				var tpname = document.forms["formtimetable"].elements["tpname"].value;
				var email = "test@test.de";
				var pw = "asd";
				timeprofilesoap(tpname, email, pw, e);
				var courses = document.getElementsByClassName('course');
				var courses2 = document.getElementsByClassName('course1');
				for(var i = 0; i < courses.length; i ++){
					var start = courses[i].value;
					var end = courses2[i].value;
					var index = i+1;
					coursesoap(start, end, tpname, email, pw, index, e);
				}
				timetablesoap(email, pw, ttname, tpname, e);
				showPopup22(this.timebool);
				e.preventDefault();
				return false;
			});*/
		});


function showAddCourse(){
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var text = document.forms["formtt"].elements["timetables"].options[selektiert].text;
	$('#popup').append('<p class="detailsheadingpopup">Kurs hinzuf&uuml;gen</p>');
	//$('#popup').append('</br>');
	$('#popup').append('<p>zum Stundenplan: '+text);
	$('#popup').append('</p>');
	$('#popup').append('<select><option>Kurs w&auml;hlen</option>');
	$('#popup').append('</select>');
	$('#popup').append('</br>');
	$('#popup').append('</br>');
	$('#popup').append('<p>Kurs nicht dabei? Erstelle einen neuen Kurs:</p>');
	$('#popup').append('<p><a href="createCourse.html">Kurs erstellen</a></p>');
	$('#popup').append('</br>');
	$('#popup').append('<button class="close" onClick="closePopup()">Schlie&szlig;en</button>');
	//$("#popup").css('opacity', '1.0');	
	$("#popup").animate({opacity: 1});
	$("#popup").css('z-index', '3');
	$("#popup").css('pointer-events', 'auto');
}

function closePopup() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
};

function closePopup2() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = 'http://localhost:8080/timetableClient/index.html';
};
function closePopup22() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = 'http://localhost:8080/timetableClient/register.html';
};

function closePopup22() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = 'http://localhost:8080/timetableClient/createTimetable.html';
};


function addCourse(){
	$('#courseadding').append('<li><label>Kurszeit '+i+': </label><input class="course" type="text" name="course'+i+'" value="HH:MM"><input class="course1" type="text" name="course'+i+'1" value="HH:MM"></li>');
	//var currentheight = h+26;
	//console.log(currentheight);
	//$('.wrapped').css("min-height", currentheight+"px");
	i = i+1;
	//h = h +26;
}

function showhideAddComment(){
	if($('#writecomment').css('visibility') == 'hidden'){
		$('#writecomment').css('visibility', 'visible');
	}else{
		$('#writecomment').css('visibility', 'hidden');
	}
}

function addComment(){
	var text = document.forms["commentform"].elements["writtencomment"].value;
	console.log(text);
	var jetzt = new Date();
	$('#comments').append('<div class="comment"><p><span class="bluegreen">');
	$('#comments').append('Tester Test, '+jetzt);
	$('#comments').append('</span></p><p>');
	$('#comments').append(text);
	$('#comments').append('</p></div>');
}


function register () {
	var em = document.forms["formreg"].elements["email"].value;
	var un = document.forms["formreg"].elements["username"].value;
	var pw = document.forms["formreg"].elements["pw"].value;
	var pw2 = document.forms["formreg"].elements["pw2"].value;
	
	if(un == "" || un == null || pw == "" || pw == null || pw2 == "" || pw2 == null || em == "" || em == null){
		console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgef&uuml;llt werden.");
	}else if(pw != pw2){
		console.log("Passw&ouml;rter stimmen nicht &uuml;berein.");
	}else{
		
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

        // build SOAP request
        var xml = buildSOAPEnvelope('<q0:createAccount><q0:username>' + un + '</q0:username><q0:password>' + pw + '</q0:password><q0:email>' + em + '</q0:email></q0:createAccount>', 'q0', 'http://service.tomcat.denevell.org');
        jQuery.support.cors = true;
        jQuery.ajax({
            type : "POST",
            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
            data : xml,
            contentType : "text/xml; charset=utf-8",
            dataType : "text xml",
            cache: false,
            beforeSend: function (xmlhttp) {
            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createAccount');

            },
            success : function (msg) {
                console.log("success"+msg);
                var respxml = msg.responseXML;
                console.log("response: "+respxml);
				var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
				_this.showPopup2(bool);		
            },
            error : function (xhr, status, errorThrown) {
                console.log("error: "+errorThrown);
            }
        });
        return false;
        
	}	
	
}

function showPopup2(bool){

		$(document).ready(function(){
			//console.log("blaa: "+bool);
			if(bool){
				$('#popup2').append('<p class="detailsheadingpopup">Willkommen!</p>');
				$('#popup2').append('<p>Du hast dich erfolgreich registriert.');
				$('#popup2').append('</p>');
				$('#popup2').append('<p>Deine Daten und Einstellungen kannst du unter Account einsehen.</p>');
				$('#popup2').append('</br>');
				$('#popup2').append('<button class="close2" onClick="closePopup2();">Zur Startseite</button>');	
				$("#popup2").animate({opacity: 1});
				$("#popup2").css('z-index', '3');
				$("#popup2").css('pointer-events', 'auto');
			}else{
				$('#popup2').append('<p class="detailsheadingpopup">Fehler beim Registrieren!</p>');
				$('#popup2').append('<p>Ein Fehler ist aufgetreten.');
				$('#popup2').append('</p>');
				$('#popup2').append('<p>Bitte versuche es erneut.</p>');
				$('#popup2').append('</br>');
				$('#popup2').append('<button class="close2" onClick="closePopup22();">OK</button>');	
				$("#popup2").animate({opacity: 1});
				$("#popup2").css('z-index', '3');
				$("#popup2").css('pointer-events', 'auto');
			}
		});
	
}

function showPopup22(bool){
	$(document).ready(function(){
		if(bool){
			$('#popup2').append('<p class="detailsheadingpopup">Erfolg!</p>');
			$('#popup2').append('<p>Stundenplan wurde erfolgreich erstellt.');
			$('#popup2').append('</p>');
			$('#popup2').append('</br>');
			$('#popup2').append('<button class="close2" onClick="closePopup2();">OK</button>');	
			$("#popup2").animate({opacity: 1});
			$("#popup2").css('z-index', '3');
			$("#popup2").css('pointer-events', 'auto');
		}else{
			$('#popup2').append('<p class="detailsheadingpopup">Fehler!</p>');
			$('#popup2').append('<p>Ein Fehler ist aufgetreten.');
			$('#popup2').append('</p>');
			$('#popup2').append('<p>&Uuml;berpr&uuml;fe bitte deine Angaben.</p>');
			$('#popup2').append('</br>');
			$('#popup2').append('<button class="close2" onClick="closePopup3();">OK</button>');	
			$("#popup2").animate({opacity: 1});
			$("#popup2").css('z-index', '3');
			$("#popup2").css('pointer-events', 'auto');
		}
	});

}

function createTimetable (){
	var ttname = document.forms["formtimetable"].elements["ttname"].value;
	var tpname = document.forms["formtimetable"].elements["tpname"].value;
	var email = "test@test.de";
	var pw = "asd";
	this.timeprofilesoap(tpname, email, pw);
	var courses = document.getElementsByClassName('course');
	var courses2 = document.getElementsByClassName('course1');
	for(var i = 0; i < courses.length; i ++){
		var start = courses[i].value;
		var end = courses2[i].value;
		var index = i+1;
		this.coursesoap(start, end, tpname, email, pw, index);
	}
	var bool = this.timetablesoap(email, pw, ttname, tpname);
	this.showPopup22(bool);
	
}

function timetablesoap(email, pw, ttname, tpname, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimetable', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createTimetable><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:ttName>' + ttname + '</q0:ttName><q0:tpName>' + tpname + '</q0:tpName></q0:createTimetable>', 'q0', 'http://service.tomcat.denevell.org');
   	
    /*jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimetable');

        },
        success : function (respxml) {
			this.timebool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("timetable erstellt: "+this.timebool);
			
			//_this.showPopup2(bool);		
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    e.preventDefault();*/
    //return false;
    
	xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
            	var respxml = xmlhttp.responseXML;                	
				if (respxml == null) {
					return;
				}
				//console.log("response: "+respxml);
				var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
				console.log("Timetable erfolgreich erstellt?: "+bool);	
				return bool;
				
            }
            if (xmlhttp.status == 500) {
            	console.log("error: "+xmlhttp.responseText);
            	
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimetable');
    xmlhttp.send(xml);
}

function coursesoap(start, end, tpname, email, pw, index, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createHour', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createHour><q0:start>' + start + '</q0:start><q0:end>' + end + '</q0:end><q0:tpName>' + tpname + '</q0:tpName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:hourIndex>' + index + '</q0:hourIndex></q0:createHour>', 'q0', 'http://service.tomcat.denevell.org');
   	
    /*jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createHour');

        },
        success : function (respxml) {
			var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("course ertsellt: "+bool);
			//_this.showPopup2(bool);		
			//return bool;
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    e.preventDefault();*/
    //return false;
	xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
            	var respxml = xmlhttp.responseXML;                	
				if (respxml == null) {
					return;
				}
				//console.log("response: "+respxml);
				var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
				console.log("Hour erfolgreich erstellt?: "+bool);						
				
            }
            if (xmlhttp.status == 500) {
            	console.log("error: "+xmlhttp.responseText);
            	
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createHour');
    xmlhttp.send(xml);
}

function timeprofilesoap(tpname, email, pw, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimeprofile', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createTimeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:tpName>' + tpname + '</q0:tpName></q0:createTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
   	/*var bool = false;
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimeprofile');

        },
        success : function (respxml) {
			bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("timeprofile erstellt: "+bool);
			//return;
			//_this.showPopup2(bool);		
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    e.preventDefault();*/
    //return bool;
    
	xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
            	var respxml = xmlhttp.responseXML;                	
				if (respxml == null) {
					return;
				}
				//console.log("response: "+respxml);
				var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
				console.log("Timeprofile erfolgreich erstellt?: "+bool);						
				
            }
            if (xmlhttp.status == 500) {
            	console.log("error: "+xmlhttp.responseText);
            	
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimeprofile');
    xmlhttp.send(xml);
}

//###################### soap functions ##########################


function buildSOAPEnvelope(payload, target_prefix, target_ns){
	return '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:'
			+(target_prefix || 'q0')
			+'="'
			+(target_ns || this.ns)
			+'"><soapenv:Body>'+payload+'</soapenv:Body></soapenv:Envelope>';
}

