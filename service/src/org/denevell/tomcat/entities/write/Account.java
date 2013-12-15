package org.denevell.tomcat.entities.write;

import java.util.HashMap;
import java.util.Map;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die einen Account implementiert.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "account")
public class Account {

        /** Benutzername fuer den Account **/
        @DatabaseField(canBeNull = false)
        private String username;
        
        /** Passwort des Benutzers fuer den Account **/
        @DatabaseField(canBeNull = false)
        private String password;
        
        /** e-Mail-Adresse des Benutzers **/
        @DatabaseField(canBeNull = false, id = true)
        private String email;
        
        @DatabaseField(foreign = true)
        private ObjectRepo or;
        
        
        /**
         * Leerer Konstruktor der Klasse Account.
         */
        public Account(){
                
        }
        
        
        /**
         * Konstruktor der Klasse Account.
         * @param username Benutzername
         * @param password Passwort
         */
        public Account(String username, String password, String email){
                this.username = username;
                this.password = password;
                this.email = email;
        }
        
        /**
         * Getter, der das Passwort des Benutzers zurück gibt.
         * @return Passwort des Benutzers
         */
        public String getPassword(){
                return password;
        }
        
        
        /**
         * Getter, der die e-Mail-Adresse des Benutzers zurück gibt.
         * @return e-Mail-Adresse
         */
        public String getMail(){
        	return email;
        }

        
        /**
         * Getter, der den Benutzernamen zurück gibt.
         * @return Benutzername
         */
        public String getUsername(){
        	return username;
        }
        
        /** Map: Key ist der Name des Zeitprofils, Value ist das Zeitprofil **/
        public Map<String, Timeprofile> timeprofiles = new HashMap<String, Timeprofile>();
        
        /** Map: Key ist der Name des Stundenplans, Value ist der Stundenplan **/
        public Map<String, Timetable> tt = new HashMap<String, Timetable>();
}