package org.denevell.tomcat.entities.write;

import java.util.HashMap;
import java.util.Map;


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
        
        /** Name des Kurses **/
        private String courseName;
        
        /** e-Mail **/
        private String email;
        
        /** Zeit **/
        private String timestamp;
        
        /**
         * Konstruktor der Klasse Comment.
         */
        public Comment(String author, String comment, String courseName, String timestamp){
        	this.author = author;
        	this.comment = comment;
        	this.courseName = courseName;
        	this.timestamp = timestamp;
        	setHeader(author, timestamp);
        }
        
        
        public void setEmail(String email){
        	this.email = email;
        }
        
        public String getEmail(){
        	return email;
        }
        
        public void setTimestamp(String timestamp){
        	this.timestamp = timestamp;
        }
        
        public String getTimestamp(){
        	return timestamp;
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
        
        
        Map<String, String> header = new HashMap<String, String>();
        public void setHeader(String email, String timestamp){
        	header.put(email, timestamp);
        }
        
        public Map<String, String> getHeader(){
        	return header;
        }
}