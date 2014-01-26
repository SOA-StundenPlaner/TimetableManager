//url of server -> change this, when using an other server address
var url = "http://localhost:8080/StundenPlaner/services/ServiceTimetable?wsdl";

//ns of wsdl
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
							if(bool){
								window.localStorage.setItem("email", em);
								window.localStorage.setItem("password", pw);
								window.localStorage.setItem("username", un);
								_this.showPopup2(bool);		
							}else{
								$("#errornoti").html("Account zu der E-Mail-Adresse existiert bereits.");
								return false;
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
			//################# login ################
			$('#loginbutton').click(function(e){
				var em = document.forms["auth"].elements["loginemail"].value;
				var pww = document.forms["auth"].elements["loginpw"].value;
				if(pww == null || pww == "" || em == null || em == ""){
					$("#errornoti").html("Bitte alle Textfelder ausf&uuml;llen.");
					return false;
				}else{
					//var pww = MD5(pw);
					var shaObj = new jsSHA(pww, "TEXT");
					var pw = shaObj.getHash("SHA-512", "HEX");						
				
					//default: visible
					var vis = 1;
					
					var xmlhttp = new XMLHttpRequest();
			        xmlhttp.open('POST', _this.url+'/login', false);

			        // build SOAP request
			        var xml = buildSOAPEnvelope(em, pw,'<q0:login><q0:email>' + em + '</q0:email><q0:password>' + pw + '</q0:password></q0:login>', 'q0', 'http://service.tomcat.denevell.org');
			        jQuery.support.cors = true;
			        jQuery.ajax({
			            type : "POST",
			            url : _this.url+"/login",
			            data : xml,
			            contentType : "text/xml; charset=utf-8",
			            dataType : "text xml",
			            cache: false,
			            beforeSend: function (xmlhttp) {
			            	xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			                xmlhttp.setRequestHeader('SOAPAction', _this.url+'/login');

			            },
			            success : function (respxml) {
			            	var bool = respxml.getElementsByTagName("loginReturn")[0].childNodes[0].nodeValue;
							console.log("Erfolgreich angemeldet: "+bool);
							if(bool){
								window.localStorage.setItem("email", em);
								window.localStorage.setItem("password", pw);
								window.location.href= "./index.html";
								return false;		
							}else{
								$("#errornoti").html("Fehlgeschlagen: Account existiert nicht.");
								return false;
							}								
			            },
			            error : function (xhr, status, errorThrown) {
			                console.log("error: "+errorThrown);
			                $("#errornoti").html("Fehlgeschlagen: Angaben bitte &uuml;berpr&uuml;fen.");
							return false;
			            }
			        });
			        e.preventDefault();
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
								//return false;
							}else{
								_this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
								return false;
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
							_this.showNotification("Kurs "+course+" hinzugef&uuml;gt.");
							return false;
						}else{
							$("#errornoti").html("Fehler: &Uuml;berpr&uuml;fe, ob alle Angaben gemacht wurden. Alles muss ausgew&auml;hlt sein.");
			                return false;
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

//################### logout #######################

function logout() {
	window.localStorage.clear();
	window.location.href = "./login.html";
}

//################### get Account information #######################
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
            //_this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
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

//################### new hour soap functions ####################

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

//##################### delete visited course from timetable #####################

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

//##################### get list of timetable of one user #####################

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
            //_this.showNotification("Fehler: Angaben bitte &uuml;berpr&uuml;fen.", true);
            return false;
        }
    });
    //e.preventDefault();
    return false;
}

//##################### get all courses #####################

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

//##################### get hours of a timetable #####################

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

//##################### add a visited course to timetable #####################

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

//###################### building soap envelope ##########################

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

