/*global document, $, jQuery, sendRequest, cordova, addToTable, alert, getProducts, externalDataDirectory */

var test_json = '{"status":0, "products":{"9782342":{"PRODUCT_ID":"4","PRODUCT_NAME":"ideal milk","PRODUCT_BARCODE":"9782342","PRODUCT_PRICE":"2"},"6433949":{"PRODUCT_ID":"5","PRODUCT_NAME":"kalyppo","PRODUCT_BARCODE":"6433949","PRODUCT_PRICE":"1.4"}}}';

var products;
var server = "http://cs.ashesi.edu.gh/~csashesi/class2016/sheamus-yebisi/mobile_web/POS/php/";
var scanned_products = "";
var total = 0;

$(function () {
    "use strict";
    $("#scanBarcodeOffline").click(function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
    //            alert("We got a barcode\n" +
    //                    "Result: " + result.text + "\n" +
    //                    "Format: " + result.format + "\n" +
    //                    "Cancelled: " + result.cancelled);
                $("#barcodeInputOffline").val(result.text);
            },
            function (error) {
    //            alert("Scanning failed: " + error);
                $("#barcodeInputOffline").val(error);
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

function submitOffline() {
    "use strict";
    var json_trans, URL, response, phoneNumber, transactioToStore;

    phoneNumber = $("#phoneNumber").val();

    if (phoneNumber.length > 0) {
        if (scanned_products.length > 0) {

            json_trans = '{"phoneNumber":"' + phoneNumber + '","total":' + total + ',"productBarcode":[' + scanned_products + ']}';
/*
// Change to store json_trans to file.

            URL = 'http://cs.ashesi.edu.gh/~csashesi/class2016/sheamus-yebisi/mobile_web/POS/php/teller_function.php?cmd=1&trans=' + json_trans;


            response = sendRequest(URL);

            alert(response.message);
*/
//            transactioToStore = JSON.stringify(json_trans);
//            localStorage.setItem('trans', transactioToStore);

//            externalDataDirectory.localStorage.setItem('trans', json_trans);



      /*      fs.root.getFile('trans.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      //var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});

      fileWriter.write(json_trans);

    }, errorHandler);

  }, errorHandler);*/



            $("#transaction-table tbody").empty();
            total = parseFloat(0);
            $("#total").html(total);
        }
    } else {
        alert("No phone number found.");
    }

}

function addToTableOffline() {
    "use strict";

    var bcode, name, price;

    bcode = $("barcodeInputOffline").val();
    name = $("#nameInputOffline").val();
    price = $("#priceInputOffline").val();
    if (bcode.length < 1 || name.length < 1 || price.length < 1) {
        alert("Please make sure you have filled the form completely.");
    } else {
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
        $("#totalOffline").html(total);

    }
}

function sendRequest(u) {
    "use strict";
    var obj, result;
    obj = $.ajax({url: u, async: false});
    result = $.parseJSON(obj.responseText);
    return result;
}

function testOffline() {
    "use strict";
    $("#barcodeInputOffline").val(1234243);
}

