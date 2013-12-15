package org.denevell.tomcat.entities.write;

import java.util.HashMap;
import java.util.Map;

import com.j256.ormlite.field.DatabaseField;
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
        
        /** Map: Key ist e-Mail, Value ist Account **/
        public Map<String, Account> accounts = new HashMap<String, Account>();
        
        /** Map: Key ist Kursname, Value ist Kurs **/
        public Map<String, Course> course = new HashMap<String, Course>();
        
}