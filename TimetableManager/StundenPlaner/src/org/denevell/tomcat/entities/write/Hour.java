package org.denevell.tomcat.entities.write;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Hour {
	/** Zeit, zu der die Stunde startet **/
	private Date starttime;
	
	/** Zeit, zu der due Stunde endet **/
	private Date endtime;
	
	
	/**
	 * Getter, der den Beginn der Stunde zurück gibt.
	 * @return Beginn der Stunde
	 */
	public Date getStarttime() {
		return starttime;
	}
	
	/**
	 * Setter, der die Startzeit von einem String in ein Datum umwandelt.
	 * @param starttime Beginn der Stunde
	 */
	public void setStarttime(String starttime) {
		SimpleDateFormat df = new SimpleDateFormat("HH:mm"); 
		try {
			this.starttime = df.parse(starttime);
		} catch (ParseException e) {
			System.out.println("Falsches Zeitformat.");
			e.printStackTrace();
		}
	}

	/**
	 * Getter, der das Ende der Stunde zurück gibt.
	 * @return the endtime Ende der Stunde
	 */
	public Date getEndtime() {
		return endtime;
	}
	
	/**
	 * Setter, der das Ende der Stunde von einem String in ein Datum umwandelt.
	 * @param endtime Ende der Stunde
	 */
	public void setEndtime(String endtime) {
		SimpleDateFormat df = new SimpleDateFormat("HH:mm"); 
		try {
			this.endtime = df.parse(endtime);
		} catch (ParseException e) {
			System.out.println("Falsches Zeitformat.");
			e.printStackTrace();
		}		
	}
}