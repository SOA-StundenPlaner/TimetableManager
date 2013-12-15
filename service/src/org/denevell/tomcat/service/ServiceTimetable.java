package org.denevell.tomcat.service;

import java.sql.SQLException;

import org.denevell.tomcat.entities.write.Account;
import org.denevell.tomcat.entities.write.Comment;
import org.denevell.tomcat.entities.write.Course;
import org.denevell.tomcat.entities.write.Hour;
import org.denevell.tomcat.entities.write.Timeprofile;
import org.denevell.tomcat.entities.write.Timetable;
import org.denevell.tomcat.entities.write.VisitedCourse;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;

/**
 * Klasse, die den Service implementiert.
 * @author Nicole Hein
 */
public class ServiceTimetable {

	/** Verbindung zur Datenbank **/
	private ConnectionSource cs = null;

	/** DAO für Account **/
	private Dao<Account, String> accountDao = null;

	/** DAO für Comment **/
	private Dao<Comment, Integer> commentDao = null;

	/** DAO für Course **/
	private Dao<Course, String> courseDao = null;

	/** DAO für Hour **/
	private Dao<Hour, Integer> hourDao = null;

	/** DAO für Timeprofile **/
	private Dao<Timeprofile, String> timeprofileDao = null;

	/** DAO für Timetable **/
	private Dao<Timetable, String> timetableDao = null;

	/** DAO für VisitedCourse **/
	private Dao<VisitedCourse, Integer> visitedCourseDao = null;

	
	/**
	 * Konstruktor der Klasse ServiceTimetable.
	 */
	public ServiceTimetable() {
		try {
			cs = new JdbcConnectionSource("jdbc:h2:mem:timetable");
			System.out.println("DatabaseConnection erfolgreich erstellt");
			accountDao = DaoManager.createDao(cs, Account.class);
			TableUtils.createTableIfNotExists(cs, Account.class);
			commentDao = DaoManager.createDao(cs, Comment.class);
			TableUtils.createTableIfNotExists(cs, Comment.class);
			courseDao = DaoManager.createDao(cs, Course.class);
			TableUtils.createTableIfNotExists(cs, Course.class);
			hourDao = DaoManager.createDao(cs, Hour.class);
			TableUtils.createTableIfNotExists(cs, Hour.class);
			timeprofileDao = DaoManager.createDao(cs, Timeprofile.class);
			TableUtils.createTableIfNotExists(cs, Timeprofile.class);
			timetableDao = DaoManager.createDao(cs, Timetable.class);
			TableUtils.createTableIfNotExists(cs, Timetable.class);
			visitedCourseDao = DaoManager.createDao(cs, VisitedCourse.class);
			TableUtils.createTableIfNotExists(cs, VisitedCourse.class);
			System.out.println("DAO und Tabellen erfolgreich erstellt");
		} catch (SQLException e) {}
	}

	/**
	 * Methode, die einen Account mit Benutzernamen und Passwort erstellt.
	 * @param username Benutzername
	 * @param password Passwort
	 * @param email e-Mail-Adresse des Benutzers
	 * @return Gibt wahr zurück, wenn der Account erfolgreich erstellt werden
	 *         konnte. Gibt falsch zurück, wenn der Benutzername bereits
	 *         existiert.
	 */
	public boolean createAccount(String username, String password, String email) {
		Account account = null;
		try {
			account = accountDao.queryForId(email);
			if (account == null){
				account = new Account(username, password, email);
				try {
					accountDao.create(account);
					System.out.println("Account erfolgreich erzeugt: " + accountDao.queryForAll().size());
					return true;
				} catch (SQLException e) {
					System.out.println("Account nicht erzeugt");
					return false;
				}
			}else{
				System.out.println("Account nicht erstellt: existiert bereits");
				return false;
			}
		} catch (SQLException e1) {
			return false;
		}
	}	
	
	
	/**
	 * Methode, die ein Zeitprofil erstellt.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param password Passwort des Benutzers
	 * @param tpName Name des Zeitprofils
	 * @param start Startzeit der Stunde
	 * @param end Endzeit der Stunde
	 * @return
	 */
	public boolean createTimeprofile(String email, String password, String tpName){
		Account account = null;
		Timeprofile tp = null;
		try {
			account = accountDao.queryForId(email);
			tp = timeprofileDao.queryForId(tpName);
			if (account != null && account.getPassword().equals(password)){
				if (tp == null){
					tp = new Timeprofile();
					tp.setName(tpName);
					timeprofileDao.create(tp);
					System.out.println("Zeitprofil erfolgreich erstellt.");
					return true;
				}else{
					System.out.println("Zeitprofil nicht erstellt: Zeitprofil existiert bereits");
					return false;
				}
			}else{
				System.out.println("Zeitprofil nicht erstellt: Account existiert nicht oder Passwort ist falsch");
				return false;
			}
		} catch (SQLException e) {
			return false;
		}
	}
	
	
	/**
	 * Methode, die eine Stunde erstellt.
	 * @param start Startzeit
	 * @param end Endzeit
	 * @param tpName Name des Zeitprofils
	 * @param email e-Mail-Adresse des Benutzers
	 * @param password Passwort des Benutzers
	 * @return
	 */
	public boolean createHour(String start, String end, String tpName, String email, String password){
		Account account = null;
		Timeprofile tp = null;
		try {
			account = accountDao.queryForId(email);
			tp = timeprofileDao.queryForId(tpName);
			if (account != null && account.getPassword().equals(password)){
				if (tp != null){
					Hour hour = new Hour();
					hour.setStarttime(start);
					hour.setEndtime(end);
					hour.setTimeprofileName(tpName);
					hourDao.create(hour);
					System.out.println("Stunde erfolgreich erstellt");
					return true;
				}else{
					System.out.println("Stunde nicht erstellt: Zeitprofil existiert nicht");
					return false;
				}
			}else{
				System.out.println("Stunde nicht erstellt: Account existiert nicht oder Passwort ist falsch");
				return false;
			}
		} catch (SQLException e) {
			return false;
		}
	}
	
	
	/**
	 * Methode, die einen Stundenplan erstellt.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param username Benutzername
	 * @param password Passwort des Benutzers
	 * @param ttName Name des Stundenplans
	 * @param tpName Name des Zeitprofils
	 * @return Gibt wahr zurück, wenn der Stundenplan erfolgreich erstellt
	 *         werden konnte. Gibt falsch zurück, wenn entweder der Benutzer
	 *         nicht existiert, der Stundenplan bereits existiert oder die
	 *         Passworteingabe falsch war.
	 */
	public boolean createTimetable(String email, String password, String ttName, String tpName) {
		Account account = null;
		Timetable tt = null;
		Timeprofile tp = null;
		try {
			account = accountDao.queryForId(email);
			tt = timetableDao.queryForId(ttName);
			tp = timeprofileDao.queryForId(tpName);
			if (account != null && account.getPassword().equals(password)) {
				if (tt != null) {
					System.out.println("Stundenplan nicht erstellt: existiert bereits");
					return false;
				} else {
					if (tp != null){
						tt = new Timetable();
						try {
							tt.setName(ttName);
							tt.setTimeprofile(tp);
							timetableDao.create(tt);
							System.out.println("Stundenplan erfolgreich erstellt");
							return true;
						} catch (SQLException e) {
							System.out.println("Stundenplan nicht erstellt");
							return false;
						}
					}else{
						System.out.println("Stundenplan nicht erstellt: Zeitprofil existiert nicht");
						return false;
					}
				}
			}else{
				System.out.println("Stundenplan nicht erstellt: Account existiert nicht oder Passwort ist falsch");
				return false;
			}
		} catch (SQLException e1) {
			return false;
		}
	}
	
	
	/**
	 * Methode, die einen Kurs erstellt.
	 * @param name Name des Kurses
	 * @param shortname Abkürzung des Kurses
	 * @param teacher Lehrernder des Kurses
	 * @param description Beschreibung des Kurses
	 * @param room Raum des Kurses
	 * @return Gibt wahr zurück, wenn der Kurs erfolgreich erstellt werden
	 *         konnte. Gibt falsch zurück, wenn der Kurs bereits existiert.
	 */
	public boolean createCourse(String name, String shortname, String teacher, String description, String room) {
		Course course = null;
		try {
			course = courseDao.queryForId(name);
			if (course == null){
				course = new Course();
				course.setDesciption(description);
				course.setName(name);
				course.setRoom(room);
				course.setShortname(shortname);
				course.setTeacher(teacher);	
				try {
					courseDao.create(course);
					System.out.println("Kurs erfolgreich erzeugt");
					return true;
				} catch (SQLException e) {
					System.out.println("Kurs nicht erzeugt");
					return false;
				}
			}else{
				System.out.println("Kurs nicht erzeugt: existiert bereits");
				return false;
			}
		} catch (SQLException e1) {
			return false;
		}
	}

	/**
	 * Methode, die einen Kommentar erstellt.
	 * @param author Autor des Kommentars
	 * @param password Passwort des Autors
	 * @param c Kommentar
	 * @param courseName Name des Kurses
	 * @return Gibt wahr zurück, wenn der Kommentar erfolgreich erstellt werden
	 *         konnte. Gibt falsch zurück, wenn der Kurs oder der Autor nicht
	 *         existieren.
	 */
	public boolean createComment(String email, String password, String c, String courseName) {
		Account account = null;
		Course course = null;
		try {
			account = accountDao.queryForId(email);
			course = courseDao.queryForId(courseName);
		} catch (SQLException e1) {
			return false;
		}
		if (account != null && account.getPassword().equals(password)) {
			if (course != null) {
				Comment comment = new Comment();
				comment.setAuthor(account.getUsername());
				comment.setComment(c);
				comment.setCourseName(courseName);
				try {
					course.addComment(comment);
					commentDao.create(comment);
					System.out.println("Kommentar erfolgreich erzeugt");
					return true;
				} catch (SQLException e) {
					System.out.println("Kommentar nicht erzeugt");
					return false;
				}
			}else{
				System.out.println("Kommentar nicht erzeugt: Kurs existiert nicht");
				return false;
			}
		}else{
			System.out.println("Kommentar nicht erzeugt: Account existiert nicht oder Passwort ist falsch");
			return false;
		}
	}

	
	/**
	 * Methode, die einen besuchten Kurs erstellt.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param username Benutzername
	 * @param password Passwort
	 * @param ttName Name des Stundenplans
	 * @param courseName Name des Kurses
	 * @param day Tag
	 * @param hourIndex Stunde
	 * @return Gibt wahr zurück, wenn der besuchte Kurs erfolgreich erstellt
	 *         werden konnte. Gibt falsch zurück, wenn entweder der Kurs nicht
	 *         existiert, der Zeitplan nicht bereits existiert oder die
	 *         Passworteingabe falsch war.
	 */
	public boolean createVisitedCourse(String email, String password, String ttName, String courseName, int day, int hourIndex) {
		Account account = null;
		Course course = null;
		Hour hour = null;
		Timetable tt = null;
		try {
			account = accountDao.queryForId(email);
			course = courseDao.queryForId(courseName);
			hour = hourDao.queryForId(hourIndex);
			tt = timetableDao.queryForId(ttName);
			if (account != null && account.getPassword().equals(password)){
				if (tt != null) {
					if (course != null) {
						VisitedCourse vc = new VisitedCourse();
						vc.setCourse(course);
						vc.setDay(day);
						vc.setHour(hour);
						visitedCourseDao.create(vc);
						System.out.println("Besuchter Kurs erfolgreich erstellt");
						return true;
					}else{
						System.out.println("Besuchter Kurs nicht erstellt: Kurs existiert nicht");
						return false;
					}
				}else{
					System.out.println("Besuchter Kurs nicht erstellt: Stundenplan existiert nicht");
					return false;
				}
			}else{
				System.out.println("Besuchter nicht erstellt: Account existiert nicht oder Passwort ist falsch");
				return false;
			}
		} catch (SQLException e) {
			return false;
		}
	}
}