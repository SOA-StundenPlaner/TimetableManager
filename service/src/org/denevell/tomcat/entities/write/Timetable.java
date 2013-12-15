package org.denevell.tomcat.entities.write;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die einen Stundenplan implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "timetable")
public class Timetable {
	
	/** Erzeugt ein neues Zeitprofil **/
	@DatabaseField(canBeNull = false, foreign = true)
	private Timeprofile timeprofile;
	
	/** Liste der besuchten Kurse **/
	@ForeignCollectionField
	private ForeignCollection<VisitedCourse> visitedCourses;
	
	/** Name des Stundenplans **/
	@DatabaseField(canBeNull = false, id = true)
	private String name;
	
	
	/**
	 * Konstruktor der Klasse Timetable.
	 */
	public Timetable(){
		
	}
	
	
	/**
	 * Getter, der ein Zeitprofil zurück gibt.
	 * @return Zeitprofil
	 */
	public Timeprofile getTimeprofile() {
		return timeprofile;
	}
	
	/**
	 * Setter, der ein Zeitprofil setzt.
	 * @param timeprofile Zeitprofil
	 */
	public void setTimeprofile(Timeprofile timeprofile) {
		this.timeprofile = timeprofile;
	}

	/**
	 * Getter, der die Liste der besuchten Kurse zurück gibt.
	 * @return besuchte Kurse
	 */
	public ForeignCollection<VisitedCourse> getCourses() {
		return visitedCourses;
	}
	
	/**
	 * Setter, der den Namen des Stundenplans zurück gibt.
	 * @return Name des Stundenplans
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * Setter, der den Namen des Stundenplans setzt.
	 * @param name Name des Stundenplans
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * Methode, die einen Kurs zur Liste der besuchten Kurse hinzufügt.
	 * @param vc zu besuchender Kurs
	 */
	public void addVisitedCourse(VisitedCourse vc){
		visitedCourses.add(vc);
	}
	
	
	/**
	 * Methode, die einen besuchten Kurs von der Liste der besuchten Kurse löscht.
	 * @param vc zu löschender Kurs
	 * @return Gibt wahr zurück, wenn der Kurs erfolgreich gelöscht werden konnte. Gibt falsch zurück, wenn der Kurs nicht gefunden werden konnte.
	 */
	public boolean removeVisitedCourse(VisitedCourse vc){
		if (visitedCourses.contains(vc)){
			visitedCourses.add(vc);
			return true;
		}else{
			return false;
		}
	}

}