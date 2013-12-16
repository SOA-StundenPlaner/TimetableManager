package org.denevell.tomcat.entities.write;

import java.util.List;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die ein Zeitprofil implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "timeprofile")
public class Timeprofile {
		
	/** Liste der Stunden **/
	@ForeignCollectionField
	private ForeignCollection<Hour> hours;
	
	/** Name des Zeitprofils **/
	@DatabaseField(canBeNull = false, id = true)
	private String name;
	
	
	/**
	 * Konstruktor der Klasse Timeprofile.
	 */
	public Timeprofile(){
		
	}

	
	/**
	 * Getter, der die Liste der Stunden zurück gibt.
	 * @return Liste der Stunden
	 */
	public ForeignCollection<Hour> getHours() {
		return hours;
	}
	
	
	/**
	 * Methode, die prüft, ob eine Stunde mit entsprechendem Index vorhanden ist.
	 * @param hourIndex Index der Stunde
	 * @param hourList Liste aller Stunden
	 * @return Stunde
	 */
	public Hour getHourByIndex(int hourIndex, List<Hour> hourList){
		for (int i=0; i<hourList.size(); i++){
			if (hourList.get(i).getHourIndex() == hourIndex){
				return hourList.get(i);
			}
		}
		return null;
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