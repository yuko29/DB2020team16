from flask import Flask, render_template, request, jsonify
from datetime import timedelta
import json

app = Flask(__name__)

#config
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

@app.route('/')
def index():
    Years = [2020]
    Months = [x for x in range(1, 7)]
    Days = [x for x in range(1, 32)]
    return render_template('index.html', Years=Years, Months=Months, Days=Days)

@app.route('/disease')
def index2():
    from queryfunc import commonCountry
    Countrylist = commonCountry()
    return render_template('index2.html', Countrylist=Countrylist)

#page 1
@app.route('/_stockdate', methods=['GET'])
def stockdateinfoquery():
    from queryfunc import stockdateinfo
    specdate = request.args.get('Date')
    data = stockdateinfo(specdate)
    print(data)
    return jsonify(data)


@app.route('/_history', methods=['GET'])
def historyquery():
    from queryfunc import historyrecord
    data = historyrecord()
    #print(data)
    return jsonify(data)

@app.route('/_historydel')
def historydelquery():
    from queryfunc import historydel
    data = historydel()
    #print(data)
    return jsonify(data)

@app.route('/_worldcovidvsstock', methods=['GET'])
def worldcovidvsstockquery():
    from queryfunc import worldcovidvsstock
    data = worldcovidvsstock()
    #print(data)
    return jsonify(data)

@app.route('/_UScovidvsstock', methods=['GET'])
def UScovidvsstockquery():
    from queryfunc import UScovidvsstock
    data = UScovidvsstock()
    #print(data)
    return jsonify(data)

@app.route('/_twcovidvsstock', methods=['GET'])
def twcovidvsstockquery():
    from queryfunc import twcovidvsstock
    data = twcovidvsstock()
    #print(data)
    return jsonify(data)

@app.route('/_regionRate', methods=['GET'])
def regionRatequery():
    from queryfunc import regionRateinfo
    region = request.args.get('Region')
    data = regionRateinfo(region)
    #print(data)
    return jsonify(data)

#page 2
@app.route('/_regionCovid19Case')
def regionCovid19Casequery():
    from queryfunc import regionCovid19Case
    data = regionCovid19Case()
    #print(data)
    return jsonify(data)

@app.route('/_regionCovid19Death')
def regionCovid19Deathquery():
    from queryfunc import regionCovid19Death
    data = regionCovid19Death()
    #print(data)
    return jsonify(data)

@app.route('/_regionMaxDeathMon', methods=['GET'])
def regionMaxDeathMonquery():
    from queryfunc import regionMaxDeathMoninfo
    region = request.args.get('Region')
    data = regionMaxDeathMoninfo(region)
    #print(data)
    return jsonify(data)

@app.route('/_regionMaxCaseMon', methods=['GET'])
def regionMaxCaseMonquery():
    from queryfunc import regionMaxCaseMoninfo
    region = request.args.get('Region')
    data = regionMaxCaseMoninfo(region)
    #print(data)
    return jsonify(data)

@app.route('/_regionSARSCase')
def regionSARSCasequery():
    from queryfunc import regionSARSCase
    data = regionSARSCase()
    #print(data)
    return jsonify(data)

@app.route('/_regionSARSDeath')
def regionSARSDeathquery():
    from queryfunc import regionSARSDeath
    data = regionSARSDeath()
    #print(data)
    return jsonify(data)

@app.route('/_regionSARSMaxCaseMon', methods=['GET'])
def regionSARSMaxCaseMonquery():
    from queryfunc import regionSARSMaxCaseMoninfo
    region = request.args.get('Region')
    data = regionSARSMaxCaseMoninfo(region)
    #print(data)
    return jsonify(data)

@app.route('/_regionSARSMaxDeathMon', methods=['GET'])
def regionSARSMaxDeathMonquery():
    from queryfunc import regionSARSMaxDeathMoninfo
    region = request.args.get('Region')
    data = regionSARSMaxDeathMoninfo(region)
    #print(data)
    return jsonify(data)

@app.route('/_countryinfo', methods=['GET'])
def countryinfoquery():
    from queryfunc import countryinfo
    country = request.args.get('Country')
    data = countryinfo(country)
    #print(data)
    return jsonify(data)