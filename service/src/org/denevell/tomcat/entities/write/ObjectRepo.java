package org.denevell.tomcat.entities.write;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Klasse, die als Objekt-Repository dient.
 * 
 * @author Nicole Hein
 */
public class ObjectRepo {

	/** Map der Accounts (String = ID) **/
	public Map<String, Account> accounts = new HashMap<String, Account>();

	/** Map der Kurse (String = ID) **/
	public Map<String, Course> courses = new HashMap<String, Course>();

	/** Map der besuchten Kurse (String = ID) **/
	public Map<String, VisitedCourse> visitedCourses = new HashMap<String, VisitedCourse>();
	
	/** Liste der Teilnehmer **/
	private List<String> participants = new ArrayList<String>();

	/**
	 * Konstruktor der Klasse ObjectRepo.
	 */
	private ObjectRepo() {

	}

	/** Instanz der Klasse ObjectRepo **/
	private static ObjectRepo instance = null;

	/**
	 * Getter, der die Instanz der Klasse ObjectRepo setzt, wenn sie noch nicht
	 * existiert.
	 * 
	 * @return Instanz
	 */
	public static ObjectRepo getInstance() {
		if (instance == null) {
			instance = new ObjectRepo();
		}
		return instance;
	}

	/**
	 * Methode, die einen Account zur Map der Accounts hinzufügt.
	 * 
	 * @param account
	 *            Account
	 */
	public void addAccount(Account account) {
		accounts.put(account.getMail(), account);
	}

	/**
	 * Methode, die einen Account aus der Map der Accounts entfernt.
	 * 
	 * @param account
	 *            Account
	 * @return
	 */
	public boolean removeAccount(Account account) {
		if (accounts.containsKey(account.getMail())) {
			for (int i = 0; i < account.getTimeprofiles().size(); i++) {
				for (int j = 0; j < account.getTimeprofiles().get(i).getHours().size(); i++) {
					account.getTimeprofiles().get(i).getHours().remove(j);
				}
				account.getTimeprofiles().remove(i);
			}
			for (int i = 0; i < account.getTimetables().size(); i++) {
				account.getTimetables().remove(i);
			}
			for (int i = 0; i < account.getVisitedCourses().size(); i++) {
				account.getVisitedCourses().remove(i);
			}
			accounts.remove(account.getMail());
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Methode, die die Map der Accounts zurück gibt.
	 * 
	 * @return
	 */
	public Map<String, Account> getAccounts() {
		return accounts;
	}

	/**
	 * Methode, die einen Kurs zur Map der Kurse hinzufügt.
	 * 
	 * @param course
	 *            Kurs
	 */
	public void addCourse(Course course) {
		courses.put(course.getName() + course.getDesciption(), course);
	}

	/**
	 * Methode, die einen Kurs aus der Liste der Kurse entfernt.
	 * 
	 * @param course
	 *            Kurs
	 * @return
	 */
	public boolean removeCourse(Course course) {
		if (courses.containsKey(course.getName() + course.getDesciption())) {
			courses.remove(course.getName() + course.getDesciption());
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Methode, die die Liste aller Kurse zurück gibt.
	 * 
	 * @return
	 */
	public Map<String, Course> getCourses() {
		return courses;
	}
	
	
	public Account getAccount(String email){
		if (ObjectRepo.getInstance().accounts.containsKey(email)){
			return ObjectRepo.getInstance().accounts.get(email);
		}else{
			return null;
		}
		
	}
	
	
	public Timeprofile getTimeprofile(String timeprofileName, String email){
		Account account = getAccount(email);
		if (account.getTimeprofiles().containsKey(timeprofileName+account.getMail())){
			return account.getTimeprofiles().get(timeprofileName+account.getMail());
		}else{
			return null;
		}
	}
	
	
	public Timetable getTimetable(String timetableName, String email){
		Account account = getAccount(email);
		if (account.getTimetables().containsKey(timetableName+account.getMail())){
			return account.getTimetables().get(timetableName+account.getMail());
		}else{
			return null;
		}
	}
	
	
	public Course getCourse(String courseID){
		if (ObjectRepo.getInstance().courses.containsKey(courseID)){
			return ObjectRepo.getInstance().courses.get(courseID);
		}else{
			return null;
		}
	}
	
	
	public Comment getComment(String courseID, String commentID){
		Course course = getCourse(courseID);
		if (course.getCommentsOfCourse().containsKey(commentID)){
			return course.getCommentsOfCourse().get(commentID);
		}else{
			return null;
		}
	}
	
	
	/**
	 * Methode, die einen Teilnehmer hinzufügt.
	 * 
	 * @param account
	 */
	public void addParticipant(String email) {
		participants.add(email);
	}

	/**
	 * Methode, die einen Teilnehmer entfernt.
	 * 
	 * @param account zu entfernender Teilnehmer
	 * @return
	 */
	public boolean removeParticipant(String email) {
		if (participants.contains(email)) {
			participants.remove(email);
			if (visibleParticipants.contains(email)){
				visibleParticipants.remove(email);
			}
			return true;
		} else {
			return false;
		}
	}

	List<String> visibleParticipants = new ArrayList<String>();
	
	/**
	 * Methode, die die Map der Teilnehmer zurück gibt.
	 * 
	 * @return Map der Teilnehmer eines Kurses
	 */
	public List<String> getParticipants() {
		for (int i = 0; i < participants.size(); i++) {
			if (ObjectRepo.getInstance().accounts.get(participants.get(i)).getVisibility() == 1) {
				visibleParticipants.add(ObjectRepo.getInstance().accounts.get(participants.get(i)).getMail());
			}
		}
		return visibleParticipants;
	}
}