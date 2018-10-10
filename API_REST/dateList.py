from db import *

class DateList:
    def __init__(self,year=None):
        self._dateList=[]
    def _insertDate(self,date):
        try:
            dbConn=DbConnection()
            sql = "INSERT INTO holidays (holiday_date) VALUES (%s)"
            val = (date,)
            dbConn.execute(sql,val)
            dbConn.commit()
            return 0
        except:
            return 1
    def insertDates(self,dates,year):
        dbConn=DbConnection()
        sql = "DELETE FROM holidays WHERE year(holiday_date) = %s;"
        val = (year,)
        dbConn.execute(sql,val)
        dbConn.commit()
        for d in dates:
            self._insertDate(d)
        return 0
    def getList(self,year):
        dbConn=DbConnection()
        sql="select DATE_FORMAT(holiday_date, '%m-%d-%Y') from holidays where year(holiday_date)=%s;"
        val=(year, )
        dbConn.execute(sql, val)
        result=dbConn.fetchall()
        for d in result:
            self._dateList.append(d[0])
        return self._dateList

"""            
dateL=DateList()
dateL.insertDate("2018/01/01")
dateL.updateList("2018")
print(dateL.dateList)
"""