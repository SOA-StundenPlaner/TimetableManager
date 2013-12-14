package org.denevell.tomcat.service;

import java.sql.SQLException;
import java.util.List;

import org.denevell.tomcat.entities.write.Account;
import org.denevell.tomcat.entities.write.Comment;
import org.denevell.tomcat.entities.write.Course;
import org.denevell.tomcat.entities.write.Hour;
import org.denevell.tomcat.entities.write.ObjectRepo;
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
 * 
 * @author Nicole Hein
 * 
 */
public class ServiceTimetable {

	/** Verbindung zur Datenbank **/
	private ConnectionSource cs = null;

	/** DAO für Account **/
	private Dao<Account, String> accountDao = null;

	/** DAO für Comment **/
	private Dao<Comment, Integer> commentDao = null;

	/** DAO für Course **/
	private Dao<Course, Integer> courseDao = null;

	/** DAO für Hour **/
	private Dao<Hour, Integer> hourDao = null;

	/** DAO für ObjectRepo **/
	private Dao<ObjectRepo, Void> objectRepoDao = null;

	/** DAO für Timeprofile **/
	private Dao<Timeprofile, Integer> timeprofileDao = null;

	/** DAO für Timetable **/
	private Dao<Timetable, Integer> timetableDao = null;

	/** DAO für VisitedCourse **/
	private Dao<VisitedCourse, Integer> visitedCourseDao = null;

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
			objectRepoDao = DaoManager.createDao(cs, ObjectRepo.class);
			TableUtils.createTableIfNotExists(cs, ObjectRepo.class);
			timeprofileDao = DaoManager.createDao(cs, Timeprofile.class);
			TableUtils.createTableIfNotExists(cs, Timeprofile.class);
			timetableDao = DaoManager.createDao(cs, Timetable.class);
			TableUtils.createTableIfNotExists(cs, Timetable.class);
			visitedCourseDao = DaoManager.createDao(cs, VisitedCourse.class);
			TableUtils.createTableIfNotExists(cs, VisitedCourse.class);
			System.out.println("DAO und Tabellen erfolgreich erstellt");
		} catch (SQLException e) {
			e.printStackTrace();
		}
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
		Account account = new Account(username, password, email);
		List<Account> accounts = null;
		try {
			accounts = accountDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		try {
			accountDao.create(account);
			accounts.add(account);
			System.out.println("Account erfolgreich erzeugt");
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Account nicht erzeugt");
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
		Course course = new Course();
		course.setDesciption(description);
		course.setName(name);
		course.setRoom(room);
		course.setShortname(shortname);
		course.setTeacher(teacher);
		List<Course> courseList = null;
		try {
			courseList = courseDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		try {
			courseDao.create(course);
			courseList.add(course);
			System.out.println("Kurs erfolgreich erzeugt");
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Kurs nicht erzeugt");
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
	public boolean createComment(String email, String author, String password, String c, String courseName) {
		List<Account> accounts = null;
		List<Course> courseList = null;
		try {
			accounts = accountDao.queryForAll();
			courseList = courseDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		int accountIndex = ObjectRepo.getInstance().searchForAccount(email, accounts);
		int courseIndex = ObjectRepo.getInstance().searchForCourse(courseName, courseList);
		if (accountIndex!=-1) {
			if (courseIndex!=-1) {
				Comment comment = new Comment();
				comment.setAuthor(author);
				comment.setComment(c);
				try {
					courseList.get(courseIndex).addComment(comment);
					commentDao.create(comment);
					System.out.println("Kommentar erfolgreich erzeugt");
					return true;
				} catch (SQLException e) {
					e.printStackTrace();
					System.out.println("Kommentar nicht erzeugt");
					return false;
				}
			}else{
				return false;
			}
		}else{
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
	public boolean createTimetable(String email, String username, String password, String ttName, String tpName) {
		List<Account> accounts = null;
		try {
			accounts = accountDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		int accountIndex = ObjectRepo.getInstance().searchForAccount(email, accounts);
		if (accountIndex!=-1) {
			if (accounts.get(accountIndex).tt.containsKey(ttName)) {
				return false;
			} else {
				Timetable tt = new Timetable();
				try {
					timetableDao.create(tt);
					tt.setName(ttName);
					tt.setTimeprofile(accounts.get(accountIndex).timeprofiles.get(tpName));
					accounts.get(accountIndex).tt.put(tpName, tt);
					System.out.println("Stundenplan erfolgreich erstellt");
					return true;
				} catch (SQLException e) {
					e.printStackTrace();
					System.out.println("Stundenplan nicht erstellt");
					return false;
				}
			}
		}else{
			return false;
		}
	}

	/**
	 * Methode, die ein Zeitprofil erstellt.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param username Benutzername
	 * @param password Passwort des Benutzers
	 * @param tpName Name des Zeitprofils
	 * @param numberOfWeekdays Anzahhl der Wochentage
	 * @return Gibt wahr zurück, wenn das Zeitprofil erfolgreich erstellt werden
	 *         konnte. Gibt falsch zurück, wenn der Benutzer nicht existiert
	 *         oder die Passworteingabe falsch war.
	 */
	public boolean createTimeprofile(String email, String username, String password, String tpName, int numberOfWeekdays) {
		List<Account> accounts = null;
		try {
			accounts = accountDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		int accountIndex = ObjectRepo.getInstance().searchForAccount(email, accounts);
		if (accountIndex!=-1) {
			try {
				Timeprofile tp = new Timeprofile();
				tp.setHours(accounts.get(accountIndex).timeprofiles.get(tpName).getHours());
				tp.setName(tpName);
				tp.setNumberOfWeekdays(numberOfWeekdays);
				accounts.get(accountIndex).timeprofiles.put(tpName, tp);
				timeprofileDao.create(tp);
				System.out.println("Zeitprofil erfolgreich erstellt");
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("Zeitprofil nicht erstellt");
				return false;
			}
		}else{
			return false;
		}
	}

	/**
	 * Methode, die einen besuchten Kurs erstellt.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param username Benutzername
	 * @param password Passwort
	 * @param tpName Name des Zeitprofils
	 * @param courseName Name des Kurses
	 * @param day Tag
	 * @param hourIndex Stunde
	 * @return Gibt wahr zurück, wenn der besuchte Kurs erfolgreich erstellt
	 *         werden konnte. Gibt falsch zurück, wenn entweder der Kurs nicht
	 *         existiert, der Zeitplan nicht bereits existiert oder die
	 *         Passworteingabe falsch war.
	 */
	public boolean createVisitedCourse(String email, String username, String password, String tpName, String courseName, int day, int hourIndex) {
		List<Account> accounts = null;
		List<Course> courseList = null;
		try {
			accounts = accountDao.queryForAll();
			courseList = courseDao.queryForAll();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		int accountIndex = ObjectRepo.getInstance().searchForAccount(email, accounts);
		int courseIndex = ObjectRepo.getInstance().searchForCourse(courseName, courseList);
		if (accounts.get(accountIndex).timeprofiles.containsKey(tpName)) {
			if (courseIndex!=-1) {
				List<Hour> hourList = null;
				try {
					hourList = hourDao.queryForAll();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				Hour hour = hourList.get(hourIndex);
				VisitedCourse vc = new VisitedCourse();
				vc.setCourse(courseList.get(courseIndex));
				vc.setDay(day);
				vc.setHour(hour);
			}
			return true;
		} else {
			return false;
		}
	}
}