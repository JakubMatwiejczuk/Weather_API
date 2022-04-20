(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "dt",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "rain",
        alias: "rain_mm",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "wind_speed",
        alias: "wind_ms",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "humidity",
        dataType: tableau.dataTypeEnum.float
    }];

    var tableSchema = {
        id: "weather",
        alias: "weather forecast",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

 myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=52.23&lon=21.01&appid=72bcb8cae6d415011685bc2b29e2f564", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "dt": feat[i].properties.dt,
                "rain": feat[i].properties.rain,
                "wind_speed": feat[i].wind_speed,
		"humidity": feat[i].humidity
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Weather";
        tableau.submit();
    });
});
})();

