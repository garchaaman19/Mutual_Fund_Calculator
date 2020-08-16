from flask import request,jsonify
from flask_restplus import Resource,Namespace
from sqlite_file import *
from flask import  Flask
from flask_restplus import Api
from flask_script import Manager



app=Flask(__name__)

api = Api(app, version='1.0', title='API Gateway', description='Social Exchange API')

mutual_fund_api = api.namespace(
    'mf', description="Mutual Fund")
#mutual_fund_api=Namespace('mf',description="API for mutual fund calculator")

@mutual_fund_api.route('/search')
class Search(Resource):
    '''
    Search Mutual Fund by Name or Scheme code
    '''
    def get(self):
        search_query = request.args.get('search_query')
        if search_query is not None or 'search_query' not in search_query:
            print(search_query)
            result=[]
            conn = db()
            #cur = conn.cursor()
            print(conn)
            name1 = conn.execute("SELECT * FROM TBL WHERE scheme_name like '%{}%' OR scheme_code like'%{}%'  ".format(search_query,search_query))
            name=name1.fetchall()
            for obj in name:
                #print(obj)
                data={
                     'scheme_code':obj[0],
                     'scheme_name': obj[1],
                     'nav':obj[4],
                    'date':obj[7]
                 }
                result.append(data)
            return jsonify(result)

@mutual_fund_api.route('/calculate')
class Calculate(Resource):
    def get(self):
        fund_name=request.args.get('fund_name')
        amount= request.args.get('amount')
        date=request.args.get('date')
        #data=request.json()
        if amount is not None and date is not None:
            conn = db()
            nav= conn.execute("SELECT nav FROM TBL WHERE scheme_name like '%{}%' AND  scheme_date like '%{}%' ".format(fund_name,date))
            nav=nav.fetchone()
            if nav is not None:
                units=int(amount)/int(nav[0])
            current_nav=conn.execute("SELECT nav FROM TBL WHERE scheme_name like '%{}%' AND  scheme_date like '%{}%' ".format(fund_name,'14-Aug-2020'))
            current_nav=current_nav.fetchone()
            if current_nav is not None:
                current_value=int(units)*int(current_nav[0])
            return {
                'current_value':current_value,
                'units':units,
                'code':200
            }

@mutual_fund_api.route('/all_funds')
class FundNames(Resource):
    def get(self):
        conn = db()
        fund_names=conn.execute("SELECT DISTINCT scheme_name FROM tbl")
        fund_names=fund_names.fetchall()
        print(fund_names)
        length=len(fund_names)
        result=[]
        for i in fund_names:
            data={
                'scheme_name':i[0]
            }
            result.append(data)
        return jsonify({'result':result})



manager = Manager(app)

if __name__ == '__main__':
    manager.run()