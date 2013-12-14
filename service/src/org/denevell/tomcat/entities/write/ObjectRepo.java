package org.denevell.tomcat.entities.write;

import java.util.List;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Klasse, die als Objekt-Repository dient.
 * @author Nicole Hein
 */
@DatabaseTable(tableName = "objectRepo")
public class ObjectRepo {
        /** ID **/
        @DatabaseField(id = true)
        private int id;
        
        @DatabaseField(foreign = true)
        Account account;
        
        
        @DatabaseField(foreign = true)
        Hour hour;
        
        /**
         * Konstruktor der Klasse ObjectRepo.
         */
        private ObjectRepo(){
                
        }
        
        /** Instanz der Klasse ObjectRepo **/
        @DatabaseField(foreign = true)
        private static ObjectRepo instance = null;
        
        
        /**
         * Getter, der die Instanz der Klasse ObjectRepo setzt, wenn sie noch nicht existiert.
         * @return Instanz
         */
        public static ObjectRepo getInstance(){
                if (instance==null){
                        instance = new ObjectRepo();
                }
                return instance;
        }
        
        
        /** Collection, die die Accounts der Benutzer speichert **/
        @ForeignCollectionField
        public ForeignCollection<Account> accounts;
        
        /** Collection, die die Kurse speichert **/
        @ForeignCollectionField
        public ForeignCollection<Course> courses;
        
        
        /**
         * Methode, die einen Account in einer Liste sucht.
         * @param email zu findende e-Mail-Adresse
         * @param accountList Liste der Accounts
         * @return Index
         */
        public int searchForAccount(String email, List<Account> accountList){
        	for (int i=0; i<accountList.size(); i++){
        		if (accountList.get(i).getMail().equals(email)){
        			return i;
        		}else{
        			continue;
        		}
        	}
        	return -1;
        }
        
        
        /**
         * Methode, die einen Kurs in einer Liste sucht.
         * @param courseName zu findender Kursname
         * @param courseList Liste der Kurse
         * @return Index
         */
        public int searchForCourse(String courseName, List<Course> courseList){
        	for (int i=0; i<courseList.size(); i++){
        		if (courseList.get(i).getName().equals(courseName)){
        			return i;
        		}else{
        			continue;
        		}
        	}
        	return -1;
        }
}