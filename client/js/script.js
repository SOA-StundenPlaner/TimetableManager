//url of server -> change this, when using an other server address
var url = "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl";

//ns of wsdl
var ns = "http://service.tomcat.denevell.org";

var i = 2;
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
				var password = document.forms["formreg"].elements["pw"].value;
				var pw2 = document.forms["formreg"].elements["pw2"].value;
				
				if(un == "" || un == null || password == "" || password == null || pw2 == "" || pw2 == null || em == "" || em == null){
					console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgef&uuml;llt werden.");
					$("#errornoti").html("Bitte alle Textfelder ausf&uuml;llen.");
					return false;
				}else if(password != pw2){
					console.log("Passwörter stimmen nicht überein.");
					$("#errornoti").html("Passw&ouml;rter stimmen nicht &uuml;berein.");
					return false;
				}else{
					//var pw = MD5(password);
					var shaObj = new jsSHA(password, "TEXT");
					var pw = shaObj.getHash("SHA-512", "HEX");
					window.localStorage.setItem("email", em);
					window.localStorage.setItem("password", pw);
					window.localStorage.setItem("username", un);
					//default: visible
					var vis = 1;
					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/createAccount', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(em, pw,'<q0:createAccount><q0:username>' + un + '</q0:username><q0:password>' + pw + '</q0:password><q0:email>' + em + '</q0:email><q0:visibility>' + vis + '</q0:visibility></q0:createAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/createAccount",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createAccount');

			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createAccountReturn")[0].childNodes[0].nodeValue;
							console.log("Erfolgreich registriert: "+bool);
							_this.showPopup2(bool);		
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornoti").html("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
							return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			//################# login ################
			$('#loginbutton').click(function(e){
				var em = document.forms["auth"].elements["loginemail"].value;
				var pw = document.forms["auth"].elements["loginpw"].value;
				if(pw == null || pw == "" || em == null || em == ""){
					$("#errornoti").html("Bitte alle Textfelder ausf&uuml;llen.");
					return false;
				}else{
					//var pww = MD5(pw);
					var shaObj = new jsSHA(pw, "TEXT");
					var pww = shaObj.getHash("SHA-512", "HEX");
					window.localStorage.setItem("email", em);
					window.localStorage.setItem("password", pww);
					window.location.href= "./index.html";
					return false;
				}
				
				
			});
			// ################## createTimetable ###################
			$('.createtimetablebutton').click(function(e){
				var ttname = document.forms["formtimetable"].elements["ttname"].value;
				var tpname = ttname; //document.forms["formtimetable"].elements["tpname"].value;
				if(ttname != "" && ttname != null){
					var email = window.localStorage.getItem("email");
					var pw = window.localStorage.getItem("password");
					
					var xmlhttp = new XMLHttpRequest();
				    xmlhttp.open('POST', _this.url+'/createTimeprofile', false);

				    // build SOAP request
				    var xml = buildSOAPEnvelope(email, pw, '<q0:createTimeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timeprofileName>' + tpname + '</q0:timeprofileName></q0:createTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
				   	var bool = false;
				   	var courses = document.getElementsByClassName('course');
					var courses2 = document.getElementsByClassName('course1');
				    jQuery.support.cors = true;
				    jQuery.ajax({
				        type : "POST",
				        url : _this.url+"/createTimeprofile",
				        data : xml,
				        contentType : "text/xml; charset=utf-8",
				        dataType : "text xml",
				        cache: false,
				        callback: showPopup22(),
				        beforeSend: function (xmlhttp) {
				        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
				            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createTimeprofile');

				        },
				        success : function (respxml) {
							bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
							console.log("timeprofile erstellt: "+bool);
							var index = 1;
							var leng = courses.length;
							for(var i = 0; i < courses.length; i ++){
								var start = courses[i].value;
								var end = courses2[i].value;								
								if(start!= '' && start != 'HH:MM' && end != '' && end != 'HH:MM' && start.indexOf(':') > -1 && end.indexOf(':') > -1){
									coursesoap(start, end, tpname, ttname, email, pw, index, e, i, leng);
									var index = index+1;
								}else{
									leng = leng -1;
									if(i == leng){
										timetablesoap(email, pw, ttname, tpname, e);
										break;
									}
								}								
							}
							//return;
							//_this.showPopup2(bool);		
				        },
				        error : function (xhr, status, errorThrown) {
				            console.log("error: "+errorThrown);
				            $('#errornoti').html("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
				            return false;
				        }
				    });			    
				    
				    e.preventDefault();
					return false;
				}else{
					$('#errornoti').html("Name darf nicht leer sein.");
					console.log("Name darf nicht leer sein.");
					return false;
				}				
			});			
			//############### create a course ####################
			$("#createCourseButton").click(function(e){
				var name = document.forms["createCourseForm"].elements["coursename"].value;
				var shortname = document.forms["createCourseForm"].elements["courseshortname"].value;
				var teacher = document.forms["createCourseForm"].elements["courseteacher"].value;
				var descr = document.forms["createCourseForm"].elements["coursedescr"].value;
				var room = document.forms["createCourseForm"].elements["courseroom"].value;
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
					console.log("Alle Textfelder m&uuml;ssen ausgef&uuml;llt werden.");
					$('#errornoti').html("Bitte alle Textfelder ausf&uuml;llen.");
					return false;
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/createCourse', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:createCourse><q0:name>' + name + '</q0:name><q0:shortname>' + shortname + '</q0:shortname><q0:teacher>' + teacher + '</q0:teacher><q0:description>' + descr + '</q0:description><q0:room>' + room + '</q0:room></q0:createCourse>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/createCourse",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createCourse');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createCourseReturn")[0].childNodes[0].nodeValue;
							console.log("Kurs erfolgreich erstellt: "+bool);
							if(bool){
								_this.showNotification("Kurs "+name+" erstellt.");
								document.forms["createCourseForm"].reset();
							}else{
								_this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
							}
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornoti").html("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
			                return false;
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
		        xmlhttp.open('POST', _this.url+'/removeAccount', false);

		        // build SOAP request
		        var xml = buildSOAPEnvelope(email, pw, '<q0:removeAccount><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeAccount>', 'q0', 'http://service.tomcat.denevell.org');
		        jQuery.support.cors = true;
		        jQuery.ajax({
		            type : "POST",
		            url : _this.url+"/removeAccount",
		            data : xml,
		            contentType : "text/xml; charset=utf-8",
		            dataType : "text xml",
		            cache: false,
		            beforeSend: function (xmlhttp) {
		            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/removeAccount');
		            },
		            success : function (respxml) {
		            	var bool = respxml.getElementsByTagName("removeAccountReturn")[0].childNodes[0].nodeValue;
						console.log("Löschen erfolgreich: "+bool);
						window.location.href = './login.html';						
		            },
		            error : function (xhr, status, errorThrown) {
		                console.log("error: "+errorThrown);
		                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
		                return false;
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
				var visi = window.localStorage.getItem("vis");
				/*var vis = $('input:radio[name="showasmember"]').val();
				var visi = 0;
				if(vis == 'yes'){
					visi = 1;
				}*/
				if(username != "" && username != null){
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/editAccount', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:editAccount><q0:newUsername>' + username + '</q0:newUsername><q0:email>' + email + '</q0:email><q0:newEmail>' + email + '</q0:newEmail><q0:password>' + pw + '</q0:password><q0:newPassword>' + pw + '</q0:newPassword><q0:newVisibility>' + visi + '</q0:newVisibility></q0:editAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/editAccount",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/editAccount');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("editAccountReturn")[0].childNodes[0].nodeValue;
							console.log("Ändern erfolgreich: "+bool);
							window.location.href = './account.html';
												
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}else{
					console.log("Textfeld darf nicht leer sein.");
					$("#errornotiu").html("Textfeld darf nicht leer sein.");
					return false;
				}						
			
			});
			$("#editEmail").click(function(e){
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				var newemail = document.forms["changeemailform"].elements["newemail"].value;
				
				var username = $('#aun').html();
				var visi = window.localStorage.getItem("vis");

				var atpos= newemail.indexOf("@");
				var dotpos= newemail.lastIndexOf(".");
				
				if(newemail == "" || newemail == null){
					console.log("Textfeld darf nicht leer sein.");
					$("#errornotie").html("Textfeld darf nicht leer sein.");
					return false;					
					
				}else if(atpos<1 || dotpos<atpos+2 || dotpos+2>=newemail.length){
					console.log("Keine valide E-Mail-Adresse.");
					$("#errornotie").html("Keine valide E-Mail-Adresse.");
					return false;
					  
				}else{
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/editAccount', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:editAccount><q0:newUsername>' + username + '</q0:newUsername><q0:email>' + email + '</q0:email><q0:newEmail>' + newemail + '</q0:newEmail><q0:password>' + pw + '</q0:password><q0:newPassword>' + pw + '</q0:newPassword><q0:newVisibility>' + visi + '</q0:newVisibility></q0:editAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/editAccount",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/editAccount');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("editAccountReturn")[0].childNodes[0].nodeValue;
							console.log("Ändern erfolgreich: "+bool);
							window.localStorage.setItem("email", newemail);
							window.location.href = './account.html';
												
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}					
			
			});
			$("#editPw").click(function(e){
				var email = window.localStorage.getItem("email");
				var vpw = window.localStorage.getItem("password");
				var pww = $('input:password[name="oldpw"]').val();
				//var pw = MD5(pww);
				var shaObj = new jsSHA(pww, "TEXT");
				var pw = shaObj.getHash("SHA-512", "HEX");
				var newpww = $('input:password[name="newpw"]').val();
				var newpw2 = $('input:password[name="newpw2"]').val();;
				
				var username = $('#aun').html();
				var visi = window.localStorage.getItem("vis");
				console.log(pw);
				console.log(vpw);
				if(pww == null || pww == '' || newpww == null || newpww == '' || newpw2 == null || newpw2 == ''){
					$("#errornoti").html("Bitte alle Textfelder ausf&uuml;llen.");
					return false;	
				}else if(newpww != newpw2){
					$("#errornoti").html("Neue Passw&ouml;rter stimmen nicht &uuml;berein.");
					return false;					
				}else if(pw != vpw){
					$("#errornoti").html("Passwort nicht korrekt.");
					return false;					
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/editAccount', false);
			        //var newpw = MD5(newpww);
			        var shaObj = new jsSHA(newpww, "TEXT");
					var newpw = shaObj.getHash("SHA-512", "HEX");
			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, vpw, '<q0:editAccount><q0:newUsername>' + username + '</q0:newUsername><q0:email>' + email + '</q0:email><q0:newEmail>' + email + '</q0:newEmail><q0:password>' + pw + '</q0:password><q0:newPassword>' + newpw + '</q0:newPassword><q0:newVisibility>' + visi + '</q0:newVisibility></q0:editAccount>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/editAccount",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/editAccount');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("editAccountReturn")[0].childNodes[0].nodeValue;
							console.log("Ändern erfolgreich: "+bool);
							window.localStorage.setItem("password", newpw);
							//window.location.href = './account.html';
							if(bool){
								_this.showNotification("Passwort ge&auml;ndert.");
								_this.closeChangePW();
							}else{
								_this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
							}	
							return false;
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornoti").html("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}				
			
			});
			$("#changeShowMemberButton").click(function(e){
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				var username = $('#aun').html();
				var vis = $('input:radio[name="showasmember"]:checked').val();
				var visi = 0;
				if(vis == 'yes'){
					visi = 1;
				}
				
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open('POST', _this.url+'/editAccount', false);

		        // build SOAP request
		        var xml = buildSOAPEnvelope(email, pw, '<q0:editAccount><q0:newUsername>' + username + '</q0:newUsername><q0:email>' + email + '</q0:email><q0:newEmail>' + email + '</q0:newEmail><q0:password>' + pw + '</q0:password><q0:newPassword>' + pw + '</q0:newPassword><q0:newVisibility>' + visi + '</q0:newVisibility></q0:editAccount>', 'q0', 'http://service.tomcat.denevell.org');
		        jQuery.support.cors = true;
		        jQuery.ajax({
		            type : "POST",
		            url : _this.url+"/editAccount",
		            data : xml,
		            contentType : "text/xml; charset=utf-8",
		            dataType : "text xml",
		            cache: false,
		            beforeSend: function (xmlhttp) {
		            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/editAccount');
		            },
		            success : function (respxml) {
		            	var bool = respxml.getElementsByTagName("editAccountReturn")[0].childNodes[0].nodeValue;
						console.log("Ändern erfolgreich: "+bool);
						window.localStorage.setItem("vis", visi);
						//window.location.href = './account.html';
						if(bool){
							_this.showNotification("Sichtbarkeit ge&auml;ndert.");					
						}else{
							_this.showNotification("Fehler: Sichtbarkeit nicht ge&auml;ndert.", true);	
						}		
						return false;
		            },
		            error : function (xhr, status, errorThrown) {
		                console.log("error: "+errorThrown);
		                _this.showNotification("Serverfehler.", true);
		                return false;
		            }
		        });
		        e.preventDefault();
		        return false;
			
			});
			// ################## add visited course to timetable ########################
			$("#addviscoursebutton").click(function(e){
				var coursedescr = document.forms["addviscourseform"].elements["courseselect"].value;
				var selekt = document.forms["addviscourseform"].elements["courseselect"].selectedIndex;
				var val = document.forms["addviscourseform"].elements["courseselect"].options[selekt].value;
				var course = document.forms["addviscourseform"].elements["courseselect"].options[selekt].text;
				var daystring = document.forms["addviscourseform"].elements["dayselect"].value;
				var index = document.forms["addviscourseform"].elements["hourselect"].value;
				
				console.log("course: "+course);
				console.log("coursedescr: "+coursedescr);
				console.log("day: "+daystring);
				var day = daystring;				
				
				var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
				var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
				var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
				var tpname = ttname;
				console.log("timetable: "+ttname);
				
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				//if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
				//	console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
					//popup mit Fehlermeldung
				//}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/createVisitedCourse', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:createVisitedCourse><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName><q0:timeprofileName>' + tpname + '</q0:timeprofileName><q0:courseName>' + course + '</q0:courseName><q0:courseDescription>' + coursedescr + '</q0:courseDescription><q0:day>' + day + '</q0:day><q0:hourIndex>' + index + '</q0:hourIndex></q0:createVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/createVisitedCourse",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createVisitedCourse');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createVisitedCourseReturn")[0].childNodes[0].nodeValue;
							console.log("Besuchter Kurs erfolgreich erstellt: "+bool);							
							if(bool){
								//_this.showNotification("Kurs "+course+" hinzugef&uuml;gt.");
								window.location.href = './index.html';
							}else{
								_this.showNotification("Fehler: Kurs nicht hinzugef&uuml;gt.");
							}
							return false;
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornoti").html("Fehler: &Uuml;berpr&uuml;fe, ob alle Angaben gemacht wurden. Alles muss ausgew&auml;hlt sein.");
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				//}
			});
			//################# delete visited course ###################
			$("#deletecourse").click(function(e){
				var courname = document.forms["deletecourseform"].elements["courname"].value;
				var courdescr = document.forms["deletecourseform"].elements["courdescr"].value;
				var courday = document.forms["deletecourseform"].elements["courday"].value;
				var courhour = document.forms["deletecourseform"].elements["courhour"].value;
				var courttname = document.forms["deletecourseform"].elements["courttname"].value;
				
				console.log("course: "+courname);
				
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");				
								
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open('POST', _this.url+'/removeVisitedCourse', false);

		        // build SOAP request
		        var xml = buildSOAPEnvelope(email, pw, '<q0:removeVisitedCourse><q0:courseName>' + courname + '</q0:courseName><q0:courseDescription>' + courdescr + '</q0:courseDescription><q0:visistedCourseDay>' + courday + '</q0:visistedCourseDay><q0:visitedCourseHour>' + courhour + '</q0:visitedCourseHour><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + courttname + '</q0:timetableName></q0:removeVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
		        jQuery.support.cors = true;
		        jQuery.ajax({
		            type : "POST",
		            url : _this.url+"/createVisitedCourse",
		            data : xml,
		            contentType : "text/xml; charset=utf-8",
		            dataType : "text xml",
		            cache: false,
		            beforeSend: function (xmlhttp) {
		            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/removeVisitedCourse');
		            },
		            success : function (respxml) {
		            	var bool = respxml.getElementsByTagName("removeVisitedCourseReturn")[0].childNodes[0].nodeValue;
						console.log("Besuchter Kurs erfolgreich entfernt: "+bool);
						window.location.href= "./index.html";
						if(bool){
							_this.showNotification("Kurs erfolgreich entfernt.");
						}else{
							_this.showNotification("Fehler: Kurs nicht hinzugef&uuml;gt.");
						}
						return false;
		            },
		            error : function (xhr, status, errorThrown) {
		                console.log("error: "+errorThrown);
		                _this.showNotification("Serverfehler.", true);
		                return false;
		            }
		        });
		        e.preventDefault();
		        return false;
			
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
			        xmlhttp.open('POST', _this.url+'/removeTimetable', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:removeTimetable><q0:timetableName>' + ttname + '</q0:timetableName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeTimetable>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/removeTimetable",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/removeTimetable');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("removeTimetableReturn")[0].childNodes[0].nodeValue;
							console.log("Timetable erfolgreich entfernt: "+bool);
							if(bool){
								//deleteTimeprofile(ttname);
								window.location.href = "./index.html";
							}
						},
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
			//################# change timetable name #################
			$("#changettname").click(function(e){
				var newname = document.forms["changettnameform"].elements["newttname"].value;								
				var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
				var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
				var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
								
				var email = window.localStorage.getItem("email");
				var pw = window.localStorage.getItem("password");
				
				if(newname == "" || newname == null){
					console.log("Textfeld darf nicht leer sein.");		
					$("#errornotit").html("Textfeld darf nicht leer sein.");
					return false;
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/editTimetable', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:editTimetable><q0:timetableName>' + ttname + '</q0:timetableName><q0:newTimetableName>' + newname + '</q0:newTimetableName><q0:timeprofileName>' + ttname + '</q0:timeprofileName><q0:newTimeprofileName>' + newname + '</q0:newTimeprofileName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:editTimetable>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/editTimetable",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/editTimetable');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("editTimetableReturn")[0].childNodes[0].nodeValue;
							console.log("Timetable erfolgreich bearbeitet: "+bool);
							/*if(bool){
								_this.showNotification("Name ge&auml;ndert.");
							}else{
								_this.showNotification("Fehler: Name nicht ge&auml;ndert.");
							}*/	
							window.location.href = "./index.html";
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornotit").html("Fehler: Angaben bitte &uuml;berpr&uuml;fen.");
			                return false;
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
				var coursedescr = window.localStorage.getItem("cdescr");
				
				if(comment == "" || comment == null){
					console.log("Textfeld darf nicht leer sein.");					
				}else{					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/createComment', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(email, pw, '<q0:createComment><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:c>' + comment + '</q0:c><q0:courseName>' + coursename + '</q0:courseName><q0:courseDescription>' + coursedescr + '</q0:courseDescription></q0:createComment>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/createComment",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createComment');
			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("createCommentReturn")[0].childNodes[0].nodeValue;
							console.log("Kommentar erfolgreich erstellt: "+bool);							
							window.location.href = "./details.html";
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
			                return false;
			            }
			        });
			        e.preventDefault();
			        return false;
				}
			});
		});

//################### show logged in field on each page #######################
function init(){
	if(window.localStorage.getItem("email") != null && window.localStorage.getItem("password") != null){
		$('.loggedin').html("<p class='bluegreen log'>Eingeloggt ("+window.localStorage.getItem("email")+"). <span class='logout' onclick='logout();'>Ausloggen.</span></p>");
	}else{
		$('.loggedin').html("<p class='bluegreen log'>Nicht eingeloggt. <a href='login.html'>Einloggen.</a></p>");
	}
	
}

function logout() {
	window.localStorage.clear();
	window.location.href = "./login.html";
}


//################### show Popup functions #######################

function showAddCourse(){
	this.getAllCourses();
	this.getHours();
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
	
	$('.help').append('<p class="subheading">Stundenpl&auml;ne erstellen und verwalten</p>');
	$('.help').append('<p>Um einen Stundenplan zu erstellen, klicke zun&auml;chst auf den Men&uuml;punkt "Stundenplan erstellen". Auf der Seite kannst musst du nun einen Namen f&uuml;r den Stundenplan und die Stundenzeiten deiner Kurse eintragen. Auf der Startseite (zu erreichen &uuml;ber das Tabellensymbol im Men&uuml;) kannst du den Stundeplan dann aus der Liste ausw&auml;hlen und er wird angezeigt. &Uuml;ber die Symbole rechts kannst du den Namen deines Stundenplans &aumml;ndern (Stiftsymbol) oder den Stundenplan l&ouml;schen (M&uuml;lleimersymbol).</p>');
	
	$('.help').append('<p class="subheading">Kurs erstellen und Kurs zum Stundenplan hinzuf&uuml;gen</p>');
	$('.help').append('<p>Unter "Neuer Kurs" kann ein neuer Kurs angelegt werden. Dieser Kurs steht dann allen Nutzern der StundenPlaner-Plattform zur Verf&uuml;gung. Damit der Kurs dann auch in deinem Stundenplan erscheint, musst du auf die Seite gehen, die deine Stundenpl&auml;ne anzeigt (Startseite) den gew&uuml;nschten Stundenplan aus der Liste ausw&auml;hlen und dann "Kurs hinzuf&uuml;gen" klicken. In dem ge&ouml;ffneten Popup-Fenster w&auml;hlst du nun den gerade erstellten Kurs aus und den Tag und die Stunde, an dem er stattfindet.</p>');
	
	$('.help').append('<p class="subheading">Kurs ansehen oder l&ouml;schen</p>');
	$('.help').append('<p>Um die Informationen und Kommentare zu einem Kurs in deinem Stundenplan anzusehen, klicke auf das Auge im entprechenden Feld des Stundenplans. Zum Entfernen des Kurses aus deinem Stundenplan klicke das M&uuml;lleimersymbol rechts neben dem Auge und best&auml;tige das L&ouml;schen im &ouml;ffnenden Popup-Fenster.</p>');
	
	$('.help').append('<p class="subheading">Account Informationen</p>');
	$('.help').append('<p>Deine Account-Informationen kannst du unter dem Men&uuml;punkt "Account" einsehen. Um &Auml;nderungen an deinen Informationen vorzunehmen, klicke auf den Stift rechts neben der Angabe, die du &auml;ndern willst oder w&auml;hle den neuen Wert im Radio-Button aus und klicke "Speichern" oder klicke auf "Passwort &auml;ndern", um dein Passwort mit den verlangten Angaben im folgenden Popup-Fenster zu &auml;ndern. Auf der folgenden Seite gebe die Neuen Informationen ein und speichere sie ab. Die Einstellung, ob du anderen in einem Kurs als Teilnehmer angezeigt werden m&ouml;chtest, kannst die direkt auf der "Account"-Seite &auml;ndern.</p>');
	
	$('.help').append('<button class="closehelp" onClick="closeHelp()">Schlie&szlig;en</button>');
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

function openChangeEmail(){
	$(".overlay").fadeIn();	
	$("#changeemail").animate({opacity: 1});
	$("#changeemail").css('z-index', '3');
	$("#changeemail").css('pointer-events', 'auto');
}

function showchangepw(){
	$(".overlay").fadeIn();	
	$("#changepw").animate({opacity: 1});
	$("#changepw").css('z-index', '3');
	$("#changepw").css('pointer-events', 'auto');
}

function showNotification(infotext, bad){
	if(bad){
		$("#noti").css('color', '#D75050');
	}else{
		$("#noti").css('color', '#01939A');
	}
	$('#noti').append('<p>'+infotext+'</p>');
	$("#noti").animate({opacity: 1});
	$("#noti").css('z-index', '3');
	$("#noti").css('pointer-events', 'auto');
	$("#noti").animate({opacity: 1.0}, 7000).fadeOut('slow');
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

function openDeleteCourse(name, descr, day, hour, ttname){
	$("#delcourse").append("<input type='hidden' id='courname' value='"+name+"'>");
	$("#delcourse").append("<input type='hidden' id='courdescr' value='"+descr+"'>");
	$("#delcourse").append("<input type='hidden' id='courday' value='"+day+"'>");
	$("#delcourse").append("<input type='hidden' id='courhour' value='"+hour+"'>");
	$("#delcourse").append("<input type='hidden' id='courttname' value='"+ttname+"'>");
	
	$(".overlay").fadeIn();	
	$("#popupdeletecourse").animate({opacity: 1});
	$("#popupdeletecourse").css('z-index', '3');
	$("#popupdeletecourse").css('pointer-events', 'auto');
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
	$(".overlay").fadeOut();
}

function closeChangeTTPopup(){
	$("#popupchangettname").animate({opacity: 0.0});	
	$("#popupchangettname").css('pointer-events', 'none');
	$("#popupchangettname").css('z-index', '-1');
	$(".overlay").fadeOut();
}

function closeDeleteCoursePopup(){
	$("#popupdeletecourse").animate({opacity: 0.0});	
	$("#popupdeletecourse").css('pointer-events', 'none');
	$("#popupdeletecourse").css('z-index', '-1');
	$(".overlay").fadeOut();
}

function closeDeleteTTPopup(){
	$("#popupdeletett").animate({opacity: 0.0});	
	$("#popupdeletett").css('pointer-events', 'none');
	$("#popupdeletett").css('z-index', '-1');
	$(".overlay").fadeOut();
}

function closeChangeAccount(){
	$("#changeaccount").animate({opacity: 0.0});	
	$("#changeaccount").css('pointer-events', 'none');
	$("#changeaccount").css('z-index', '-1');
	$(".overlay").fadeOut();
}

function closeChangeEmail(){
	$("#changeemail").animate({opacity: 0.0});	
	$("#changeemail").css('pointer-events', 'none');
	$("#changeemail").css('z-index', '-1');
	$(".overlay").fadeOut();
}

function closeChangePW(){
	$("#changepw").animate({opacity: 0.0});	
	$("#changepw").css('pointer-events', 'none');
	$("#changepw").css('z-index', '-1');
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
	$('#courseadding').append('<li><label class="formlabel">'+i+'. Stunde: </label><input class="course" type="text" name="course'+i+'" value="HH:MM"><input class="course1" type="text" name="course'+i+'1" value="HH:MM"></li>');

	i = i+1;
}

//################## functions for displaying comments ####################

function showhideAddComment(){
	if($('#writecomment').css('visibility') == 'hidden'){
		$('#writecomment').css('visibility', 'visible');
	}else{
		$('#writecomment').css('visibility', 'hidden');
	}
}

//################## account functions ####################

function editAccount() {
	window.location.href = './account.html';
}

function getAccountInfos(){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/getAccountData', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:getAccountData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:getAccountData>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/getAccountData",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getAccountData');
        },
        success : function (respxml) {
			//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
			var jsonpure = respxml.getElementsByTagName("getAccountDataReturn")[0].childNodes[0].nodeValue;
			console.log("accountdaten: "+jsonpure);
			var json = JSON.parse(jsonpure);
			var username = json.username;
			var emailj = json.email;
			var vis = json.visibility;
			window.localStorage.setItem("vis", vis);
			
			if(vis == 1){
				$('input[name="showasmember"][value="yes"]').prop('checked', true);
			}else{
				$('input[name="showasmember"][value="no"]').prop('checked', true);
			}			
			$('#accountusername').append('<p id="aun">'+username+'</p>');
			$('#accountemail').append('<p id="aem">'+emailj+'</p>');

        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
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
	    xmlhttp.open('POST', _this.url+'/getTimetableData', false);
	
	    // build SOAP request
	    var xml = buildSOAPEnvelope(email, pw, '<q0:getTimetableData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName></q0:getTimetableData>', 'q0', 'http://service.tomcat.denevell.org');
	    jQuery.support.cors = true;
	    jQuery.ajax({
	        type : "POST",
	        url : _this.url+"/getTimetableData",
	        data : xml,
	        contentType : "text/xml; charset=utf-8",
	        dataType : "text xml",
	        cache: false,
	        beforeSend: function (xmlhttp) {
	        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getTimetableData');
	        },
	        success : function (respxml) {
				//console.log("accountdaten: "+respxml.getElementsByTagName("getAccountDataReturn")[0].firstChild.nodeValue);
				var jsonpure = respxml.getElementsByTagName("getTimetableDataReturn")[0].childNodes[0].nodeValue;
				console.log("timetable: "+jsonpure);
				var json = JSON.parse(jsonpure);
				var ttname = json.name;
				var tpname = ttname;
				var hours = json.timeprofile.hours;
				var viscourses = json.visitedCourses;
				
				//visualize timetable
				$("#timewrapper").empty();
				$('#timewrapper').append('<p class="addcourse"><a href="#" onClick="showAddCourse();">Kurs hinzuf&uuml;gen</a></p>');
				$('#timewrapper').append('<table class="timetable">');
					$('#timewrapper').append('<tr><th class ="tablehead"></th><th class ="tablehead" id="Montag">Mo</th><th class ="tablehead" id="Dienstag">Di</th><th class ="tablehead" id="Mittwoch">Mi</th><th class ="tablehead" id="Donnerstag">Do</th><th class ="tablehead" id="Freitag">Fr</th><th class ="tablehead" id="Samstag">Sa</th></tr>');
					for(var i = 0; i < hours.length; i++ ){
						var cindex = i+1;
						$('#timewrapper').append('<tr class="row">');
						$('#timewrapper').append('<td class="kasten first">'+hours[i].starttime+'</br><span class="timemiddle">-</span></br>'+hours[i].endtime+'</td>');
						for(var j = 1; j <= 6; j++){
							$('#timewrapper').append('<td class="kasten" id="kasten'+cindex+j+'"></td>');
						}
						$('#timewrapper').append('</tr>');
					}		
					
				$('#timewrapper').append('</table>');
				
				//add visited courses
				for(var i = 0; i < viscourses.length; i++){
					var kursname = "'"+viscourses[i].name+"'";
					var kursdescr = "'"+viscourses[i].courseDescription+"'";
					var kursday = "'"+viscourses[i].day+"'";
					var kurshour = "'"+viscourses[i].hourIndex+"'";
					var kurstt = "'"+ttname+"'";
					$('#kasten'+viscourses[i].hourIndex + viscourses[i].day).append('<span class="light">'+viscourses[i].shortname+'</span> </br>'+viscourses[i].room+'</br><img src="img/eye.png" alt="view" class="showdetails" onclick="gotoDetails('+kursname+', '+kursdescr+');"><img src="img/trash_can.png" alt="delete" class="deletecourse" onclick="openDeleteCourse('+kursname+', '+kursdescr+', '+kursday+', '+kurshour+', '+kurstt+');">');
				}
				
				var jetzt = new Date();
				var tagInWoche = jetzt.getDay();
				var Wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch",
			                          "Donnerstag", "Freitag", "Samstag");
				
				var tag = Wochentag[tagInWoche];
				$('#'+tag).css('background-color', '#01939A');
				
	        },
	        error : function (xhr, status, errorThrown) {
	            console.log("error: "+errorThrown);
	            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
	            return false;
	        }
	    });
	    //e.preventDefault();
	    return false;	
	}
}

// ################### new timetable soap functions ####################

function timetablesoap(email, pw, ttname, tpname, e){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/createTimetable', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:createTimetable><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName><q0:timeprofileName>' + tpname + '</q0:timeprofileName></q0:createTimetable>', 'q0', 'http://service.tomcat.denevell.org');
   	
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/createTimetable",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createTimetable');

        },
        success : function (respxml) {
			var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("timetable erstellt: "+ bool);	
			window.location.href = "./index.html";
		
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    e.preventDefault();
    return false;

}

function coursesoap(start, end, tpname, ttname, email, pw, index, e, i, length){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/createHour', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:createHour><q0:start>' + start + '</q0:start><q0:end>' + end + '</q0:end><q0:timeprofileName>' + tpname + '</q0:timeprofileName><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:hourIndex>' + index + '</q0:hourIndex></q0:createHour>', 'q0', 'http://service.tomcat.denevell.org');
   	
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/createHour",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createHour');

        },
        success : function (respxml) {
			var bool = respxml.firstChild.firstChild.firstChild.firstChild.innerHTML;
			console.log("hour ertsellt: "+bool);
			if(i == length-1){
				timetablesoap(email, pw, ttname, tpname, e);
			}
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    e.preventDefault();
    return false;

}

//##################### details #####################

function gotoDetails(cname, cdescr){
	window.localStorage.setItem("cname", cname);
	window.localStorage.setItem("cdescr", cdescr);
	window.location.href = './details.html';			
}

function getCourseData(){			
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	var coursename = window.localStorage.getItem("cname");
	var coursedescr = window.localStorage.getItem("cdescr");
					
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/getCourseData', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:getCourseData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:courseName>' + coursename + '</q0:courseName><q0:description>' + coursedescr + '</q0:description></q0:getCourseData>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/getCourseData",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getCourseData');
        },
        success : function (respxml) {
        	var jsonpure = respxml.getElementsByTagName("getCourseDataReturn")[0].childNodes[0].nodeValue;
        	console.log("kursdaten: "+jsonpure);
			var json = JSON.parse(jsonpure);
			var coursefull = json.name;
			var courseshort = json.shortname;
			var teacher = json.teacher;
			var descr = json.description;
			var room = json.room;
			var comments = json.comments;
			var mems = json.participants;

			//general information
			$('.details-right').append('<span class="detailsheading">'+coursefull+'</span>');
			$('.details-right').append('</br>');
			$('.details-right').append('<p><label class="formlabel">Abk&uuml;rzung:</label> '+courseshort+'</p>');
			$('.details-right').append('<p><label class="formlabel">Lehrende/r:</label> '+teacher+'</p>');
			$('.details-right').append('<p><label class="formlabel">Raum:</label> '+room+'</p>');
			$('.details-right').append('<p><label class="formlabel">Beschreibung:</label> '+descr+'</p>');
			
			//member
			for(var i = 0; i < mems.length; i++){
				if(mems[i].visibility == 1){
					$('.members').append('<p>');
					$('.members').append(mems[i].username+" <span class='mememail'>("+mems[i].email+")</span>");
					$('.members').append('</p>');
				}				
			}			
			
			//comments
			for(var key in comments){
				$('#comments').append('<div class="comment">');
				$('#comments').append('<p class="commenthead"><span class="bluegreencomment">'+comments[key].author+', '+comments[key].timestamp+'</span></p>');
				$('#comments').append('<p>'+comments[key].comment+'</p>');
				$('#comments').append('</div>');
				$('#comments').append('</br>');
			}			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function deleteCourse(cname, day){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	var ttname = document.forms["formtt"].elements["timetables"].value;		
	//var day = "";
					
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/removeVisitedCourse', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:removeVisitedCourse><q0:courseName>' + cname + '</q0:courseName><q0:visistedCourseDay>' + day + '</q0:visistedCourseDay><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName></q0:removeVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/removeVisitedCourse",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/removeVisitedCourse');
        },
        success : function (respxml) {
        	var bool = respxml.getElementsByTagName("removeVisitedCourseReturn")[0].childNodes[0].nodeValue;
			console.log("Besuchter Kurs erfolgreich entfernt: "+bool);
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function deleteTimeprofile(tpname){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
						
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/removeTimeprofile', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:removeTimeprofile><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:removeTimeprofile>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/removeTimeprofile",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/removeTimeprofile');
        },
        success : function (respxml) {
        	var bool = respxml.getElementsByTagName("removeTimeprofileReturn")[0].childNodes[0].nodeValue;
			console.log("Timeprofile entfernt: "+bool);	
			return false;
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function getTimetableList(){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
						
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/getAllTimetablesOfUser', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:getAllTimetablesOfUser><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password></q0:getAllTimetablesOfUser>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/getAllTimetablesOfUser",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getAllTimetablesOfUser');
        },
        success : function (respxml) {
        	var jsonpure = respxml.getElementsByTagName("getAllTimetablesOfUserReturn")[0].childNodes[0].nodeValue;
        	console.log("timetablelist: "+jsonpure);
			var json = JSON.parse(jsonpure);
			//visualize list
			var select = document.getElementById('timtableselect');
			if(json != null && jsonpure != '{}'){				
				for(var key in json){
					var opt = document.createElement('option');
					opt.value = json[key].name;
					opt.innerHTML = json[key].name;
					select.appendChild(opt);
				}	
				getTimetable();
			}else{
				var opt = document.createElement('option');
				opt.value = 'kein Stundenplan';
				opt.innerHTML = 'kein Stundenplan';
				select.appendChild(opt);
				$('#timewrapper').append('</br><a href="createTimetable.html">Stundenplan erstellen</a>');
			}					
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function getAllCourses(){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
						
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/getAllCourses', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:getAllCourses></q0:getAllCourses>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/getAllCourses",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getAllCourses');
        },
        success : function (respxml) {
        	var jsonpure = respxml.getElementsByTagName("getAllCoursesReturn")[0].childNodes[0].nodeValue;
        	console.log("kursliste: "+jsonpure);
			var json = JSON.parse(jsonpure);
			//visualize course list
			var select = document.getElementById('courselist');
			select.options.length = 0;
			var opt = document.createElement('option');
			opt.value = "Kurs w&auml;hlen";
			opt.innerHTML = "Kurs w&auml;hlen";
			select.appendChild(opt);
			if(json != null && jsonpure != '{}'){				
				for(var key in json){
					var opt = document.createElement('option');
					opt.value = json[key].description;
					opt.innerHTML = json[key].name;
					select.appendChild(opt);
				}	
				getTimetable();
			}else{
				var opt = document.createElement('option');
				opt.value = 'kein Kurs';
				opt.innerHTML = 'kein Kurs';
				select.appendChild(opt);
			}		
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function getHours(){
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
						
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', _this.url+'/getHourData', false);

    // build SOAP request
    var xml = buildSOAPEnvelope(email, pw, '<q0:getHourData><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timeprofileName>' + ttname + '</q0:timeprofileName></q0:getHourData>', 'q0', 'http://service.tomcat.denevell.org');
    jQuery.support.cors = true;
    jQuery.ajax({
        type : "POST",
        url : _this.url+"/getHourData",
        data : xml,
        contentType : "text/xml; charset=utf-8",
        dataType : "text xml",
        cache: false,
        beforeSend: function (xmlhttp) {
        	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
            xmlhttp.setRequestHeader('SOAPAction', _this.url+'/getHourData');
        },
        success : function (respxml) {
        	var jsonpure = respxml.getElementsByTagName("getHourDataReturn")[0].childNodes[0].nodeValue;
        	console.log("stundenliste: "+jsonpure);
			var json = JSON.parse(jsonpure);
			//visualize hour list
			var select = document.getElementById('hourlist');
			select.options.length = 0;
			if(json != null && jsonpure != '{}'){	
				var opt = document.createElement('option');
				opt.value = 'Stunde w&auml;hlen';
				opt.innerHTML = 'Stunde w&auml;hlen';
				select.appendChild(opt);
				for(var i = 1; i <= json.length; i++){
					var opt = document.createElement('option');
					opt.value = i;
					opt.innerHTML = i;
					select.appendChild(opt);
				}	
				getTimetable();
			}else{
				var opt = document.createElement('option');
				opt.value = 'keine Stunde';
				opt.innerHTML = 'keine Stunde';
				select.appendChild(opt);
			}		
			
        },
        error : function (xhr, status, errorThrown) {
            console.log("error: "+errorThrown);
            _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

function addVisitedCourse(){
	var coursedescr = document.forms["addviscourseform"].elements["courseselect"].value;
	var selekt = document.forms["addviscourseform"].elements["courseselect"].selectedIndex;
	var val = document.forms["addviscourseform"].elements["courseselect"].options[selekt].value;
	var course = document.forms["addviscourseform"].elements["courseselect"].options[selekt].text;
	var daystring = document.forms["addviscourseform"].elements["dayselect"].value;
	var index = document.forms["addviscourseform"].elements["hourselect"].value;
	
	console.log("course: "+course);
	console.log("coursedescr: "+coursedescr);
	console.log("day: "+daystring);
	var day = daystring;				
	
	var selektiert = document.forms["formtt"].elements["timetables"].selectedIndex;
	var wert = document.forms["formtt"].elements["timetables"].options[selektiert].value;
	var ttname = document.forms["formtt"].elements["timetables"].options[selektiert].text;
	var tpname = ttname;
	console.log("timetable: "+ttname);
	
	var email = window.localStorage.getItem("email");
	var pw = window.localStorage.getItem("password");
	
	//if(name == "" || name == null || shortname == "" || shortname == null || teacher == "" || teacher == null || descr == "" || descr == null || room == "" || room == null){
	//	console.log("Alle Textfelder m&uuml;ssen zum Registrieren ausgefüllt werden.");
		//popup mit Fehlermeldung
	//}else{					
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', _this.url+'/createVisitedCourse', false);

        // build SOAP request
        var xml = buildSOAPEnvelope(email, pw, '<q0:createVisitedCourse><q0:email>' + email + '</q0:email><q0:password>' + pw + '</q0:password><q0:timetableName>' + ttname + '</q0:timetableName><q0:timeprofileName>' + tpname + '</q0:timeprofileName><q0:courseName>' + course + '</q0:courseName><q0:courseDescription>' + coursedescr + '</q0:courseDescription><q0:day>' + day + '</q0:day><q0:hourIndex>' + index + '</q0:hourIndex></q0:createVisitedCourse>', 'q0', 'http://service.tomcat.denevell.org');
        jQuery.support.cors = true;
        jQuery.ajax({
            type : "POST",
            url : _this.url+"/createVisitedCourse",
            data : xml,
            contentType : "text/xml; charset=utf-8",
            dataType : "text xml",
            cache: false,
            beforeSend: function (xmlhttp) {
            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/createVisitedCourse');
            },
            success : function (respxml) {
            	var bool = respxml.getElementsByTagName("createVisitedCourseReturn")[0].childNodes[0].nodeValue;
				console.log("Besuchter Kurs erfolgreich erstellt: "+bool);
				//_this.showPopup2(bool);	
				//window.location.href = 'http://localhost:8080/timetableClient/index.html';
				if(bool){
					_this.showNotification("Kurs "+course+" hinzugef&uuml;gt.");
				}else{
					_this.showNotification("Fehler: Kurs nicht hinzugef&uuml;gt.");
				}
				window.location.href= "./index.html";
				
            },
            error : function (xhr, status, errorThrown) {
                console.log("error: "+errorThrown);
                _this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
                return false;
            }
        });
        return false;
}

//###################### soap functions ##########################

function buildSOAPEnvelope(username, password, payload, target_prefix, target_ns){
	return '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:'
			+(target_prefix || 'q0')
			+'="'
			+(target_ns || this.ns)
			+'">'
			+'<soapenv:Header>'
			+'<wsse:Security>'
			+'<wsse:UsernameToken>'
			+'<wsse:Username>'+username+'</wsse:Username>'
			+'<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'+password+'</wsse:Password>'
			+'</wsse:UsernameToken>'
			+'</wsse:Security>'
			+'</soapenv:Header>'
			+'<soapenv:Body>'+payload+'</soapenv:Body></soapenv:Envelope>';
}

