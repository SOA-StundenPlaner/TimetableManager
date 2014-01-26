package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.List;



/**
 * Klasse, die einen Stundenplan implementiert.
 * @author Nicole Hein
 */
public class Timetable {
	
	/** Erzeugt ein neues Zeitprofil **/
	private Timeprofile timeprofile;
			
	/** Name des Stundenplans **/
	private String name;
	
	/** ID des Stundenplans **/
	private String id;
	
	/** Liste der besuchten Kurses **/
	private List<VisitedCourse> visitedCourses = new ArrayList<VisitedCourse>();
	
	
	/**
	 * Konstruktor
	 * @param id
	 * @param name
	 * @param timeprofile
	 */
	public Timetable(String id, String name, Timeprofile timeprofile){
		this.id = id;
		this.name = name;
		this.timeprofile = timeprofile;
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
	 * Setter, der den Namen des Stundenplans zurück gibt.
	 * @return Name des Stundenplans
	 */
	public String getTimetableName() {
		return name;
	}
	
	/**
	 * Setter, der den Namen des Stundenplans setzt.
	 * @param name Name des Stundenplans
	 */
	public void setTimetableName(String name) {
		this.name = name;
	}
	
	
	/**
	 * Setter, der die ID des Stundenplans setzt.
	 * @param id ID
	 */
	public void setId(String id){
		this.id = id;
	}
	
	
	/**
	 * Getter, der die ID des Stundenplans zurück gibt.
	 * @return ID
	 */
	public String getId(){
		return id;
	}
	
	
	public void addVisitedCourse(VisitedCourse visitedCourse){
		visitedCourses.add(visitedCourse);
	}
	
	public boolean removeVisitedCourse(VisitedCourse visitedCourse){
		if (visitedCourses.contains(visitedCourse)){
			visitedCourses.remove(visitedCourse);
			return true;
		}else{
			return false;
		}
	}
	
	public List<VisitedCourse> getVisitedCourses(){
		return visitedCourses;
	}

}