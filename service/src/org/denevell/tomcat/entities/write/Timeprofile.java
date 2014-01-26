package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.List;

/**
 * Klasse, die ein Zeitprofil implementiert.
 * @author Nicole Hein
 */
public class Timeprofile {
		
	/** Liste der Stunden **/
	private List<Hour> hours = new ArrayList<Hour>();
	
	/** Name des Zeitprofils **/
	private String name;
	
	/** ID **/
	private String id;
		
	/**
	 * Konstruktor der Klasse Timeprofile.
	 */
	public Timeprofile(String id, String name){
		this.id = id;
		this.name = name;
	}

	
	/**
	 * Getter, der die Liste der Stunden zurück gibt.
	 * @return Liste der Stunden
	 */
	public List<Hour> getHours() {
		return hours;
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
	 * Setter, der die ID des Zeitprofils setzt.
	 * @param id ID
	 */
	public void setId(String id){
		this.id = id;
	}
	
	
	/**
	 * Getter, der die ID des Zeitprofils zurück gibt.
	 * @return ID
	 */
	public String getId(){
		return id;
	}
		
	
	/**
	 * Methode, die eine Stunde zur Liste der Stunden hinzufügt.
	 * @param h hinzuzufügende Stunde
	 */
	public void addHour(Hour h){
		hours.add(h);
	}
	
	
	/**
	 * Methode, die eine Stunde ändert.
	 * @param hour Stunde
	 * @param start Startzeit
	 * @param end Endzeit
	 * @param hourIndex Index der Stunde
	 * @param tpName Name des Zeitprofils
	 */
	public void editHour(Hour hour, String start, String end, int hourIndex, String tpName){
		hour.setStarttime(start);
		hour.setEndtime(end);
		hour.setHourIndex(hourIndex);
		hour.setTimeprofileName(tpName);
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