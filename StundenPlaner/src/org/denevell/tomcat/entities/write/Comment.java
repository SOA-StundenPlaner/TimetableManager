package org.denevell.tomcat.entities.write;

import java.util.Date;

/**
 * Klasse, die einen Kommentar implementiert.
 * 
 * @author Nicole Hein
 */
public class Comment {

	/** Kommentar **/
	private String comment;

	/** Autor des Kommentars **/
	private String author;

	/** Zeitstempel des Kommentars **/
	private long timestamp;

	/** ID des Kommentars **/
	private int commentID;

	/** Veranstaltungs-ID, zu der der Kommentar gehört **/
	String courseID;

	/** Kurs, zu dem der Kommentar erstellt werden soll **/
	Course course;

	/**
	 * Setter, der den Kommentar setzt.
	 * @param comment zu setzender Kommentar
	 */
	public void setComment(String comment) {
		this.comment = comment;
	}

	/**
	 * Getter, der den Kommentar zurück gibt.
	 * @return Kommentar
	 */
	public String getComment() {
		return comment;
	}

	/**
	 * Setter, der den Autor des Kommentars setzt.
	 * @param author zu setzender Kommentarautor
	 */
	public void setAuthor(String author) {
		this.author = author;
	}

	/**
	 * Getter, der den Autor des Kommentars zurück gibt.
	 * @return Kommentarautor
	 */
	public String getAuthor() {
		return author;
	}
}