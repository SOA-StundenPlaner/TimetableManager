package org.denevell.tomcat.entities.write;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
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
        
        
        @ForeignCollectionField
        public ForeignCollection<Timeprofile> timeprofiles;
        
        @ForeignCollectionField
        public ForeignCollection<Timetable> timetables;
}