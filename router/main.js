/*
 *  app     express()
 *  conn    mysql.createConnection()
 *          conn.execute(sql, func(err, row, fields))
 */
module.exports = function(app, conn) {
    var data = {name: "장치 1", status: "on", battery: 100};

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
            data: data
        });
    });

    app.get('/about', function(req, res) {
        res.render('about.html');
    });

    app.get('/sensor', function(req,res) {
        let json;
        conn.execute(
            'SELECT ID,DATE_FORMAT(DATE, "%Y-%m-%d %H:%i:%S") as DATE,TEMP,HUMI,MICRO FROM data_sensor3 ORDER BY DATE DESC LIMIT 10',
            function (err, result, fields) {
                json = JSON.stringify(result);

                res.contentType('application/json');
                res.send(json);
            }
        )
    });

    app.get('/insert/:temp/:humi/:micro', function (req, res) {
        console.log('data_sensor3: 새 데이터 추가 ' +
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