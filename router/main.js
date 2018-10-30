/*
 *  app     express()
 *  conn    mysql.createConnection()
 *          conn.execute(sql, func(err, row, fields))
 */
module.exports = function(app, conn) {
    var data = { devices: [
        // {이름, 상태, 배터리}
        {name: "장치 1", status: "on", battery: 100},
        {name: "장치 2", status: "off", battery: -1},
        {name: "장치 3", status: "on", battery: 80},
        {name: "장치 4", status: "on", battery: 90},
        {name: "장치 5", status: "on", battery: 33},
        {name: "장치 6", status: "on", battery: 65},
        {name: "장치 7", status: "on", battery: 42},
        {name: "장치 8", status: "off", battery: -1}
    ]};

    app.get('/', function(req, res) {
        res.render('index', {
            title: "메인 화면",
            data: data
        });
        // res.render('index.html');
    });

    app.get('/device/:idx', function (req, res) {
        res.render('device', {
            title: "장치 화면",
            index: req.params.idx,
            data: data.devices[req.params.idx]
        });
    });

    app.get('/about', function(req, res) {
        res.render('about.html');
    });

    app.get('/sensor', function(req,res) {
        let json;
        conn.execute(
            'SELECT ID,DATE_FORMAT(DATE, "%Y-%m-%d %H:%i:%S") as DATE,TEMP,HUMI,MICRO FROM data_sensor3',
            function (err, result, fields) {
                json = JSON.stringify(result);

                res.contentType('application/json');
                res.send(json);
            }
        )
    });

    app.get('/insert/:temp/:humi/:micro', function (req, res) {
        console.log('data_sensor3: 새 데이터 추가' +
                    req.params.temp + ' / ' +
                    req.params.humi + ' / ' +
                    req.params.micro);
        conn.execute(
            'INSERT INTO data_sensor3(TEMP,HUMI,MICRO) VALUE(' +
                req.params.temp + ',' +
                req.params.humi + ',' +
                req.params.micro + ');',
            function (err, result, fields) {
                if (err) {
                    console.log(err);
                    res.send('0');
                }
                res.send('1');
            }
        );
    });
};