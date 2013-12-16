package org.denevell.tomcat.entities.write;

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
        @DatabaseField(generatedId = true)
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
        
        @ForeignCollectionField
        public ForeignCollection<Account> accounts;
        
        @ForeignCollectionField
        public ForeignCollection<Course> courses;
        
}