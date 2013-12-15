package org.denevell.tomcat.entities.write;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die eine (Schul-)Stunde implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "hour")
public class Hour {
	/** ID **/
	@DatabaseField(canBeNull = false, generatedId = true)
	private int id;
	
	/** Zeit, zu der die Stunde startet **/
	@DatabaseField(canBeNull = false)
	private Date starttime;
	
	/** Zeit, zu der due Stunde endet **/
	@DatabaseField(canBeNull = false)
	private Date endtime;
	
	/** Name des Zeitprofils **/
	@DatabaseField(canBeNull = false)
	private String tpName;
	
	/** Zeitprofil **/
	@DatabaseField(foreign = true)
	private Timeprofile timeprofile;
	
	/** Index der Stunde **/
	@DatabaseField(canBeNull = false)
	private int hourIndex;
	
	/**
	 * Konstruktor der Klasse Hour.
	 */
	public Hour(){
		
	}
	
	
	/**
	 * Getter, der die ID zurück gibt.
	 * @return ID
	 */
	public int getId(){
		return id;
	}
	
	
	/**
	 * Setter, der den Index der Stunde setzt (z.B. 1. Stunde).
	 * @param hourIndex Index der Stunde
	 */
	public void setHourIndex(int hourIndex){
		this.hourIndex = hourIndex;
	}
	
	
	/**
	 * Getter, der den Index der Stunde zurück gibt.
	 * @return Index der Stunde
	 */
	public int getHourIndex(){
		return hourIndex;
	}
	
	
	/**
	 * Setter, der den Namen des Zeitprofils setzt.
	 * @param tpName Name des Zeitprofils
	 */
	public void setTimeprofileName(String tpName){
		this.tpName = tpName;
	}
	
	
	/**
	 * Getter, der den Namen des Zeitprofils zurück gibt.
	 * @return Name des Zeitprofils
	 */
	public String getTimeprofileName(){
		return tpName;
	}
	
	
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