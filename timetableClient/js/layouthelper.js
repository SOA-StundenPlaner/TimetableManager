var i = 2;
var _this = this;

//################### show logged in field on each page #######################
function init(){
	if(window.localStorage.getItem("email") != null && window.localStorage.getItem("password") != null){
		$('.loggedin').html("<p class='bluegreen log'>Eingeloggt ("+window.localStorage.getItem("email")+"). <span class='logout' onclick='logout();'>Ausloggen.</span></p>");
	}else{
		$('.loggedin').html("<p class='bluegreen log'>Nicht eingeloggt. <a href='login.html'>Einloggen.</a></p>");
		$(".menu").html("");
		$(".wrapper").html("Sorry, hierf&uuml;r musst du eingeloggt sein.");
	}	
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

//##################### details #####################

function gotoDetails(cname, cdescr){
	window.localStorage.setItem("cname", cname);
	window.localStorage.setItem("cdescr", cdescr);
	window.location.href = './details.html';			
}
