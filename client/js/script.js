var i = 2;
var h = 600;
var url = "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl";
var ns = "http://service.tomcat.denevell.org";
var timebool = false;
var registercheck = false;
var regcounter = 0;
var _this = this;

$(document).ready(
		function() {			
			//################# registrieren ################
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
			// ################## createTimetable ###################
			$('.createtimetablebutton').click(function(e){
				var ttname = document.forms["formtimetable"].elements["ttname"].value;
				var tpname = ttname //document.forms["formtimetable"].elements["tpname"].value;
				if(ttname != ""){
					var email = window.localStorage.getItem("email");
					var pw = window.localStorage.getItem("password");
					
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
				}else{
					console.log("Name darf nicht leer sein.");
				}				
			});
			//################## get timetable data ###################
			$('#testgettt').click(function(e){
				
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				var xmlhttp = new XMLHttpRequest();
			    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl', false);

			    // build SOAP request
			    var xml = buildSOAPEnvelope('<q0:getTimetableData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + 'test' + '</q0:timetableName></q0:getTimetableData>', 'q0', 'http://service.tomcat.denevell.org');
			   	var bool = false;
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
			            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimetableData');

			        },
			        success : function (respxml) {
						//bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
						console.log("timetable: "+respxml);
	
			        },
			        error : function (xhr, status, errorThrown) {
			            console.log("error: "+errorThrown);
			        }
			    });			    
			    
			    e.preventDefault();
				return false;
				
			});
			//############### create a course ####################
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
							if(bool){
								_this.showNotification("Kurs "+name+" erstellt.");
							}else{
								_this.showNotification("Fehler: Kurs nicht erstellt.");
							}
							
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			//################### delete account ####################
			$("#deleteaccountbutton").click(function(e){
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeAccount', false);

		        // build SOAP request
		        var xml = buildSOAPEnvelope('<q0:removeAccount><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeAccount>', 'q0', 'http://service.tomcat.denevell.org');
		        jQuery.support.cors = true;
		        jQuery.ajax({
		            type : "POST",
		            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeAccount",
		            data : xml,
		            contentType : "text/xml; charset=utf-8",
		            dataType : "text xml",
		            cache: false,
		            beforeSend: function (xmlhttp) {
		            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeAccount');
		            },
		            success : function (respxml) {
		            	var bool = respxml.getElementsByTagName("removeAccountReturn")[0].firstChild.nodeValue;
						console.log("Löschen erfolgreich: "+bool);
						window.location.href = './login.html';						
		            },
		            error : function (xhr, status, errorThrown) {
		                console.log("error: "+errorThrown);
		            }
		        });
		        e.preventDefault();
		        return false;
			
			});
			//################### edit account ####################
			$("#editAccount").click(function(e){
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				var username = document.forms["changeaccountform"].elements["newusername"].value;
				
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editAccount', false);

		        // build SOAP request
		        var xml = buildSOAPEnvelope('<q0:editAccount><q0:username>' + username + '</q0:username><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:editAccount>', 'q0', 'http://service.tomcat.denevell.org');
		        jQuery.support.cors = true;
		        jQuery.ajax({
		            type : "POST",
		            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editAccount",
		            data : xml,
		            contentType : "text/xml; charset=utf-8",
		            dataType : "text xml",
		            cache: false,
		            beforeSend: function (xmlhttp) {
		            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editAccount');
		            },
		            success : function (respxml) {
		            	var bool = respxml.getElementsByTagName("editAccountReturn")[0].firstChild.nodeValue;
						console.log("Ändern erfolgreich: "+bool);
						window.location.href = './account.html';
											
		            },
		            error : function (xhr, status, errorThrown) {
		                console.log("error: "+errorThrown);
		            }
		        });
		        e.preventDefault();
		        return false;
			
			});
			// ################## add visited course to timetable ########################
			$("#addviscoursebutton").click(function(e){
				var course = document.forms["addviscourseform"].elements["courseselect"].value;
				var daystring = document.forms["addviscourseform"].elements["dayselect"].value;
				var index = document.forms["addviscourseform"].elements["hourselect"].value;
				
				console.log("course: "+course);
				console.log("day: "+daystring);
				var day = daystring;
				/*switch(daystring){
					case "Montag": day = 1; break;
					case "Dienstag": day = 2; break;
					case "Mittwoch": day = 3; break;
					case "Donnerstag": day = 4; break;
					case "Freitag": day = 5; break;
					case "Samstag": day = 6; break;
				}
				console.log("day2: "+day);*/
				
				var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
				var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
				var ttname = "test";//document.forms["formtt"].elements["timetables"].options[selektiert].text;
				var tpname = ttname;
				console.log("timetable: "+ttname);
				
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				//if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
				//	console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
					//popup mit Fehlermeldung
				//}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createVisitedCourse', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:createVisitedCourse><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:ttName>' + ttname + '</q0:ttName><q0:tpName>' + tpname + '</q0:tpName><q0:courseName>' + course + '</q0:courseName><q0:day>' + day + '</q0:day><q0:hourIndex>' + index + '</q0:hourIndex></q0:createVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createVisitedCourse",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createVisitedCourse');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createVisitedCourseReturn")[0].firstChild.nodeValue;
							console.log("Besuchter Kurs erfolgreich erstellt: "+bool);
							//_this.showPopup2(bool);	
							//window.location.href = 'http://localhost:8080/timetableClient/index.html';
							if(bool){
								_this.showNotification("Kurs "+course+" hinzugef&uuml;gt.");
							}else{
								_this.showNotification("Fehler: Kurs nicht hinzugef&uuml;gt.");
							}
							
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				//}
			});
			//################# delete timetable #################
			$("#deletett").click(function(e){
				var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
				var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
				var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
								
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				if(ttname == "" || ttname == null){
					console.log("Textfeld darf nicht leer sein.");					
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimetable', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:removeTimetable><q0:ttName>' + ttname + '</q0:ttName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeTimetable>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimetable",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimetable');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("removeTimetableReturn")[0].firstChild.nodeValue;
							console.log("Timetable erfolgreich entfernt: "+bool);
							if(bool){
								//deleteTimeprofile(ttname);
								window.location.href = "./index.html";
							}
						},
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			//################# change timetable name #################
			$("#changettname").click(function(e){
				var newname = document.forms["changettnameform"].elements["newttname"].value;
				console.log("name: "+newname);								
				var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
				var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
				var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
				var tpname = ttname;
								
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				if(ttname == "" || ttname == null){
					console.log("Textfeld darf nicht leer sein.");					
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editTimetable', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:editTimetable><q0:ttName>' + ttname + '</q0:ttName><q0:tpName>' + tpname + '</q0:tpName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:editTimetable>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editTimetable",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/editTimetable');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("editTimetableReturn")[0].firstChild.nodeValue;
							console.log("Timetable erfolgreich bearbeitet: "+bool);
							if(bool){
								_this.showNotification("Name ge&auml;ndert.");
							}else{
								_this.showNotification("Fehler: Name nicht ge&auml;ndert.");
							}	
							window.location.href = "./index.html";
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			//################# publish a comment for a certain course #################
			$("#publishcomment").click(function(e){
				var comment = document.forms["commentform"].elements["writtencomment"].value;
				console.log("comment: "+comment);								
												
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				var coursename = window.localStorage.getItem("cname");
				
				if(comment == "" || comment == null){
					console.log("Textfeld darf nicht leer sein.");					
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createComment', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope('<q0:createComment><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:c>' + comment + '</q0:c><q0:courseName>' + coursename + '</q0:courseName></q0:createComment>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createComment",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createComment');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createCommentReturn")[0].firstChild.nodeValue;
							console.log("Kommentar erfolgreich erstellt: "+bool);
							
							window.location.href = "./details.html";
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


//################### show Popup functions #######################

function showAddCourse(){
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var text = document.forms["formtt"].elements["timetables"].options[selektiert].text;
	$(".overlay").fadeIn();
	
	$("#popupaddcourse").animate({opacity: 1});
	$("#popupaddcourse").css('z-index', '3');
	$("#popupaddcourse").css('pointer-events', 'auto');
}

function showHelp(){
	$(".overlay").fadeIn();
	$('.help').append('<p class="detailsheadingpopup">Hilfe</p>');
	
	$('.help').append('<p class="subheading">Kurs erstellen und Kurs hinzuf&uuml;gen</p>');
	$('.help').append('<p>Unter "Neuer Kurs" kann ein neuer Kurs angelegt werden. Dieser Kurs steht dann allen Nutzern der StundenPlaner-Plattform zur Verf&uuml;gung. Damit der Kurs dann auch in deinem Stundenplan erscheint, musst du auf die Seite gehen, die deinen Stundenplan anzeigt (Startseite) und "Kurs hinzuf&uuml;gen" klicken. In dem ge&ouml;ffneten Popup w&auml;hlst du nun den gerade erstellten Kurs aus.</p>');
	
	$('.help').append('<p class="subheading">Kurs ansehen oder l&ouml;schen</p>');
	$('.help').append('<p>Um die Informationen und Kommentare zu einem Kurs in deinem Stundenplan anzusehen, dr&uuml;cke auf das Auge im entprechenden Feld des Stundenplans. Zum Entfernen des Kurses aus deinem Stundenplan dr&uuml;cke das M&uuml;lleimersymbol rechts neben dem Auge.</p>');
	
	$('.help').append('<p class="subheading">Account Informationen</p>');
	$('.help').append('<p>Deine Account-Informationen kannst du unter "Account" einsehen. Um &Auml;nderungen an deinen Informationen vorzunehmen, klicke auf den Stift neben der &Uuml;berschrift. Auf der folgenden Seite gebe die Neuen Informationen ein und speichere sie ab. Die Einstellung, ob du anderen in einem Kurs als Teilnehmer angezeigt werden m&ouml;chtest, kannst die direkt auf der "Account"-Seite &auml;ndern.</p>');
	
	$('.help').append('<button class="close" onClick="closeHelp()">Schlie&szlig;en</button>');
	$(".help").animate({opacity: 1});
	$(".help").css('z-index', '3');
	$(".help").css('pointer-events', 'auto');
}

function showCheckDelete(){
	$(".overlay").fadeIn();	
	$("#checkdelete").animate({opacity: 1});
	$("#checkdelete").css('z-index', '3');
	$("#checkdelete").css('pointer-events', 'auto');
}

function openDeleteTT(){
	$(".overlay").fadeIn();	
	$("#popupdeletett").animate({opacity: 1});
	$("#popupdeletett").css('z-index', '3');
	$("#popupdeletett").css('pointer-events', 'auto');
}

function openChangeTTname(){
	$(".overlay").fadeIn();	
	$("#popupchangettname").animate({opacity: 1});
	$("#popupchangettname").css('z-index', '3');
	$("#popupchangettname").css('pointer-events', 'auto');
}

function openChangeAccount(){
	$(".overlay").fadeIn();	
	$("#changeaccount").animate({opacity: 1});
	$("#changeaccount").css('z-index', '3');
	$("#changeaccount").css('pointer-events', 'auto');
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

//################### close Popup functions #######################

function closePopup() {
	//$("#popup").css('opacity', '0.0');
	$("#popup").animate({opacity: 0.0});	
	$("#popup").css('pointer-events', 'none');
	$("#popup").css('z-index', '-1');
	$('#popup').empty();
	$(".overlay").fadeOut();
};

function closeAddCoursePopup() {
	//$("#popup").css('opacity', '0.0');
	$("#popupaddcourse").animate({opacity: 0.0});	
	$("#popupaddcourse").css('pointer-events', 'none');
	$("#popupaddcourse").css('z-index', '-1');
	$('#popupaddcourse').empty();
	$(".overlay").fadeOut();
};

function closeHelp() {
	$(".help").animate({opacity: 0.0});	
	$(".help").css('pointer-events', 'none');
	$(".help").css('z-index', '-1');
	$('.help').empty();
	$(".overlay").fadeOut();
};

function closeCheckDelete(){
	$("#checkdelete").animate({opacity: 0.0});	
	$("#checkdelete").css('pointer-events', 'none');
	$("#checkdelete").css('z-index', '-1');
	$('#checkdelete').empty();
	$(".overlay").fadeOut();
}

function closeChangeTTPopup(){
	$("#popupchangettname").animate({opacity: 0.0});	
	$("#popupchangettname").css('pointer-events', 'none');
	$("#popupchangettname").css('z-index', '-1');
	$('#popupchangettname').empty();
	$(".overlay").fadeOut();
}

function closeDeleteTTPopup(){
	$("#popupdeletett").animate({opacity: 0.0});	
	$("#popupdeletett").css('pointer-events', 'none');
	$("#popupdeletett").css('z-index', '-1');
	$('#popupdeletett').empty();
	$(".overlay").fadeOut();
}

function closeChangeAccount(){
	$("#changeaccount").animate({opacity: 0.0});	
	$("#changeaccount").css('pointer-events', 'none');
	$("#changeaccount").css('z-index', '-1');
	$('#changeaccount').empty();
	$(".overlay").fadeOut();
}

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

//#################### add a course input on page ###################

function addCourse(){
	$('#courseadding').append('<li><label class="formlabel">Kurszeit '+i+': </label><input class="course" type="text" name="course'+i+'" value="HH:MM"><input class="course1" type="text" name="course'+i+'1" value="HH:MM"></li>');
	//var currentheight = h+26;
	//console.log(currentheight);
	//$('.wrapped').css("min-height", currentheight+"px");
	i = i+1;
	//h = h +26;
}

//################## functions for displaying comments ####################

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

//################## account functions ####################

function openAccountForm() {
	var username = document.getElementById("accountusername").innerHTML;
	var email = document.getElementById("accountemail");
	$('#usernameaccount').val(username);
	window.location.href = './changeAccount.html';
	
}

function editAccount() {
	window.location.href = './account.html';
}

function getAccountInfos(){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getAccountData', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:getAccountData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:getAccountData>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getAccountData",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getAccountData');
        },
        success : function (respxml) {
			//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
			var jsonpure = respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue;
			var json = JSON.parse(jsonpure);
			var username = json.username;
			var emailj = json.email;

			$('#accountusername').append('<p>'+username+'</p>');
			$('#accountemail').append('<p>'+emailj+'</p>');

        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    //e.preventDefault();
    return false;	
}

// ################### get timetable data ####################

function getTimetable(){
	
	var ttname = document.forms["formtt"].elements["timetables"].value;				
	
	if(ttname == "Stundenplan w&auml;hlen"){
		console.log("Kein Stundenplan gewählt.");
	}else{
	
		var email = window.localStorage.getItem("email");
		var pw = window.localStorage.getItem("password");
		
		var xmlhttp = new XMLHttpRequest();
	    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimetableData', false);
	
	    // build SOAP request
	    var xml = buildSOAPEnvelope('<q0:getTimetableData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName></q0:getTimetableData>', 'q0', 'http://service.tomcat.denevell.org');
	    jQuery.support.cors = true;
	    jQuery.ajax({
	        type : "POST",
	        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimetableData",
	        data : xml,
	        contentType : "text/xml; charset=utf-8",
	        dataType : "text xml",
	        cache: false,
	        beforeSend: function (xmlhttp) {
	        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimetableData');
	        },
	        success : function (respxml) {
				//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
				var jsonpure = respxml.getElementsByTagName("getTimetableDataReturn")[0].firstChild.nodeValue;
				console.log("timetable: "+jsonpure);
				var json = JSON.parse(jsonpure);
				var name = json.name;
				var tpname = json.timeprofile.name;
				console.log("tpname: "+tpname);
				//getTimeprofileData(tpname);
				
				var xmlhttp = new XMLHttpRequest();
			    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData', false);
			
			    // build SOAP request
			    var xml = buildSOAPEnvelope('<q0:getTimeprofileData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timeprofileName>' + tpname + '</q0:timeprofileName></q0:getTimeprofileData>', 'q0', 'http://service.tomcat.denevell.org');
			    jQuery.support.cors = true;
			    jQuery.ajax({
			        type : "POST",
			        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData",
			        data : xml,
			        contentType : "text/xml; charset=utf-8",
			        dataType : "text xml",
			        cache: false,
			        beforeSend: function (xmlhttp) {
			        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData');
			        },
			        success : function (respxml) {
						//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
						var jsonpure = respxml.getElementsByTagName("getTimeprofileDataReturn")[0].firstChild.nodeValue;
						console.log("timeprofile: "+jsonpure);
						//var json = JSON.parse(jsonpure);
						//var name = json.name;
						//var tpname = json.timeprofile.name;
						//getTimeprofileData();
			        },
			        error : function (xhr, status, errorThrown) {
			            console.log("error: "+errorThrown);
			        }
			    });
				
				
	        },
	        error : function (xhr, status, errorThrown) {
	            console.log("error: "+errorThrown);
	        }
	    });
	    //e.preventDefault();
	    return false;	
	}
}

function getTimeprofileData(tpname){
	
		var email = window.localStorage.getItem("email");
		var pw = window.localStorage.getItem("password");
		
		var xmlhttp = new XMLHttpRequest();
	    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData', false);
	
	    // build SOAP request
	    var xml = buildSOAPEnvelope('<q0:getTimeprofileData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timeprofileName>' + tpname + '</q0:timeprofileName></q0:getTimeprofileData>', 'q0', 'http://service.tomcat.denevell.org');
	    jQuery.support.cors = true;
	    jQuery.ajax({
	        type : "POST",
	        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData",
	        data : xml,
	        contentType : "text/xml; charset=utf-8",
	        dataType : "text xml",
	        cache: false,
	        beforeSend: function (xmlhttp) {
	        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getTimeprofileData');
	        },
	        success : function (respxml) {
				//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
				var jsonpure = respxml.getElementsByTagName("getTimeprofileDataReturn")[0].firstChild.nodeValue;
				console.log("timeprofile: "+jsonpure);
				//var json = JSON.parse(jsonpure);
				//var name = json.name;
				//var tpname = json.timeprofile.name;
				//getTimeprofileData();
	        },
	        error : function (xhr, status, errorThrown) {
	            console.log("error: "+errorThrown);
	        }
	    });
	    //e.preventDefault();
	    return false;	
	
}

// ################### new timetable soap functions ####################

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

//##################### add visited Course #####################

function addVisCourse(){
	var selektiertc = document.forms["addviscourseform"].elements["courseselect"].selectedIndex;
	var wertc = document.forms["addviscourseform"].elements["courseselect"].options[selektiert].value;
	var course = document.forms["addviscourseform"].elements["courseselect"].options[selektiert].text;
	
	var selektiertd = document.forms["addviscourseform"].elements["dayselect"].selectedIndex;
	var wertd = document.forms["addviscourseform"].elements["dayselect"].options[selektiert].value;
	var day = document.forms["addviscourseform"].elements["dayselect"].options[selektiert].text;
	
	var selektierti = document.forms["addviscourseform"].elements["hourselect"].selectedIndex;
	var werti = document.forms["addviscourseform"].elements["hourselect"].options[selektiert].value;
	var index = document.forms["addviscourseform"].elements["hourselect"].options[selektiert].text;
	
	console.log("course: "+course);
	
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
	var tpname = ttname;
	
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	
	//if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
	//	console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
		//popup mit Fehlermeldung
	//}else{					
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createVisitedCourse', false);

        // build SOAP request
        var xml = buildSOAPEnvelope('<q0:createVisitedCours><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:ttName>' + ttname + '</q0:ttName><q0:tpName>' + tpname + '</q0:tpName><q0:courseName>' + course + '</q0:courseName><q0:day>' + day + '</q0:day><q0:hourIndex>' + index + '</q0:hourIndex></q0:createVisitedCours>', 'q0', 'http://service.tomcat.denevell.org');
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
                xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/createVisitedCours');
            },
            success : function (respxml) {
            	var bool = respxml.getElementsByTagName("createVisitedCourseReturn")[0].firstChild.nodeValue;
				console.log("besuchter Kurs erfolgreich erstellt: "+bool);
				//_this.showPopup2(bool);	
				//window.location.href = 'http://localhost:8080/timetableClient/index.html';
				_this.showNotification("Kurs "+course+" hinzugef&uuml;gt.");
            },
            error : function (xhr, status, errorThrown) {
                console.log("error: "+errorThrown);
            }
        });
        e.preventDefault();
        return false;
	//}
}

//##################### details #####################

function gotoDetails(cname){
	window.localStorage.setItem("cname", cname);
	window.location.href = './details.html';			
}

function getCourseData(){			
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	var coursename = window.localStorage.getItem("cname");	
					
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getCourseData', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:getCourseData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:courseName>' + coursename + '</q0:courseName></q0:getCourseData>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getCourseData",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/getCourseData');
        },
        success : function (respxml) {
        	var jsonpure = respxml.getElementsByTagName("getCourseDataReturn")[0].firstChild.nodeValue;
        	console.log("kursdaten: "+jsonpure);
			var json = JSON.parse(jsonpure);
			var coursefull = json.name;
			var courseshort = json.shortname;
			var teacher = json.teacher;
			var descr = json.description;
			var room = json.room;

			$('.details-right').append('<span class="detailsheading">'+coursefull+'</span>');
			$('.details-right').append('</br>');
			$('.details-right').append('<p><label class="formlabel">Abk&uuml;rzung:</label> '+courseshort+'</p>');
			$('.details-right').append('<p><label class="formlabel">Lehrende/r:</label> '+teacher+'</p>');
			$('.details-right').append('<p><label class="formlabel">Raum:</label> '+room+'</p>');
			$('.details-right').append('<p><label class="formlabel">Beschreibung:</label> '+descr+'</p>');
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    //e.preventDefault();
    return false;
}

function deleteCourse(cname){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	var ttname = document.forms["formtt"].elements["timetables"].value;				
					
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeVisitedCourse', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:removeVisitedCourse><q0:courseName>' + cname + '</q0:courseName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:ttName>' + ttname + '</q0:ttName></q0:removeVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeVisitedCourse",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeVisitedCourse');
        },
        success : function (respxml) {
        	var bool = respxml.getElementsByTagName("removeVisitedCourseReturn")[0].firstChild.nodeValue;
			console.log("Besuchter Kurs erfolgreich entfernt: "+bool);
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    //e.preventDefault();
    return false;
}

function deleteTimeprofile(tpname){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
						
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimeprofile', false);

    // build SOAP request
    var xml = buildSOAPEnvelope('<q0:removeTimeprofile><q0:timeprofile>' + tpname + '</q0:timeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimeprofile",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', 'http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl/removeTimeprofile');
        },
        success : function (respxml) {
        	var bool = respxml.getElementsByTagName("removeTimeprofileReturn")[0].firstChild.nodeValue;
			console.log("Timeprofile entfernt: "+bool);	
			return false;
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
        }
    });
    //e.preventDefault();
    return false;
}

//###################### soap functions ##########################

function buildSOAPEnvelope(payload, target_prefix, target_ns){
	return '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:'
			+(target_prefix || 'q0')
			+'="'
			+(target_ns || this.ns)
			+'"><soapenv:Body>'+payload+'</soapenv:Body></soapenv:Envelope>';
}

