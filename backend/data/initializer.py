import mysql.connector as connector
from mysql.connector import errorcode

# from backend.data.logger import get_logger

# _log = get_logger(__name__)
dbname = 'iFullfill'

TABLES = {}
TABLES['locations'] = (
    "CREATE TABLE `locations` ("
    "  `location_no` int(11) AUTO_INCREMENT,"
    "  `location_description` varchar(50) NOT NULL,"
    "  PRIMARY KEY(`location_no`)"
    ") ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8"
)

TABLES['employee'] = (
    "CREATE TABLE `employee` ("
    "  `employee_no` int(11) NOT NULL AUTO_INCREMENT,"
    "  `employee_first_name` varchar(25) NOT NULL,"
    "  `employee_last_name` varchar(25) NOT NULL,"
    "  PRIMARY KEY (`employee_no`)"
    ") ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8"
)


def inset_locations():
    db_connection = connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        auth_plugin='mysql_native_password',
        database=dbname
    )
    cursor = db_connection.cursor()

    query = """INSERT INTO locations (location_description) 
    VALUES ('LTI - Mexico'),    
    ('LTI - FL, USA'),
    ('LTI - TX, USA'),
    ('LTI - NJ, USA'),
    ('LTI - OH, USA'),
    ('LTI - CT, USA'),
    ('LTI - ON, Canada'),
    ('LTI - Mumbai, India'),
    ('LTI - Pune, India'),
    ('LTI - Bengaluru, India'),
    ('LTI - Bangalore, India'),
    ('LTI - New Delhi, India'),
    ('LTI - Telangana, India'),
    ('LTI - Tokyo, Japan'),
    ('LTI - Shangai, China'),
    ('LTI - Sidney, Australia'),
    ('LTI - Crescent, Singapure'),
    ('LTI - Bangkok, Tahiland'),
    ('LTI - Central, Hongkong'),
    ('LTI - Makati City, Philippines'),
    ('LTI - Dubai, United Arab Emirates'),
    ('LTI - Salmiya, Kuwait'),
    ('LTI - Dammam, Saudi Arabia'),
    ('LTI - Abu Dhabi'),
    ('LTI - London, England'),
    ('LTI - Hamburg, Germany'),
    ('LTI - Munich, Germany'),
    ('LTI - Amsterdam, Netherlands'),
    ('LTI - Zurich, Switzerland')"""
    cursor.execute(query)
    db_connection.commit()

    print(cursor.rowcount, "Record inserted successfully into the location table")


add_employee = ("INSERT INTO employees "
                "(first_name, last_name) "
                "VALUES (%s, %s)")

data_employee = [('Geert', 'Vanderkelen')]


def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(dbname)
        )
    except connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)


if __name__ == "__main__":
    db_connection = connector.connect(
        host="localhost",
        user="root",
        passwd="root",
        auth_plugin='mysql_native_password'
    )
    cursor = db_connection.cursor()

    try:
        cursor.execute("USE {}".format(dbname))
        print("USE {}".format(dbname))
    except connector.Error as err:
        print("Database {} does not exist.".format(dbname))
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            create_database(cursor)
            print("Database {} created successfully.".format(dbname))
            db_connection.database = dbname
        else:
            print(err)
            exit(1)

    for table_name in TABLES:
        table_description = TABLES[table_name]
        try:
            print("Creating table {}: ".format(table_name), end='')
            cursor.execute(table_description)
        except connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")

    print("Inserting data in Location: ")
    inset_locations()
