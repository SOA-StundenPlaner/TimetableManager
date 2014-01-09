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
			$('.kasten').click(function(e){	
				console.log("test");
				//$('#test').append('<div class="hoverdiv"><a href="details.html"><img src="img/eye.png" alt="seeDetails" class="hoverbild"></a><a href="#"><img src="img/trash_can.png" alt="delete" class="hoverbild"></a></div>')
				//$('.hoverdiv').css("visibility", "visible");
			});
			$('.kasten').mouseout(function(t){
				$('.hoverdiv').css("visibility", "hidden");
				$('.hoverdiv').remove();
			});
			//register
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
					window.localStorage.setItem("email", em);
					window.localStorage.setItem("password", pw);
					window.localStorage.setItem("username", un);
					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createAccount', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:createAccount><q0:username>' + un + '</q0:username><q0:password>' + pw + '</q0:password><q0:email>' + em + '</q0:email></q0:createAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createAccount",
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
							//var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			            	var bool = respxml.getElementsByTagName("createAccountReturn")[0].firstChild.nodeValue;
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
			
			$('.createtimetablebutton').click(function(e){
				var ttname = document.forms["formtimetable"].elements["ttname"].value;
				var tpname = document.forms["formtimetable"].elements["tpname"].value;
				//var email = "test@test.de";
				//var pw = "asd";
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				//timeprofilesoap(tpname, email, pw, e);
				
				var xmlhttp = new XMLHttpRequest();
			    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

			    // build SOAP request
			    var xml = buildSOAPEnvelope('<q0:createTimeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:tpName>' + tpname + '</q0:tpName></q0:createTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
			   	var bool = false;
			   	var courses = document.getElementsByClassName('course');
				var courses2 = document.getElementsByClassName('course1');
			    jQuery.support.cors = true;
			    jQuery.ajax({
			        type : "POST",
			        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl",
			        data : xml,
			        contentType : "text/xml; charset=utf-8",
			        dataType : "text xml",
			        cache: false,
			        callback: showPopup22(),
			        beforeSend: function (xmlhttp) {
			        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimeprofile');

			        },
			        success : function (respxml) {
						bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
						console.log("timeprofile erstellt: "+bool);
						for(var i = 0; i < courses.length; i ++){
							var start = courses[i].value;
							var end = courses2[i].value;
							var index = i+1;
							coursesoap(start, end, tpname, ttname, email, pw, index, e, i, courses.length);
						}
						//return;
						//_this.showPopup2(bool);		
			        },
			        error : function (xhr, status, errorThrown) {
			            console.log("error: "+errorThrown);
			        }
			    });			    
			    
			    e.preventDefault();
				return false;
				
				/*for(var i = 0; i < courses.length; i ++){
					var start = courses[i].value;
					var end = courses2[i].value;
					var index = i+1;
					coursesoap(start, end, tpname, email, pw, index, e);
				}
				timetablesoap(email, pw, ttname, tpname, e);
				showPopup22(this.timebool);*/
				//e.preventDefault();
				//return false;
			});
			$("#createCourseButton").click(function(e){
				var name = document.forms["createCourseForm"].elements["coursename"].value;
				var shortname = document.forms["createCourseForm"].elements["courseshortname"].value;
				var teacher = document.forms["createCourseForm"].elements["courseteacher"].value;
				var descr = document.forms["createCourseForm"].elements["coursedescr"].value;
				var room = document.forms["createCourseForm"].elements["courseroom"].value;
				
				if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
					console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
					//popup mit Fehlermeldung
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createCourse', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:createCourse><q0:name>' + name + '</q0:name><q0:shortname>' + shortname + '</q0:shortname><q0:teacher>' + teacher + '</q0:teacher><q0:description>' + descr + '</q0:description><q0:room>' + room + '</q0:room></q0:createCourse>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createCourse",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createCourse');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createCourseReturn")[0].firstChild.nodeValue;
							console.log("Kurs erfolgreich erstellt: "+bool);
							//_this.showPopup2(bool);	
							//window.location.href = 'http://localhost:8080/timetableClient/index.html';
							_this.showNotification("Kurs "+name+" erstellt.");
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
		});

function showAddCourse(){
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var text = document.forms["formtt"].elements["timetables"].options[selektiert].text;
	$(".overlay").fadeIn();
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

function showHelp(){
	$(".overlay").fadeIn();
	$('.help').append('<p class="detailsheadingpopup">Hilfe</p>');
	$('.help').append('<p class="subheading">Kurs erstellen und Kurs hinzuf&uuml;gen');
	$('.help').append('</p>');
	$('.help').append('<p>Unter "Neuer Kurs" kann ein neuer Kurs angelegt werden. Dieser Kurs steht dann allen Nutzern der StundenPlaner-Plattform zur Verf&uuml;gung. Damit der Kurs dann auch in deinem Stundenplan erscheint, musst du auf die Seite gehen, die deinen Stundenplan anzeigt (Startseite) und "Kurs hinzuf&uuml;gen" klicken. In dem ge&ouml;ffneten Popup w&auml;hlst du nun den gerade erstellten Kurs aus.</p>');
	$('.help').append('<p class="subheading">Account Informationen</p>');
	$('.help').append('<p>Deine Account-Informationen kannst du unter "Account" einsehen. Um &Auml;nderungen an deinen Informationen vorzunehmen, klicke auf den Stift neben der &Uuml;berschrift. Auf der folgenden Seite gebe die Neuen Informationen ein und speichere sie ab. Die Einstellung, ob du anderen in einem Kurs als Teilnehmer angezeigt werden m&ouml;chtest, kannst die direkt auf der "Account"-Seite &auml;ndern.</p>');
	$('.help').append('<p class="subheading">Kurs ansehen</p>');
	$('.help').append('<p>Um die Informationen und Kommentare zu einem Kurs in deinem Stundenplan anzusehen, dr&uuml;cke auf das Auge, das erscheint, wenn du die Maus auf den Kurs in deinem Stundenplan bewegest.</p>');
	$('.help').append('<button class="close" onClick="closeHelp()">Schlie&szlig;en</button>');
	$(".help").animate({opacity: 1});
	$(".help").css('z-index', '3');
	$(".help").css('pointer-events', 'auto');
}

function closePopup() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	$(".overlay").fadeOut();
};

function closeHelp() {
	$(".help").animate({opacity: 0.0});	
	$(".help").css('pointer-events', 'none');
	$(".help").css('z-index', '-1');
	$('.help').empty();
	$(".overlay").fadeOut();
};

function closePopup2() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = './index.html';
};
function closePopup21() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = './register.html';
};

function closePopup22() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	window.location.href = './createTimetable.html';
};


function addCourse(){
	$('#courseadding').append('<li><label class="formlabel">Kurszeit '+i+': </label><input class="course" type="text" name="course'+i+'" value="HH:MM"><input class="course1" type="text" name="course'+i+'1" value="HH:MM"></li>');
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

function openAccountForm() {
	var username = document.getElementById("accountusername").innerHTML;
	var email = document.getElementById("accountemail");
	$('#usernameaccount').val(username);
	window.location.href = './changeAccount.html';
	
}

function editAccount() {
	window.location.href = './account.html';
}

function showNotification(infotext){
	$('#noti').append('<p>'+infotext+'</p>');
	$("#noti").animate({opacity: 1});
	$("#noti").css('z-index', '3');
	$("#noti").css('pointer-events', 'auto');
	$("#noti").animate({opacity: 1.0}, 10000).fadeOut('slow');
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
				$('#popup2').append('<button class="close2" onClick="closePopup21();">OK</button>');	
				$("#popup2").animate({opacity: 1});
				$("#popup2").css('z-index', '3');
				$("#popup2").css('pointer-events', 'auto');
			}
		});
	
}

function showPopup22(){
	console.log("check "+this.timebool);
	var bool = this.timebool;
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


function timetablesoap(email, pw, ttname, tpname, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createTimetable><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:ttName>' + ttname + '</q0:ttName><q0:tpName>' + tpname + '</q0:tpName></q0:createTimetable>', 'q0', 'http://service.tomcat.denevell.org');
   	
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
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimetable');

        },
        success : function (respxml) {
			var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("timetable erstellt: "+ bool);
			//showPopup22();	
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
		
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    e.preventDefault();
    return false;
    
	/*xmlhttp.onreadystatechange = function () {
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
    xmlhttp.send(xml);*/
}

function coursesoap(start, end, tpname, ttname, email, pw, index, e, i, length){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createHour><q0:start>' + start + '</q0:start><q0:end>' + end + '</q0:end><q0:tpName>' + tpname + '</q0:tpName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:hourIndex>' + index + '</q0:hourIndex></q0:createHour>', 'q0', 'http://service.tomcat.denevell.org');
   	
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
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createHour');

        },
        success : function (respxml) {
			var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("course ertsellt: "+bool);
			if(i == length-1){
				timetablesoap(email, pw, ttname, tpname, e);
			}
			//_this.showPopup2(bool);		
			//return bool;
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    e.preventDefault();
    return false;
    
	/*xmlhttp.onreadystatechange = function () {
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
    xmlhttp.send(xml);*/
}

function timeprofilesoap(tpname, email, pw, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createTimeprofile', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:createTimeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:tpName>' + tpname + '</q0:tpName></q0:createTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
   	var bool = false;
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
    e.preventDefault();
    return bool;
    
	/*xmlhttp.onreadystatechange = function () {
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
    xmlhttp.send(xml);*/
}



//###################### soap functions ##########################


function buildSOAPEnvelope(payload, target_prefix, target_ns){
	return '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:'
			+(target_prefix || 'q0')
			+'="'
			+(target_ns || this.ns)
			+'"><soapenv:Body>'+payload+'</soapenv:Body></soapenv:Envelope>';
}

