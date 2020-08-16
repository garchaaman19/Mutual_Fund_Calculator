import _sqlite3
def db():
    conn = _sqlite3.connect('myDB.db')
    return conn
