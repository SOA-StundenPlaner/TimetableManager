package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Klasse, die einen Kurs implementiert.
 * @author Nicole Hein
 */
public class Course {
        
        /** Name des Kurses **/
        private String name;
        
        /** Abkürzung des Namens des Kurses **/
        private String shortname;
        
        /** Name des Lehrenden **/
        private String teacher;
        
        /**Beschreibung des Kurses**/
        private String description;
        
        /** Raum des Kurses **/
        private String room;
        
        /** Map von Kommentaren **/
        private Map<String, Comment> comments = new HashMap<String, Comment>();
        
        /** Liste der Teilnehmer des Kurses **/
        private List<Account> participants = new ArrayList<Account>();
        
        
        /**
         * Konstruktor der Klasse Course.
         */
        public Course(String name, String shortname, String room, String teacher, String description){
        	this.name = name;
        	this.shortname = shortname;
        	this.room = room;
        	this.teacher = teacher;
        	this.description = description;
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
                return description;
        }

        /**
         * Setter, der die Beschreibung des Kurses setzt.
         * @param desciption Beschreibung des Kurses
         */
        public void setDesciption(String desciption) {
                this.description = desciption;
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
           	comments.put(comment.getAuthor()+comment.getComment()+name+description, comment);
        }
        
        
        /**
         * Methode, die einen Kommentar aus der Liste der Kommentare löscht.
         * @param comment zu löschender Kommentar
         * @return Gibt wahr zurück, wenn der Kommentar erfolgreich gelöscht wurde. Gibt falsch zurück, wenn der Kommentar nicht gefunden werden konnte.
         */
        public boolean removeComment(Comment comment){
        	if (comments.containsKey(comment.getAuthor()+comment.getComment()+name+description)){
        		comments.remove(comment.getAuthor()+comment.getComment()+name+description);
                	return true;
            }else{
              	return false;
            }
        }
        
        
        
        /**
         * Methode, die die Liste der Kommentare des Kurses zurück gibt.
         * @return
         */
        public Map<String, Comment> getCommentsOfCourse(){
        	return comments;
        }
        
        public void addParticipant(Account account){
        	participants.add(account);
        }
        
        public boolean removeParticipant(Account account){
        	if (participants.contains(account)){
        		participants.remove(account);
        		return true;
        	}else{
        		return false;
        	}
        }
        
        public List<Account> getParticipants(){
        	return participants;
        }
}