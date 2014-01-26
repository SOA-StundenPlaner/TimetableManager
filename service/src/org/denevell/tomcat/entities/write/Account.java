package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Klasse, die einen Account implementiert.
 * @author Nicole Hein
 */
public class Account {

        /** Benutzername fuer den Account **/
        private String username;
        
        /** Passwort des Benutzers fuer den Account **/
        private String password;
        
        /** e-Mail-Adresse des Benutzers **/
        private String email;
        
        /** Sichtbarkeit des Benutzers (0=nicht sichtbar, 1=sichtbar) **/
        private int visibility;
        
        /** Map der Zeitprofile (Key=timeprofileName+email, Value=Timeprofile) **/
        private Map<String, Timeprofile> timeprofiles = new HashMap<String, Timeprofile>();
        
        /** Map der Stundenpläne (Key=timetableName+email, Value=Timetable) **/
        private Map<String, Timetable> timetables = new HashMap<String, Timetable>();
        
        /** Map der besuchten Kurse (Key=visitedCourseName+description, Value=VisitedCourse) **/
        private List<VisitedCourse> visitedCourses = new ArrayList<VisitedCourse>();        
        
        
        /**
         * Konstruktor der Klasse Account.
         * @param username Benutzername
         * @param password Passwort
         * @param email e-Mail-Adresse (ID)
         * @param visibility Sichtbarkeit
         */
        public Account(String username, String password, String email, int visibility){
                this.username = username;
                this.password = password;
                this.email = email;
                this.visibility = visibility;
        }
        

        /**
         * Getter, der das Passwort des Benutzers zurück gibt.
         * @return Passwort des Benutzers
         */
        public String getPassword(){
                return password;
        }
        
        
        /**
         * Setter, der das Passwort den Benutzers setzt.
         * @param password Passwort
         */
        public void setPassword(String password){
        	this.password = password;
        }
        
        
        /**
         * Getter, der die e-Mail-Adresse des Benutzers zurück gibt.
         * @return e-Mail-Adresse
         */
        public String getMail(){
        	return email;
        }
        
        
        /**
         * Setter, der die e-Mail-Adresse setzt.
         * @param email e-Mail-Adresse
         */
        public void setMail(String email){
        	this.email = email;
        }

        
        /**
         * Getter, der den Benutzernamen zurück gibt.
         * @return Benutzername
         */
        public String getUsername(){
        	return username;
        }
        
        
        /**
         * Setter, der den Benutzernamen setzt.
         * @param username Benutzername
         */
        public void setUsername(String username){
        	this.username = username;
        }
        
        
        /**
         * Getter, der die Sichtbarkeit zurück gibt,
         * @return Sichtbarkeit
         */
        public int getVisibility(){
        	return visibility;
        }
        
        
        /**
         * Setter, der die Sichtbarkeit setzt.
         * @param visibility Sichtbarkeit
         */
        public void setVisibility(int visibility){
        	this.visibility = visibility;
        }
                
        
        /**
         * Methode, die ein Zeitprofil zur Map der Zeitprofile hinzufügt.
         * @param timeprofile hinzuzufügendes Zeitprofil
         */
        public void addTimeprofile(Timeprofile timeprofile){
        	timeprofiles.put(timeprofile.getId(), timeprofile);
        }
        
        
        /**
         * Methode, die ein Zeitprofil aus der Map der Zeitprofile löscht.
         * @param timeprofile zu löschendes Zeitprofil
         * @return wahr, wenn erfolgeich Löschung erfolgt; falsch, wenn Zeitprofil nicht exisiert
         */
        public boolean removeTimeprofile(Timeprofile timeprofile){
        	if (timeprofiles.containsValue((timeprofile))){
        		timeprofiles.remove(timeprofile.getId());
        		return true;
        	}else{
        		return false;
        	}
        }
        
        
        /**
         * Getter, der die Map der Zeitprofile zurück gibt.
         * @return Map der Zeitprofile
         */
        public Map<String, Timeprofile> getTimeprofiles(){
        	return timeprofiles;
        }
        
        
        /**
         * Methode, die einen Stundenplan zur Liste der Stundenpläne hinzufügt.
         * @param timetable Stundenplan
         */
        public void addTimetable(Timetable timetable){
        	timetables.put(timetable.getId(), timetable);
        }
        
        
        /**
         * Methode, die einen Stundenplan aus der Liste der Stundenpläne löscht.
         * @param timetable Stundenplan
         * @return
         */
        public boolean removeTimetable(Timetable timetable){
        	if (timetables.containsValue(timetable)){
        		timetables.remove(timetable.getId());
        		return true;
        	}else{
        		return false;
        	}
        }
        
        
        /**
         * Methode, die die Liste der Stundenpläne zurück gibt.
         * @return Liste der Stundenpläne
         */
        public Map<String, Timetable> getTimetables(){
        	return timetables;
        }
        
        
        /**
         * Methode, die einen besuchten Kurs zur Liste der besuchten Kurse hinzufügt.
         * @param visitedCourse besuchter Kurs
         */
        public void addVisitedCourse(VisitedCourse visitedCourse){
        	visitedCourses.add(visitedCourse);
        }
        
        
        /**
         * Methode, die einen besuchten Kurs von der Liste der besuchten Kurse entfernt.
         * @param visitedCourse besuchter Kurs
         * @return
         */
        public boolean removeVisitedCourse(VisitedCourse visitedCourse){
        	if (visitedCourses.contains(visitedCourse)){
        		visitedCourses.remove(visitedCourse.getName()+visitedCourse.getDay()+visitedCourse.getHourIndex());
        		return true;
        	}else{
        		return false;
        	}
        }
        
        
        /**
         * Methode, die die Liste der besuchten Kursen zurück gibt.
         * @return Liste der besuchten Kurse
         */
        public List<VisitedCourse> getVisitedCourses(){
        	return visitedCourses;
        }
      
}