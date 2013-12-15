package org.denevell.tomcat.entities.write;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die einen Kommentar implementiert.
 * 
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "comment")
public class Comment {

        /** Kommentar **/
        @DatabaseField(canBeNull = false)
        private String comment;

        /** Autor des Kommentars **/
        @DatabaseField(canBeNull = false)
        private String author;

        /** Veranstaltungs-ID, zu der der Kommentar gehört **/
        @DatabaseField(canBeNull = false, generatedId = true)
        private int courseID;

        /** Kurs, zu dem der Kommentar erstellt werden soll **/
        @DatabaseField(foreign = true)
        private Course course;
        
        /** Name des Kurses **/
        @DatabaseField(canBeNull = false)
        private String courseName;
        
        /**
         * Konstruktor der Klasse Comment.
         */
        public Comment(){
        	
        }
        
        
        

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
        
        
        /**
         * Setter, der den Kursnamen setzt, für den der Kommentar gespeichert werden soll.
         * @param courseName
         */
        public void setCourseName(String courseName){
        	this.courseName = courseName;
        }
        
        
        /**
         * Getter, der den Kursnamen zurück gibt, für den der Kommentar gespeichert werden soll.
         * @return Kursname
         */
        public String getCourseName(){
        	return courseName;
        }
}