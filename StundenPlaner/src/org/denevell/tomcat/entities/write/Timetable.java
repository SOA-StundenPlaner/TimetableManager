package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.List;

/**
 * Klasse, die einen Stundenplan implementiert.
 * @author Nicole Hein
 */
public class Timetable {
	/** Erzeugt ein neues Zeitprofil **/
	private Timeprofile timeprofile = new Timeprofile();
	
	/** Liste der besuchten Kurse **/
	private List<VisitedCourse> visitedCourses = new ArrayList<VisitedCourse>();
	
	/** Name des Stundenplans **/
	private String name;

	private String id;
	
	
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
	public List<VisitedCourse> getCourses() {
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
		if (visitedCourses.contain(vc)){
			visitedCourses.add(vc);
			return true;
		}else{
			return false;
		}
	}

}