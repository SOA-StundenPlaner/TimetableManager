package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.List;

/**
 * Klasse, die ein Zeitprofil implementiert.
 * @author Nicole Hein
 */
public class Timeprofile {
	/** Anzahl der Wochentage **/
	private int numberOfWeekdays = 5;
	
	/** Liste der Stunden **/
	private List<Hour> hours = new ArrayList<Hour>();
	
	/** Name des Zeitprofils **/
	private String name;
	
	/**
	 * Getter, der die Anzahl an Wochentagen zurück gibt.
	 * @return Anzahl an Wochentagen
	 */
	public int getNumberOfWeekdays() {
		return numberOfWeekdays;
	}
	
	/**
	 * Setter, der die Anzahl an Wochentagen setzt.
	 * @param numberOfWeekdays Anzahl der Wochentage
	 */
	public void setNumberOfWeekdays(int numberOfWeekdays) {
		this.numberOfWeekdays = numberOfWeekdays;
	}
	
	/**
	 * Getter, der die Liste der Stunden zurück gibt.
	 * @return Liste der Stunden
	 */
	public List<Hour> getHours() {
		return hours;
	}
	
	/**
	 * Setter, der die Liste der Stunden setzt.
	 * @param hours Liste der Stunden
	 */
	public void setHours(List<Hour> hours) {
		this.hours = hours;
	}

	/**
	 * Getter, der den Namen des Zeitprofils zurück gibt.
	 * @return Name des Zeitprofils
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * Setter, der den Namen des Zeitprofils setzt.
	 * @param name Name des Zeitprofils
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * Methode, die eine Stunde zur Liste der Stunden hinzufügt.
	 * @param h hinzuzufügende Stunde
	 */
	public void addHour(Hour h){
		hours.add(h);
	}
	
	/**
	 * Methode, die eine Stunde von der Liste der Stunden löscht.
	 * @param h zu löschende Stunde
	 * @return Gibt wahr zurück, wenn die Stunde erfolgreich gelöscht werden konnte. Gibt falsch zurück, wenn die Stunde nicht in der Liste der Stunden gefunden werden konnte.
	 */
	public boolean removeHour(Hour h){
		if (hours.contains(h)){
			hours.remove(h);
			return true;
		}else{
			return false;
		}
	}	
}