/*global document, $, jQuery, sendRequest, cordova, addToTable, alert, getProducts */

var test_json = '{"status":0, "products":{"9782342":{"PRODUCT_ID":"4","PRODUCT_NAME":"ideal milk","PRODUCT_BARCODE":"9782342","PRODUCT_PRICE":"2"},"6433949":{"PRODUCT_ID":"5","PRODUCT_NAME":"kalyppo","PRODUCT_BARCODE":"6433949","PRODUCT_PRICE":"1.4"}}}';

var products;
var server = "http://localhost/mobile_web/POS/php/";
var scanned_products = "";
var total = 0;


$(document).ready(function () {
    "use strict";
//    alert(test_json);
    getProducts();

//    alert(products[9782342].PRODUCT_ID);
});

$(function () {
    "use strict";
    $("#scanBarcode").click(function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
    //            alert("We got a barcode\n" +
    //                    "Result: " + result.text + "\n" +
    //                    "Format: " + result.format + "\n" +
    //                    "Cancelled: " + result.cancelled);
                addToTable(result.text);
            },
            function (error) {
    //            alert("Scanning failed: " + error);
                $("#result").val(error);
            }
        );
    });
});

//$(function () {
//    "use strict";
//    $("#submit").click(function () {
//        if (scanned_products.length < 1) {
//            var json_trans, URL, response;
//            json_trans = '{"phoneNumber":"","total":' + total + ',"productBarcode":[' + scanned_products + ']}';
//
//            URL = server + 'teller.php?cmd=1&trans=' + json_trans;
//
//            response = sendRequest(URL);
//
//            alert(response.message);
//        }
//    });
//});

function submit() {
    "use strict";
    var json_trans, URL, response, phoneNumber;

    phoneNumber = $("#phoneNumber").val();

    if (phoneNumber.length > 0) {
        if (scanned_products.length > 0) {

            json_trans = '{"phoneNumber":"' + phoneNumber + '","total":' + total + ',"productBarcode":[' + scanned_products + ']}';

            URL = server + 'teller_function.php?cmd=1&trans=' + json_trans;

            response = sendRequest(URL);

            alert(response.message);
            $("#transaction-table tbody").empty();
            total = parseFloat(0);
            $("#total").html(total);
        }
    } else {
        alert("No phone number found.");
    }

}

function addToTable(barcode) {
    "use strict";

    var bcode, name, price;

    bcode = products[barcode].PRODUCT_BARCODE;
    name = products[barcode].PRODUCT_NAME;
    price = products[barcode].PRODUCT_PRICE;
    $("#transaction-table tbody").append(
        "<tr>" +
            "<td>" + name + "</td>" +
            "<td>" + bcode + "</td>" +
            "<td>" + price + "</td>" +
            "</tr>"
    );

    if (scanned_products.length > 0) {
        scanned_products = scanned_products + ', ';
    }

    scanned_products = scanned_products + bcode;

    total = parseFloat(total) + parseFloat(price);
    $("#total").html(total);



}

function sendRequest(u) {
    "use strict";
    var obj, result;
    obj = $.ajax({url: u, async: false});
    result = $.parseJSON(obj.responseText);
    return result;
}

function getProducts() {
    "use strict";
    var obj, result;
    obj = $.ajax({url: 'http://localhost/mobile_web/POS/php/teller_function.php?cmd=0', async: false});
    if (obj.status !== 200) {
        alert('not connected');
        $.mobile.changePage("../teller_app.html#offline", {transition: "slideup", changeHash: false});
    } else {
        alert('connected');
        result = $.parseJSON(obj.responseText);
        //var result = sendRequest('http://localhost/mobile_web/POS/php/teller_function.php?cmd=0');
        products = result.products;
    }
}

function test() {
    "use strict";
    addToTable(1234243);
}

