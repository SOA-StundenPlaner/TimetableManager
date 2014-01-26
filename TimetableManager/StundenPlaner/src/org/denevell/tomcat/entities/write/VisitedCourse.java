package org.denevell.tomcat.entities.write;

/**
 * Klasse, die einen besuchten Kurs implementiert.
 * @author Nicole Hein
 */
public class VisitedCourse {
		
	/** Kurs **/
	public Course course;
	
	/** Stunde **/
	public Hour hour;
	
	/** Wochentag **/
	public int day;
	
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
