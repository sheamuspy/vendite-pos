/*global $, jQuery, document, sendRequest, setupTable */


$(document).ready(function () {
    "use strict";
    $(".button-collapse").sideNav();

    setupTable();
});

function setupTable() {
    "use strict";
    var URL, response, i, products;

    URL = "http://localhost/mobile_web/POS/php/owner_function.php?cmd=0";
    response = sendRequest(URL);

    products = response.products;

    for (i = 0; i < products.length; i = i + 1) {

        $("#inventory-table tbody").append(
            "<tr>" +
                "<td>" + products[i].PRODUCT_NAME + "</td>" +
                "<td>" + products[i].PRODUCT_BARCODE + "</td>" +
                "<td>" + products[i].PRODUCT_PRICE + "</td>" +
                "</tr>"
        );
    }

}

function sendRequest(u) {
    "use strict";
    var obj, result;
    obj = $.ajax({url: u, async: false});
    result = $.parseJSON(obj.responseText);
    return result;
}
