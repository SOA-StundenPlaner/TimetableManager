package org.denevell.tomcat.entities.write;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die einen Kurs implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "course")
public class Course {
	
	/** ID des Kurses **/
	@DatabaseField(canBeNull = false, generatedId = true)
	private int id;
	
	/** Name des Kurses **/
	@DatabaseField(canBeNull = false)
	private String name;
	
	/** Abkürzung des Namens des Kurses **/
	@DatabaseField(canBeNull = true)
	private String shortname;
	
	/** Name des Lehrenden **/
	@DatabaseField(canBeNull = true)
	private String teacher;
	
	/**Beschreibung des Kurses**/
	@DatabaseField(canBeNull = true)
	private String desciption;
	
	/** Raum des Kurses **/
	@DatabaseField(canBeNull = true)
	private String room;
	
	/** Liste von Kommentaren **/
	@ForeignCollectionField
	private ForeignCollection<Comment> comments;
	
	/**
	 * Konstruktor der Klasse Course.
	 */
	public Course(){
		
	}
	
	
	/**
	 * Getter, der die ID des Kurses zurück gibt.
	 * @return ID des Kurses
	 */
	public int getId(){
		return id;
	}
	
	
	/**
	 * Getter, der den Namen des Kurses zurück gibt.
	 * @return Name des Kurses
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * Setter, der den Namen des Kurses setzt.
	 * @param name Name des Kurses
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * Getter, der die Abkürzung des Kurses zurück gibt.
	 * @return Abkürzung des Kurses
	 */
	public String getShortname() {
		return shortname;
	}

	/**
	 * Setter, der die Abkürzung des Kurses setzt.
	 * @param shortname Abkürzung des Kurses
	 */
	public void setShortname(String shortname) {
		this.shortname = shortname;
	}

	/**
	 * Getter, der den Lehrer des Kurses zurück gibt.
	 * @return Lehrer des Kurses
	 */
	public String getTeacher() {
		return teacher;
	}
	
	/**
	 * Setter, der den Lehrer des Kurses setzt.
	 * @param teacher Lehrer des Kurses
	 */
	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}

	/**
	 * Getter, der die Beschreibung des Kurses zurück gibt.
	 * @return Beschreibung des Kurses
	 */
	public String getDesciption() {
		return desciption;
	}

	/**
	 * Setter, der die Beschreibung des Kurses setzt.
	 * @param desciption Beschreibung des Kurses
	 */
	public void setDesciption(String desciption) {
		this.desciption = desciption;
	}

	/**
	 * Getter, der den Raum des Kurses zurück gibt.
	 * @return Raum des Kurses
	 */
	public String getRoom() {
		return room;
	}

	/**
	 * Setter, der den Raum des Kurses setzt.
	 * @param room Raum des Kurses
	 */
	public void setRoom(String room) {
		this.room = room;
	}
	
	/**
	 * Methode, die einen Kommentar in die Liste der Kommentare hinzufügt.
	 * @param comment hinzuzufügender Kommentar
	 */
	public void addComment(Comment comment){
		comments.add(comment);
	}
	
	
	/**
	 * Methode, die einen Kommentar aus der Liste der Kommentare löscht.
	 * @param comment zu löschender Kommentar
	 * @return Gibt wahr zurück, wenn der Kommentar erfolgreich gelöscht wurde. Gibt falsch zurück, wenn der Kommentar nicht gefunden werden konnte.
	 */
	public boolean removeComment(Comment comment){
		if (comments.contains(comment)){
			comments.remove(comment);
			return true;
		}else{
			return false;
		}
	}
}
