package org.denevell.tomcat.entities.write;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die einen besuchten Kurs implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "visitedCourse")
public class VisitedCourse {
	
	/** ID **/
	@DatabaseField(canBeNull = false)	
	private int id;
	
	/** Kurs **/
	@DatabaseField(foreign = true, canBeNull = false)
	public Course course;
	
	/** Name des Kurses **/
	@DatabaseField(canBeNull = false, id = true)
	public String courseName;
	
	/** Stunde **/
	@DatabaseField(foreign = true, canBeNull = false)
	public Hour hour;
	
	/** Wochentag **/
	@DatabaseField(canBeNull = false)
	public int day;
	
	/** Stundenplan **/
	@DatabaseField(foreign = true)
	private Timetable timetable;
	
	/**
	 * Konstruktor der Klasse VisitedCourse.
	 */
	public VisitedCourse(){

	}
	
	
	/**
	 * Getter, der die ID zurück gibt.
	 * @return ID
	 */
	public int getId(){
		return id;
	}
	
	
	/**
	 * Getter, der einen Kurs zurück gibt.
	 * @return Kurs
	 */
	public Course getCourse() {
		return course;
	}
	
	/**
	 * Setter, der einen Kurs setzt.
	 * @param course Kurs
	 */
	public void setCourse(Course course) {
		courseName = course.getName();
		this.course = course;
	}
	
	/**
	 * Getter, der eine Stunde zurück gibt.
	 * @return Stunde
	 */
	public Hour getHour() {
		return hour;
	}
	
	/**
	 * Setter, der eine Stunde setzt.
	 * @param hour Stunde
	 */
	public void setHour(Hour hour) {
		this.hour = hour;
	}
	
	/**
	 * Getter, der den Wochentag zurück gibt.
	 * @return Wochentag
	 */
	public int getDay() {
		return day;
	}
	
	/**
	 * Setter, der einen Wochentag setzt.
	 * @param day Wochentag
	 */
	public void setDay(int day) {
		this.day = day;
	}
}
