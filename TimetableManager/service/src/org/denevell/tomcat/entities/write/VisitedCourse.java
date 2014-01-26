package org.denevell.tomcat.entities.write;


/**
 * public Map<String, VisitedCourse> getVisitedCourses(){
 * 
 * } Klasse, die einen besuchten Kurs implementiert.
 * //			vc.addParticipant(account);

 * @author Nicole Hein
 */
public class VisitedCourse {

	/** e-Mail-Adresse des Accounts **/
	private String email;

	/** Name des besuchten Kurses **/
	private String name;

	/** Raum **/
	private String room;
	
	/** Lehrer **/
	private String teacher;

	/** Index der Stunde **/
	private int hourIndex;

	/** Wochentag **/
	private int day;

	/** Stundenplan **/
	private String timetable;
	
	/** Beschreibung **/
	private String courseDescription;
	
	/** Abkürzung **/
	private String shortname;

	/**
	 * Konstruktor der Klasse VisitedCourse.
	 */
	public VisitedCourse(String email, String name, String room, String teacher,
			String timetable, int day, int hourIndex, String courseDescription, String shortname) {
		this.email = email;
		this.room = room;
		this.teacher = teacher;
		this.timetable = timetable;
		this.day = day;
		this.hourIndex = hourIndex;
		this.name = name;
		this.courseDescription = courseDescription;
		this.shortname = shortname;
	}

	
	public void setName(String name){
		this.name = name;
	}
	
	
	public void setRoom(String room){
		this.room = room;
	}
	
	public String getRoom(){
		return room;
	}
	
	public void setTeacher(String teacher){
		this.teacher = teacher;
	}
	
	public String getTeacher(){
		return teacher;
	}
	
	public void setCourseDescription(String courseDescription){
		this.courseDescription = courseDescription;
	}
	
	public String getCourseDescription(){
		return courseDescription;
	}
	
	public void setShortname(String shortname){
		this.shortname = shortname;
	}
	
	public String getShortname(){
		return shortname;
	}


	/**
	 * Getter, der den Wochentag zurück gibt.
	 * 
	 * @return Wochentag
	 */
	public int getDay() {
		return day;
	}

	/**
	 * Setter, der einen Wochentag setzt.
	 * 
	 * @param day
	 *            Wochentag
	 */
	public void setDay(int day) {
		this.day = day;
	}
	
	
	public void setHourIndex(int hourIndex){
		this.hourIndex = hourIndex;
	}
	
	public int getHourIndex(){
		return hourIndex;
	}

	/**
	 * Getter, der die e-Mail-Adresse des Accounts zurück gibt.
	 * 
	 * @return e-Mail-Adresse
	 */
	public String getEmail() {
		return email;
	}

	public String getName() {
		return name;
	}

	public String getTimetable() {
		return timetable;
	}

	/**
	 * Setter, der den Stundenplan setzt.
	 * 
	 * @param timetable
	 *            Stundenplan
	 */
	public void setTimetable(String timetable) {
		this.timetable = timetable;
	}



}