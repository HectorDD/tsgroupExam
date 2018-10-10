from flask import Flask, jsonify, request
from dateList import *
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/getHolidays', methods=['GET'])
def orderList():
    year=request.args.get('year')
    dateL=DateList()
    return jsonify({'result' : dateL.getList(year)}) 
    
@app.route('/storeHolidays', methods=['POST'])
def storeHolidays():
    year=request.json['year']
    dates=request.json['dates']
    format_str = '%m-%d-%Y'
    newDates=[]
    for i in dates:
        newDates.append(datetime.datetime.strptime(i, format_str).strftime('%Y-%m-%d'))
    print (newDates)
    dateL=DateList()
    insertion=dateL.insertDates(newDates,year)
    return jsonify({'result' : insertion}) 
    
if __name__ == '__main__':
    app.run(host= '0.0.0.0',port=8082)