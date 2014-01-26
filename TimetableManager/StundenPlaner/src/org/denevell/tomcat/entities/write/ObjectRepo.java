package org.denevell.tomcat.entities.write;

import java.util.HashMap;
import java.util.Map;

/**
 * Klasse, die als Objekt-Repository dient.
 * @author Nicole Hein
 */
public class ObjectRepo {
	
	/**
	 * Konstruktor der Klasse ObjectRepo.
	 */
	private ObjectRepo(){
		
	}
	
	/** Instanz der Klasse ObjectRepo **/
	private static ObjectRepo instance;
	
	/**
	 * Getter, der die Instanz der Klasse ObjectRepo setzt, wenn sie noch nicht existiert.
	 * @return Instanz
	 */
	public static ObjectRepo getInstance(){
		if (instance==null){
			instance = new ObjectRepo();
		}
		return instance;
	}
	
	/** Map: Key ist e-Mail, Value ist Account **/
	public Map<String, Account> accounts = new HashMap<String, Account>();
	
	/** Map: Key ist Name des Kurses, Value ist Kurs **/
	public Map<String, Course> courses = new HashMap<String, Course>();
}