package org.denevell.tomcat.entities.write;

import java.util.HashMap;
import java.util.Map;

/**
 * Klasse, die einen Account implementiert.
 * @author Nicole Hein
 */
public class Account {

	/** Benutzername fuer den Account **/
	String username;
	
	/** Passwort des Benutzers fuer den Account **/
	String password;
	
	/** e-Mail-Adresse des Benutzers **/
	String email;
	
	/**
	 * Konstruktor der Klasse Account.
	 * @param username Benutzername
	 * @param password Passwort
	 */
	public Account(String username, String password, String email){
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	/** Map: Key ist der Name des Zeitprofils, Value ist das Zeitprofil **/
	public Map<String, Timeprofile> timeprofiles = new HashMap<String, Timeprofile>();
	
	/** Map: Key ist der Name des Stundenplans, Value ist der Stundenplan **/
	public Map<String, Timetable> tt = new HashMap<String, Timetable>();
}