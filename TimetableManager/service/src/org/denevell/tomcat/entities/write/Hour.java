package org.denevell.tomcat.entities.write;


/**
 * Klasse, die eine (Schul-)Stunde implementiert.
 * @author Nicole Hein
 */
public class Hour {
	/** ID **/
	private int id;
	
	/** Zeit, zu der die Stunde startet **/
	private String starttime;
	
	/** Zeit, zu der due Stunde endet **/
	private String endtime;
	
	/** Name des Zeitprofils **/
	private String tpName;
	
	/** Index der Stunde **/
	private int hourIndex;
	
	/**
	 * Konstruktor der Klasse Hour.
	 */
	public Hour(String start, String end, int hourIndex, String timeprofileName){
		this.starttime = start;
		this.endtime = end;
		this.hourIndex = hourIndex;
		this.tpName = timeprofileName;
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
	public String getStarttime() {
		return starttime;
	}
	
	/**
	 * Setter, der die Startzeit von einem String in ein Datum umwandelt.
	 * @param starttime Beginn der Stunde
	 */
//	public void setStarttime(String starttime) {
//		SimpleDateFormat df = new SimpleDateFormat("HH:mm"); 
//		try {
//			this.starttime = df.parse(starttime);
//		} catch (ParseException e) {
//			System.out.println("Falsches Zeitformat.");
//			e.printStackTrace();
//		}
//	}
	public void setStarttime(String starttime){
		this.starttime = starttime;
	}

	/**
	 * Getter, der das Ende der Stunde zurück gibt.
	 * @return the endtime Ende der Stunde
	 */
	public String getEndtime() {
		return endtime;
	}
	
	/**
	 * Setter, der das Ende der Stunde von einem String in ein Datum umwandelt.
	 * @param endtime Ende der Stunde
	 */
//	public void setEndtime(String endtime) {
//		SimpleDateFormat df = new SimpleDateFormat("HH:mm"); 
//		try {
//			this.endtime = df.parse(endtime);
//		} catch (ParseException e) {
//			System.out.println("Falsches Zeitformat.");
//			e.printStackTrace();
//		}		
//	}
	public void setEndtime(String endtime){
		this.endtime = endtime;
	}
}