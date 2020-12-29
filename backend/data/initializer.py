import mysql.connector as connector
from mysql.connector import errorcode

# from backend.data.logger import get_logger

# _log = get_logger(__name__)
dbname = 'ifulfill'

TABLES = {}
TABLES['locations'] = (
    "CREATE TABLE `locations` ("
    "  `id` int(11) AUTO_INCREMENT,"
    "  `location_description` varchar(50) NOT NULL,"
    "  PRIMARY KEY(`id`)"
    ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8"
)

TABLES['cadre'] = (
    "CREATE TABLE `cadre` ("
    "  `id` int(11) NOT NULL AUTO_INCREMENT,"
    "  `desc` varchar(100) NOT NULL,"
    "  PRIMARY KEY(`id`)"
    ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8"
)

TABLES['request'] = (
    "CREATE TABLE IF NOT EXISTS `request` ("
    " `id` int(11) NOT NULL AUTO_INCREMENT,"
    " `rr_id` varchar(15) DEFAULT NULL,"
    " `jr_id` varchar(15) DEFAULT NULL,"
    " `name` varchar(50) DEFAULT NULL,"
    " `skills` varchar(100) DEFAULT NULL,"
    " `cadre_id` int(11) DEFAULT NULL,"
    " `location_id` int(11) DEFAULT NULL,"
    " PRIMARY KEY(`id`),"
    " KEY `fk_cadre_id` (`cadre_id`) USING BTREE,"
    " KEY `fk_location_id` (`location_id`) USING BTREE"
    ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8"
)

TABLES['alter_request'] = (
    "ALTER TABLE `request`"
    " ADD CONSTRAINT `fk_cadre_id` FOREIGN KEY (`cadre_id`) REFERENCES `cadre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,"
    " ADD CONSTRAINT `fk_location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;"
)


def insert_locations():
    db_connection = connector.connect(
        host="localhost",
        user="root",
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

    db_connection.close()


def insert_cadre():
    db_connection = connector.connect(
        host="localhost",
        user="root",
        auth_plugin='mysql_native_password',
        database=dbname
    )
    cursor = db_connection.cursor()

    query = """INSERT INTO cadre (desc) ('P1'), ('P2'), ('P3'), ('P4')"""
    cursor.execute(query)
    db_connection.commit()

    print(cursor.rowcount, "Record inserted successfully into the CADRE table")

    db_connection.close()


def insert_request():
    db_connection = connector.connect(
        host="localhost",
        user="root",
        auth_plugin='mysql_native_password',
        database=dbname
    )
    cursor = db_connection.cursor()

    query = """INSERT INTO request (rr_id, jr_id, name, skills, cadre_id, location_id) VALUES
        ('54868-5148', '59779-381', 'Stringtough', 'Project Oversight', 2, 1),
        ('62362-169', '0064-1040', 'Lotstring', 'Omgeo Oasys', 2, 1),
        ('58232-0748', '41616-220', 'Solarbreeze', 'ATR-FTIR', 3, 3),
        ('42002-516', '0121-4809', 'Temp', 'PPE', 1, 3),
        ('57451-5025', '0407-4086', 'Toughjoyfax', 'Jasper Reports', 3, 2),
        ('36800-010', '0143-1270', 'Voyatouch', 'Electronic Payments', 2, 2),
        ('54868-5876', '76332-002', 'Sonsing', 'Botany', 2, 1),
        ('76472-1126', '60429-956', 'Opela', 'PQQ', 2, 2),
        ('0363-0819', '64220-420', 'Voltsillam', 'T-SQL', 3, 1),
        ('68391-604', '61957-1930', 'Fix San', 'Yarn', 2, 2),
        ('15821-101', '55154-5999', 'Wrapsafe', 'TDC3000', 4, 2),
        ('0378-3702', '36987-3447', 'Tresom', 'Value Engineering', 4, 3),
        ('11523-7346', '62080-2001', 'Fix San', 'Sleep Disorders', 3, 2),
        ('60512-6646', '60512-2007', 'Regrant', 'OE', 4, 2),
        ('54868-2844', '59762-3743', 'Pannier', 'Poka Yoke', 2, 2),
        ('0573-1929', '69004-001', 'Cookley', 'Shared Services', 3, 1),
        ('67386-421', '64720-153', 'Asoka', 'SBA 504', 2, 1),
        ('0310-0411', '55301-616', 'Tres-Zap', 'Geotechnical Engineering', 1, 2),
        ('68405-043', '51079-881', 'Holdlamis', 'General Insurance', 3, 2),
        ('67046-645', '63940-688', 'Zontrax', 'Multi-Unit', 3, 3),
        ('56062-008', '49738-799', 'Alphazap', 'Oxides', 3, 1),
        ('65841-734', '55504-3763', 'Stim', 'Urban Redevelopment', 1, 2),
        ('59762-0059', '51991-321', 'Greenlam', 'DDS', 2, 2),
        ('33261-064', '47682-170', 'Tempsoft', 'RMIS', 4, 2),
        ('0113-0227', '21695-909', 'Sonair', 'WWII', 2, 2),
        ('0091-3321', '46122-013', 'Bamity', 'SolidWorks', 2, 1),
        ('63629-3210', '11673-081', 'Sonsing', 'GDS systems', 3, 2),
        ('49643-339', '41163-133', 'Namfix', 'Public Speaking', 1, 2),
        ('65044-1169', '43857-0298', 'Sonsing', 'IntelliJ IDEA', 3, 3),
        ('50458-388', '25021-402', 'Veribet', 'IDoc', 3, 2),
        ('66969-6015', '16590-303', 'Fix San', 'KML', 4, 2),
        ('57896-764', '64942-1190', 'Keylex', 'NFPA 101', 2, 2),
        ('64679-920', '64205-820', 'Tres-Zap', 'RPT', 4, 1),
        ('49527-005', '60429-323', 'Transcof', 'Afghanistan', 4, 2),
        ('41250-167', '58118-4035', 'Voltsillam', 'Xen', 1, 3),
        ('0280-7050', '17478-823', 'Tresom', 'Konica', 2, 1),
        ('55154-0103', '55289-236', 'Ventosanzap', 'DPR', 4, 2),
        ('55315-183', '49349-521', 'Rank', 'Cash Handling', 3, 3),
        ('0143-9782', '51079-735', 'Sonsing', 'Land Development', 4, 1),
        ('65044-2309', '44567-703', 'Overhold', 'Oil Paint', 2, 3),
        ('54868-6305', '35356-131', 'Stim', 'IT Governance', 1, 3),
        ('66715-9733', '51143-213', 'Tampflex', 'OSI Model', 2, 1),
        ('21695-176', '45014-131', 'Zaam-Dox', 'CQ', 4, 2),
        ('50021-061', '51346-250', 'Stronghold', 'IAR', 3, 1),
        ('0378-4560', '43068-220', 'Stronghold', 'Flow Cytometry', 1, 2),
        ('54569-1088', '42627-208', 'It', 'TNCC Instruction', 3, 1),
        ('55648-311', '0904-6351', 'Alphazap', 'DVD Authoring', 2, 2),
        ('68001-131', '33261-626', 'Zaam-Dox', 'ZPL', 4, 1),
        ('67544-237', '0363-0368', 'Bigtax', 'JPEG2000', 4, 1),
        ('63981-478', '68645-430', 'Andalax', 'BPA', 4, 3),
        ('48951-1146', '40046-0061', 'Viva', 'Strategic Planning', 4, 1),
        ('21695-488', '58118-1349', 'Vagram', 'VNA', 4, 2),
        ('55910-120', '63824-744', 'Tresom', 'TDMA', 1, 3),
        ('50484-308', '0362-0101', 'Toughjoyfax', 'Jet Ski', 4, 3),
        ('68382-224', '52380-1730', 'Subin', 'Alumni Relations', 2, 1),
        ('52685-444', '36987-1019', 'Flexidy', 'Oxides', 4, 3),
        ('76214-010', '0363-0453', 'Tres-Zap', 'JAX-WS', 1, 3),
        ('0280-1124', '67857-706', 'Fintone', 'Home Equity Loans', 2, 3),
        ('60681-5502', '30142-112', 'Prodder', 'Documentation', 3, 3),
        ('63481-434', '51346-239', 'Sonair', 'Educational Technology', 2, 1),
        ('0071-0222', '0615-7539', 'Stim', 'Oxygen XML Editor', 1, 3),
        ('0245-0145', '21130-622', 'Flowdesk', 'CFTC', 1, 2),
        ('13107-044', '65841-680', 'Job', 'PDH', 2, 1),
        ('48951-4030', '65841-693', 'Home Ing', 'Erwin', 3, 3),
        ('69243-0810', '68391-359', 'Fixflex', 'Fax', 1, 3),
        ('21695-536', '68151-4980', 'Lotstring', 'RMADS', 4, 1),
        ('37205-120', '54575-944', 'Span', 'Nursing Management', 1, 1),
        ('20276-162', '55319-620', 'Konklux', 'PK', 3, 2),
        ('21130-921', '0615-3542', 'Cardguard', 'Plant Identification', 2, 3),
        ('68258-2993', '42847-106', 'Cardguard', 'Dynamics', 4, 1),
        ('42681-9033', '37808-279', 'Bytecard', 'IES VE', 1, 2),
        ('63824-287', '22912-001', 'Stronghold', 'Middle Eastern Studies', 2, 1),
        ('61336-001', '67253-388', 'Toughjoyfax', 'Estate Jewelry', 4, 3),
        ('49288-0152', '52533-214', 'Quo Lux', 'GI', 2, 1),
        ('68084-581', '11410-405', 'Opela', 'HFM', 2, 1),
        ('0378-6993', '61722-207', 'Y-find', 'NT 4.0', 2, 2),
        ('49288-0405', '16590-267', 'Tampflex', 'TPMS', 4, 1),
        ('0115-1525', '55154-1498', 'Fix San', 'LPS', 2, 1),
        ('0781-7078', '52125-274', 'Biodex', 'EGPRS', 4, 1),
        ('53808-0542', '43269-638', 'Treeflex', 'GCPs', 3, 3),
        ('0113-0866', '55910-655', 'Stim', 'Strategic Partnerships', 2, 1),
        ('52125-538', '67253-182', 'Fixflex', 'Short Sales', 1, 1),
        ('50474-804', '16590-937', 'Latlux', 'RF', 2, 1),
        ('16590-242', '41250-153', 'Cardguard', 'Novell Netware', 2, 1),
        ('65585-577', '0143-1277', 'Temp', 'Subversion', 1, 3),
        ('21695-699', '42291-199', 'Y-Solowarm', 'Commercial Property Owners', 1, 2),
        ('68788-9141', '55289-594', 'Fix San', 'Diabetes', 3, 1),
        ('37000-006', '24385-460', 'Y-find', 'Mobile Technology', 2, 2),
        ('55154-2364', '0884-0763', 'Regrant', 'Electrical Engineering', 2, 3),
        ('51079-745', '50636-003', 'Andalax', 'Mac OS', 4, 2),
        ('49288-0211', '65044-5021', 'Treeflex', 'SNAP', 2, 1),
        ('10424-154', '55154-4732', 'Konklab', 'JDBC', 3, 1),
        ('60505-0381', '24236-287', 'Alphazap', 'Petroleum Geology', 1, 1),
        ('0054-4297', '30142-224', 'Sonsing', 'ICT', 2, 1),
        ('36987-2239', '68258-5974', 'Greenlam', 'SSCP', 3, 1),
        ('57664-474', '45802-141', 'Namfix', 'RPR', 4, 3),
        ('59390-192', '0310-0132', 'Daltfresh', 'Earthquake Engineering', 4, 3),    
        ('76282-206', '0173-0521', 'Zaam-Dox', 'TPA', 1, 2),
        ('41268-272', '0113-0384', 'Sonsing', 'Siebel', 1, 3),
        ('0003-3623', '55045-3602', 'It', 'IVIVC', 1, 2),
        ('59365-6065', '42254-015', 'Cookley', 'Data Structures', 4, 2),
        ('54973-3123', '68084-742', 'Tempsoft', 'Dyeing', 3, 2),
        ('68788-9662', '57520-0925', 'Redhold', 'CQS', 2, 3),
        ('52544-259', '0591-5620', 'Sonair', 'NIMS', 3, 2),
        ('52544-384', '63629-4837', 'Lotlux', 'Supply Chain', 2, 1),
        ('52125-680', '0280-4035', 'Biodex', 'vRanger', 4, 3),
        ('36987-2838', '0168-0346', 'Toughjoyfax', 'Xcart', 1, 3),
        ('68084-625', '55910-893', 'Span', 'ClearCase', 1, 2),
        ('43353-862', '63187-027', 'Andalax', 'Aquatic Ecology', 2, 1),
        ('75862-016', '63941-949', 'Regrant', 'MSBuild', 1, 2),
        ('63146-108', '0699-5740', 'It', 'HP Blade', 2, 3),
        ('51672-1289', '51079-173', 'Span', 'Contact Centers', 1, 1),
        ('0615-7653', '0268-0859', 'Tempsoft', 'Digital Imaging', 1, 3),
        ('20276-046', '63972-004', 'Home Ing', 'Banking', 2, 3),
        ('13811-621', '35356-770', 'Tres-Zap', 'Yard Management', 4, 2),
        ('43742-0218', '49288-0562', 'Span', 'XDoclet', 3, 2),
        ('36987-1436', '0078-0539', 'Fixflex', 'Direct Marketing', 4, 3),
        ('0065-0795', '60914-001', 'Bitchip', 'Numerical Analysis', 1, 2),
        ('52584-950', '0078-0315', 'Redhold', 'Undercover', 2, 1),
        ('0074-3239', '0019-1177', 'Fix San', 'MCEV', 4, 3),
        ('11489-072', '68682-367', 'Zontrax', 'JRun', 4, 3),
        ('67046-431', '64661-060', 'Latlux', 'WCCP', 4, 2),
        ('0904-6137', '44206-454', 'Bitchip', 'Kickstart', 3, 3),
        ('55289-883', '0597-0127', 'Zoolab', 'Yammer', 3, 3),
        ('53877-008', '63187-073', 'Tampflex', 'RF', 4, 3),
        ('55154-3828', '68462-382', 'Sub-Ex', 'Management by Objectives', 2, 1),
        ('49351-103', '49035-019', 'Bitwolf', 'SDSF', 3, 2),
        ('58552-122', '55289-411', 'Pannier', 'Proposal Writing', 2, 1),
        ('53329-157', '68084-632', 'Zathin', 'Utility Construction', 4, 3)"""
    cursor.execute(query)
    db_connection.commit()

    print(cursor.rowcount, "Record inserted successfully into the cadre table")

    db_connection.close()


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
    insert_locations()

    print("Inserting data in Request: ")
    insert_request()
