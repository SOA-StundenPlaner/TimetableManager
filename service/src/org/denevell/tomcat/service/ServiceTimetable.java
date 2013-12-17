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
	private Dao<Comment, String> commentDao = null;

	/** DAO für Course **/
	private Dao<Course, String> courseDao = null;

	/** DAO für Hour **/
	private Dao<Hour, Integer> hourDao = null;

	/** DAO für Timeprofile **/
	private Dao<Timeprofile, String> timeprofileDao = null;

	/** DAO für Timetable **/
	private Dao<Timetable, String> timetableDao = null;

	/** DAO für VisitedCourse **/
	private Dao<VisitedCourse, String> visitedCourseDao = null;

	
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
	 * @throws SQLException 
	 */
	public boolean createAccount(String username, String password, String email) throws SQLException {
		Account account = accountDao.queryForId(email);
		if (account == null){
			account = new Account(username, password, email);
			accountDao.create(account);
			System.out.println("Account erfolgreich erzeugt: " + accountDao.queryForAll().size());
			return true;
		}else{
			System.out.println("Account nicht erstellt: existiert bereits");
			return false;
		}
	}
	
	
	public boolean editAccount(String username, String email, String password) throws SQLException{
		Account account = accountDao.queryForId(email);
		if (account != null){
			if (account.getMail().equals(email) && account.getPassword().equals(password)){
				accountDao.delete(account);
				account.setMail(email);
				account.setPassword(password);
				account.setUsername(username);
				accountDao.create(account);
				System.out.println("Account wurde erfolgreich geändert");
				return true;
			}else{
				System.out.println("Account nicht geändert: Benutzername oder Passwort falsch");
				return false;
			}
		}else{
			System.out.println("Account nicht geändert: Account existiert nicht");
			return false;
		}
	}
	
	
	/**
	 * Methode, die einen Account löscht.
	 * @param email e-Mail-Adresse des Benutzers
	 * @param password Passwort des Benutzers
	 * @return Gibt wahr zurück, wenn der Account erfolgreich gelöscht wurde.
	 * 		   Gibt falsch zurück, wenn der Account nicht gelöscht wurde
	 * 		   (Passwort falsch; Account existiert nicht).
	 * @throws SQLException 
	 */
	public boolean removeAccount(String email, String password) throws SQLException{
		Account account = accountDao.queryForId(email);
		if (account != null){
			if (account.getPassword().equals(password)){
				accountDao.deleteById(email);
				System.out.println("Account wurde erfolgreich gelöscht");
				return true;
			}else{
				System.out.println("Account wurde nicht gelöscht: Passwort falsch");
				return false;
			}	
		}else{
			System.out.println("Account wurde nicht gelöscht: Account existiert nicht");
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
	 * @throws SQLException 
	 */
	public boolean createTimeprofile(String email, String password, String tpName) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timeprofile tp = timeprofileDao.queryForId(tpName);
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
	}
	
	
	public boolean editTimeprofile(String email, String password, String tpName) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timeprofile tp = timeprofileDao.queryForId(tpName);
		if (account != null){
			if (tp != null){
				if (account.getMail().equals(email) && account.getPassword().equals(password)){
					timeprofileDao.delete(tp);
					tp.setName(tpName);
					timeprofileDao.create(tp);
					System.out.println("Zeitprofil erfolgreich geändert");
					return true;
				}else{
					System.out.println("Zeitprofil nicht geändert: Nutzername oder Passwort falsch");
					return false;
				}
			}else{
				System.out.println("Zeitprofil nicht geändert: Zeitprofil existiert nicht");
				return false;
			}
		}else{
			System.out.println("Zeitprofil nicht geändert: Account existiert nicht");
			return false;
		}
	}

	
	/**
	 * Methode, die ein Zeitprofil löscht.
	 * @param timeprofile
	 * @param email
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public boolean removeTimeprofile(String timeprofile, String email, String password) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timeprofile tp = timeprofileDao.queryForId(timeprofile);
		if (account != null){
			if (account.getPassword().equals(password)){
				if (tp != null){
					timeprofileDao.deleteById(timeprofile);	
					System.out.println("Zeitprofil wurde erfolgreich gelöscht");
					return true;
				}else{
					System.out.println("Zeitprofil nicht gelöscht: Zeitprofil existiert nicht");
					return false;
				}
			}else{
				System.out.println("Zeitprofil nicht gelöscht: Passwort falsch");
				return false;
			}
		}else{
			System.out.println("Zeitprofile nicht gelöscht: Account existiert nicht");
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
	 * @throws SQLException 
	 */
	public boolean createHour(String start, String end, String tpName, String email, String password, int hourIndex) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timeprofile tp = timeprofileDao.queryForId(tpName);
		if (account != null && account.getPassword().equals(password)){
			if (tp != null){
				Hour hour = new Hour();
				hour.setStarttime(start);
				hour.setEndtime(end);
				hour.setHourIndex(hourIndex);
				hour.setTimeprofileName(tpName);
				tp.addHour(hour);
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
	 * @throws SQLException 
	 */
	public boolean createTimetable(String email, String password, String ttName, String tpName) throws SQLException {
		Account account = accountDao.queryForId(email);
		Timetable tt = timetableDao.queryForId(ttName);
		Timeprofile tp = timeprofileDao.queryForId(tpName);
		if (account != null && account.getPassword().equals(password)) {
			if (tt != null) {
				System.out.println("Stundenplan nicht erstellt: existiert bereits");
				return false;
			} else {
				if (tp != null){
					tt = new Timetable();
					tt.setName(ttName);
					tt.setTimeprofile(tp);
					timetableDao.create(tt);
					System.out.println("Stundenplan erfolgreich erstellt");
					return true;
				}else{
					System.out.println("Stundenplan nicht erstellt: Zeitprofil existiert nicht");
					return false;
				}
			}
		}else{
			System.out.println("Stundenplan nicht erstellt: Account existiert nicht oder Passwort ist falsch");
			return false;
		}
	}

	
	public boolean editTimetable(String ttName, String tpName, String email, String password) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timetable timetable = timetableDao.queryForId(ttName);
		Timeprofile timeprofile = timeprofileDao.queryForId(tpName);
		if (account != null){
			if (timetable != null){
				if (account.getMail().equals(email) && account.getPassword().equals(password)){
					timetableDao.delete(timetable);
					timetable.setName(ttName);
					timetable.setTimeprofile(timeprofile);
					timetableDao.create(timetable);
					System.out.println("Stundenplan erfolgreich geändert");
					return true;
				}else{
					System.out.println("Stundenplan nicht geändert: Nutzername oder Passwort falsch");
					return false;
				}
			}else{
				System.out.println("Stundenplan nicht geändert: Stundenplan existiert nicht");
				return false;
			}
		}else{
			System.out.println("Stundenplan nicht geändert: Account existiert nicht");
			return false;
		}
	}
	
	
	/**
	 * Methode, die einen Stundenplan löscht.
	 * @param ttName
	 * @param email
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public boolean removeTimetable(String ttName, String email, String password) throws SQLException{
		Account account = accountDao.queryForId(email);
		Timetable tt = timetableDao.queryForId(ttName);
		if (account != null){
			if (account.getPassword().equals(password)){
				if (tt != null){
					timetableDao.deleteById(ttName);
					System.out.println("Stundenplan erfolgreich gelöscht");
					return true;
				}else{
					System.out.println("Stundenplan nicht gelöscht: Stundenplan existiert nicht");
					return false;
				}
			}else{
				System.out.println("Stundenplan nicht gelöscht: Passwort falsch");
				return false;
			}
		}else{
			System.out.println("Stundenplan nicht gelöscht: Account existiert nicht");
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
	 * @throws SQLException 
	 */
	public boolean createCourse(String name, String shortname, String teacher, String description, String room) throws SQLException {
		Course course = courseDao.queryForId(name);
		if (course == null){
			course = new Course();
			course.setDesciption(description);
			course.setName(name);
			course.setRoom(room);
			course.setShortname(shortname);
			course.setTeacher(teacher);
			courseDao.create(course);
			System.out.println("Kurs erfolgreich erzeugt");
			return true;
		}else{
			System.out.println("Kurs nicht erzeugt: existiert bereits");
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
	 * @throws SQLException
	 */
	public boolean createComment(String email, String password, String c, String courseName) throws SQLException {
		Account account = accountDao.queryForId(email);
		Course course = courseDao.queryForId(courseName);
		if (account != null && account.getPassword().equals(password)) {
			if (course != null) {
				Comment comment = new Comment();
				comment.setAuthor(account.getUsername());
				comment.setComment(c);
				comment.setCourseName(courseName);
				commentDao.create(comment);
				System.out.println("Kommentar erfolgreich erzeugt");
				return true;
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
	 * Methode, die einen Kommentar löscht.
	 * @param email
	 * @param password
	 * @param courseName
	 * @param comment
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings("unused")
	public boolean removeComment(String email, String password, String courseName, String comment) throws SQLException{
		Account account = accountDao.queryForId(email);
		Comment c = commentDao.queryForId(account.getUsername()+courseName+comment);
		Course course = courseDao.queryForId(courseName);
		if (account != null){
			if (account.getPassword().equals(password)){
				if (c != null){
					if (c.getAuthor().equals(account.getUsername())){
						commentDao.deleteById(account.getUsername()+courseName+comment);
						System.out.println("Kommentar erfolgreich gelöscht");
						return true;
					}else{
						System.out.println("Kommentar nicht gelöscht: Autor ist nicht Nutzer");
						return false;
					}
				}else{
					System.out.println("Kommentar nicht gelöscht: Kommentar existiert nicht");
					return false;
				}
			}else{
				System.out.println("Kommentar nicht gelöscht: Passwort falsch");
				return false;
			}
		}else{
			System.out.println("Kommentar nicht gelöscht: Account existiert nicht");
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
	 * @throws SQLException 
	 */
	public boolean createVisitedCourse(String email, String password, String ttName, String tpName, String courseName, int day, int hourIndex) throws SQLException {
		VisitedCourse vc = new VisitedCourse();
		Account account = accountDao.queryForId(email);
		Course course = courseDao.queryForId(courseName);
		Timetable tt = timetableDao.queryForId(ttName);
		if (account != null && account.getPassword().equals(password)){
			if (tt != null) {
				if (course != null) {
					vc.setCourse(course);
					vc.setDay(day);
					vc.setHour(tt.getTimeprofile().getHourByIndex(hourIndex, hourDao.queryForAll()));
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
	}
	
	
	/**
	 * Methode, die einen besuchten Kurs löscht.
	 * @param courseName
	 * @param email
	 * @param password
	 * @param ttName
	 * @return
	 * @throws SQLException
	 */
	public boolean removeVisitedCourse(String courseName, String email, String password, String ttName) throws SQLException{
		Account account = accountDao.queryForId(email);
		VisitedCourse vs = visitedCourseDao.queryForId(courseName);
		Timetable tt = timetableDao.queryForId(ttName);
		if (account != null){
			if (account.getPassword().equals(password)){
				if (vs != null && tt != null){
					visitedCourseDao.deleteById(courseName);
					System.out.println("Kurs erfolgreich gelöscht");
					return true;
				}else{
					System.out.println("Kurs nicht gelöscht: Kurs oder Stundenplan existiert nicht");
					return false;
				}
			}else{
				System.out.println("Kurs nicht gelöscht: Passwort falsch");
				return false;
			}
		}else{
			System.out.println("Kurs nicht gelöscht: Account existiert nicht");
			return false;
		}
	}
}