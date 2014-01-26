package org.denevell.tomcat.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.cxf.annotations.Policies;
import org.apache.cxf.annotations.Policy;
import org.denevell.tomcat.entities.write.Account;
import org.denevell.tomcat.entities.write.Comment;
import org.denevell.tomcat.entities.write.Course;
import org.denevell.tomcat.entities.write.Hour;
import org.denevell.tomcat.entities.write.ObjectRepo;
import org.denevell.tomcat.entities.write.Timeprofile;
import org.denevell.tomcat.entities.write.Timetable;
import org.denevell.tomcat.entities.write.VisitedCourse;

import com.google.gson.Gson;

/**
 * Klasse, die den Service implementiert.
 * @author Nicole Hein
 */
@Policies({ @Policy(uri = "securepolicy.xml") })
public class ServiceTimetable {	
	
	@SuppressWarnings("deprecation")
	public String dateToString(Date date){
		if (date.getHours()<10 && date.getHours()>=0 && date.getMinutes()<10 && date.getMinutes()>=0){
			return "0" + date.getHours() + ":0" + date.getMinutes();
		}else if (date.getHours()<10 && date.getHours()>=0 && date.getMinutes()>10){
			return "0" + date.getHours() + ":" + date.getMinutes();
		}else if (date.getHours()>10 && date.getMinutes()<10 && date.getMinutes()>=0){
			return date.getHours() + ":0" + date.getMinutes();
		}else{
			return date.getHours() + ":" + date.getMinutes();
		}
	}
	

	public boolean createAccount(String username, String password, String email, int visibility) {
		if (ObjectRepo.getInstance().getAccount(email) != null){
			return false;
		}else{
			Account account = new Account(username, password, email, visibility);
			ObjectRepo.getInstance().addAccount(account);
			return true;
		}
	}
	
	
	public boolean editAccount(String newUsername, String email, String newEmail, String password, String newPassword, int newVisibility) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && account.getMail().equals(email) && account.getPassword().equals(password)){
			account.setMail(newEmail);
			account.setPassword(newPassword);
			account.setUsername(newUsername);
			account.setVisibility(newVisibility);
			ObjectRepo.getInstance().accounts.remove(email);
			ObjectRepo.getInstance().accounts.put(newEmail, account);
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean editAccountUsername(String email, String password, String newUsername) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && email.equals(account.getMail()) && password.equals(account.getPassword())){
			editAccount(newUsername, email, email, password, password, account.getVisibility());
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean editAccountPassword(String email, String password, String newPassword) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && email.equals(account.getMail()) && password.equals(account.getPassword())){
			editAccount(account.getUsername(), email, email, password, newPassword, account.getVisibility());
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean editAccountEmail(String email, String password, String newEmail) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && email.equals(account.getMail()) && password.equals(account.getPassword())){
			editAccount(account.getUsername(), email, newEmail, password, password, account.getVisibility());
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean editAccountVisibility(String email, String password, int newVisibility) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && email.equals(account.getMail()) && password.equals(account.getPassword())){
			editAccount(account.getUsername(), email, email, password, password, newVisibility);
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean removeAccount(String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account.getPassword().equals(password) && account != null){
			ObjectRepo.getInstance().removeAccount(account);
			return true;
		}else{
			return false;
		}	
	}
	
	Gson accountGson = new Gson();
	
	public String getAccountData(String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		System.out.println(account.getPassword());
		if (email.equals(account.getMail()) && account.getPassword().equals(password) && account != null){
			return accountGson.toJson(ObjectRepo.getInstance().accounts.get(email));
		}else{
			return null;
		}
	}
	
	Gson allAccountsGson = new Gson();
	
	public String getAllAccounts(){
		return allAccountsGson.toJson(ObjectRepo.getInstance().getAccounts());
	}
	
	
	public boolean createTimeprofile(String email, String password, String timeprofileName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (account != null && account.getPassword().equals(password) && timeprofile == null){
			timeprofile = new Timeprofile(timeprofileName+email, timeprofileName);
			account.addTimeprofile(timeprofile);
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean editTimeprofile(String email, String password, String timeprofileName, String newTimeprofileName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (account != null && timeprofile != null && account.getMail().equals(email) && account.getPassword().equals(password)){
			timeprofile.setName(newTimeprofileName);
			timeprofile.setId(newTimeprofileName+email);
			removeTimeprofile(timeprofileName, email, password);
			createTimeprofile(email, password, newTimeprofileName);
			return true;
		}else{
			return false;
		}
	}

	
	public boolean removeTimeprofile(String timeprofileName, String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (account != null && account.getPassword().equals(password) && timeprofile != null){
			account.removeTimeprofile(timeprofile);
			return true;
		}else{
			return false;
		}
	}
	
	Gson timeprofileGson = new Gson();
	
	public String getTimeprofileData(String email, String password, String timeprofileName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (password.equals(account.getPassword()) && timeprofile != null){
			return timeprofileGson.toJson(timeprofile);
		}else{
			return null;
		}
	}

	
	public boolean createHour(String start, String end, String timeprofileName, String email, String password, int hourIndex){
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (account != null && account.getPassword().equals(password) && timeprofile != null){
			Hour hour = new Hour(start, end, hourIndex, timeprofile.getId());
			timeprofile.addHour(hour);
			return true;
		}else{
			return false;
		}
	}
	
	Gson hourGson = new Gson();
	
	public String getHourData(String email, String password, String timeprofileName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (password.equals(account.getPassword()) && timeprofile != null){
			return hourGson.toJson(timeprofile.getHours());
		}else{
			return null;
		}
	}

	
	public boolean createTimetable(String email, String password, String timetableName, String timeprofileName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		if (account != null && account.getPassword().equals(password) && timeprofile != null && timetable == null) {
			timetable = new Timetable(timetableName+email, timetableName, timeprofile);
			account.addTimetable(timetable);
			return true;
		}else{
			return false;
		}
	}

	
	public boolean editTimetable(String timetableName, String newTimetableName, String timeprofileName, String newTimeprofileName, String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		Timeprofile timeprofile = ObjectRepo.getInstance().getTimeprofile(timeprofileName, email);
		if (account != null && timetable != null && account.getMail().equals(email) && account.getPassword().equals(password)){
			timetable.setTimetableName(timetableName);
			editTimeprofile(email, password, newTimeprofileName, newTimetableName);
			timetable.setTimeprofile(timeprofile);
			timetable.setId(timetableName+email);
			removeTimetable(timetableName, email, password);
			createTimetable(email, password, newTimetableName, newTimeprofileName);
			return true;
		}else{
			return false;
		}
	}
	
	
	public boolean removeTimetable(String timetableName, String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		if (account != null && account.getPassword().equals(password) && timetable != null){
			account.removeTimetable(timetable);
			account.removeTimeprofile(timetable.getTimeprofile());
			return true;
		}else{
			return false;
		}
	}
	
	Gson timetableGson = new Gson();
	
	public String getTimetableData(String email, String password, String timetableName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		if (timetable != null && account != null && password.equals(account.getPassword()) && email.equals(account.getMail())){
			return timetableGson.toJson(timetable);
		}else{
			return null;
		}
	}
	
	Gson allTimetablesGson = new Gson();
	
	public String getAllTimetablesOfUser(String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (password.equals(account.getPassword()) && email.equals(account.getMail())){
			return allTimetablesGson.toJson(account.getTimetables());
		}else{
			return null;
		}
	}
	
	
	public boolean createCourse(String name, String shortname, String teacher, String description, String room) {
		Course course = ObjectRepo.getInstance().getCourse(name+description);
		if (course == null){
			course = new Course(name, shortname, room, teacher, description);
			ObjectRepo.getInstance().addCourse(course);
			return true;	
		}else{
			return false;
		}
	}
	
	Gson courseGson = new Gson();
	
	public String getCourseData(String email, String password, String courseName, String description) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Course course = ObjectRepo.getInstance().getCourse(courseName+description);
		if (account != null && course != null && password.equals(account.getPassword()) && email.equals(account.getMail())){
			return courseGson.toJson(course);
		}else{
			return null;
		}
	}
	
	Gson allCoursesGson = new Gson();
	
	public String getAllCourses() {
		return allCoursesGson.toJson(ObjectRepo.getInstance().getCourses());
	}
	
	
	public boolean createComment(String email, String password, String c, String courseName, String courseDescription) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Comment comment = ObjectRepo.getInstance().getComment(courseName+courseDescription, account.getUsername()+c+courseName+courseDescription);
		if (account != null && account.getPassword().equals(password) && email.equals(account.getMail()) && comment == null) {
			comment = new Comment(account.getUsername(), c, courseName, dateToString(new Date()));
			ObjectRepo.getInstance().courses.get(courseName+courseDescription).addComment(comment);
			return true;
		}else{
			return false;
		}
	}
	
	Gson commentHeaderGson = new Gson();
	
	public String getCommentHeaderData(String email, String password, String courseName, String courseDescription, String comment) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Course course = ObjectRepo.getInstance().getCourse(courseName+courseDescription);
		Comment c = ObjectRepo.getInstance().getComment(courseName+courseDescription, account.getUsername()+comment+course.getName()+course.getDesciption());
		if (account != null && course != null && c != null){
			return commentGson.toJson(c.getHeader());
		}else{
			return null;
		}

	}
	
	
	public boolean removeComment(String email, String password, String courseName, String courseDescription, String comment) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Course course = ObjectRepo.getInstance().getCourse(courseName+courseDescription);
		Comment c = ObjectRepo.getInstance().getComment(courseName+courseDescription, account.getUsername()+comment+courseName+courseDescription);
		if (account != null && account.getPassword().equals(password) && c != null && c.getAuthor().equals(account.getUsername())){
			course.removeComment(c);
			return true;
		}else{
			return false;
		}
	}
	
	Gson commentGson = new Gson();
	
	public String getCommentData(String email, String password, String courseName, String courseDescription, String comment) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Comment c = ObjectRepo.getInstance().getComment(courseName+courseDescription, account.getUsername()+comment+courseName+courseDescription);
		if (account != null && password.equals(account.getPassword()) && email.equals(account.getMail()) && c != null){
			return commentGson.toJson(c);
		}else{
			return null;
		}
	}
	
	
	public boolean createVisitedCourse(String email, String password, String timetableName, String timeprofileName, String courseName, String courseDescription, int day, int hourIndex) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Course course = ObjectRepo.getInstance().getCourse(courseName+courseDescription);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		if (account != null && account.getPassword().equals(password) && account.getMail().equals(email) && timetable != null && course != null){
			VisitedCourse vc = new VisitedCourse(email, course.getName(), course.getRoom(), course.getTeacher(), timetableName, day, hourIndex, course.getDesciption(), course.getShortname());
			account.addVisitedCourse(vc);
			timetable.addVisitedCourse(vc);
			ObjectRepo.getInstance().visitedCourses.put(courseName+day+hourIndex, vc);
			ObjectRepo.getInstance().addParticipant(email);
			course.addParticipant(account);
			return true;
		}else{
			return false;
		}
	}
    
	
	public boolean removeVisitedCourse(String courseName, String courseDescription, int visistedCourseDay, int visitedCourseHour, String email, String password, String timetableName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		VisitedCourse vc = null;
		for (int i=0; i<account.getVisitedCourses().size(); i++){
			if (account.getVisitedCourses().get(i).getName().equals(courseName) && account.getVisitedCourses().get(i).getDay()==visistedCourseDay && account.getVisitedCourses().get(i).getHourIndex()==visitedCourseHour){
				vc = account.getVisitedCourses().get(i);
				break;
			}
		}
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		if (account != null && account.getPassword().equals(password) && email.equals(account.getMail()) && vc != null && timetable != null){
			account.removeVisitedCourse(vc);
			timetable.removeVisitedCourse(vc);
			ObjectRepo.getInstance().removeParticipant(email);
			ObjectRepo.getInstance().courses.get(courseName+courseDescription).removeParticipant(account);
			return true;
		}else{
			return false;
		}
	}
	
	Gson visitedCourseGson = new Gson();
	
	public String getVisitedCourseData(String email, String password) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		if (account != null && password.equals(account.getPassword()) && email.equals(account.getMail())){
			return visitedCourseGson.toJson(account.getVisitedCourses());
		}else{
			return null;
		}
	}
	
	Gson participantsOfCourseGson = new Gson();
	
	public String getParticipantsOfCourse(String visitedCourse, int courseDay, int hourIndex) {
		return participantsOfCourseGson.toJson(ObjectRepo.getInstance().getParticipants());
	}
	
	
	Gson visitedCoursesOfTimetableGson = new Gson();
	
	public String getVisitedCoursesOfTimetable(String email, String password, String timetableName) {
		Account account = ObjectRepo.getInstance().getAccount(email);
		Timetable timetable = ObjectRepo.getInstance().getTimetable(timetableName, email);
		List<VisitedCourse> visitedCourses = new ArrayList<VisitedCourse>();
		if (account != null && email.equals(account.getMail()) && password.equals(account.getPassword()) && timetable != null){
			for (int i=0; i<account.getVisitedCourses().size(); i++){
				if (account.getVisitedCourses().get(i).getTimetable().equals(timetableName)){
					visitedCourses.add(account.getVisitedCourses().get(i));
				}
			}
		}
		return visitedCoursesOfTimetableGson.toJson(visitedCourses);
	}
	
}