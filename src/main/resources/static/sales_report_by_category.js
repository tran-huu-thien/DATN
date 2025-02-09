// Sales Report by Category
var data;
var chartOptions;

$(document).ready(function() {
    setupButtonEventHandlers("_category", loadSalesReportByDateForCategory);
});

function loadSalesReportByDateForCategory(period) {
    if (period == "customizedDate") {
        startDate = $("#startDate_category").val();
        endDate = $("#endDate_category").val();

        requestURL =  "/statisticals/category/" + startDate + "/" + endDate;
    } else {
        requestURL =  "/statisticals/category/" + period;
    }

    $.get(requestURL, function(responseJSON) {
        try {
            // Thực hiện các bước tiếp theo nếu không có lỗi
            prepareChartDataForSalesReportByCategory(responseJSON);
            customizeChartForSalesReportByCategory();
            formatChartData(data, 1, 2);
            drawChartForSalesReportByCategory(period);
            setSalesAmount(period, '_category', "test");
        } catch (error) {
            console.error("Error processing AJAX response:", error);
        }
    })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("AJAX request failed:", textStatus, errorThrown);
        });

}
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(prepareChartDataForSalesReportByCategory);
function prepareChartDataForSalesReportByCategory(responseJSON) {
    console.log('responseJSON:', responseJSON);
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Danh mục');
    data.addColumn('number', 'Tổng doanh thu');
    data.addColumn('number', 'Doanh thu thuần');

    totalGrossSales = 0;
    totalNetSales = 0;
    totalItems = 0;

    $.each(responseJSON, function(index, reportItem) {
        data.addRows([[reportItem.identifier, parseFloat(reportItem.netSales), parseFloat(reportItem.netSales)]]);
        totalGrossSales += parseFloat(reportItem.grossSales);
        totalNetSales += parseFloat(reportItem.netSales);
        totalItems += parseInt(reportItem.productsCount);
    });

}

function customizeChartForSalesReportByCategory() {
    chartOptions = {
        height: 360, legend: { position: 'right' }
    };
}

function drawChartForSalesReportByCategory() {
    var formatter = new google.visualization.NumberFormat({
        groupingSymbol: '.',
        decimalSymbol: ',',
        fractionDigits: 0
    });

    console.log('Data before formatting:', data);
    formatter.format(data, 1); // Format the third column (Tdoanh thu)
    formatter.format(data, 2); // Format the fourth column (Doanh thu thu

    console.log('Data after formatting:', data);
    var salesChart = new google.visualization.PieChart(document.getElementById('chart_sales_by_category'));
    salesChart.draw(data, chartOptions);
}
