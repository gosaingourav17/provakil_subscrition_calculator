var moment = require('moment');


function calculate_subscription(expiry_date, months_to_buy, monthly_cost, annual_cost) {

    var theDate = moment(expiry_date, "DD/MM/YYYY");
    var arr = [];

    if (months_to_buy == 12) {
        var nextyear = moment(theDate).add(1, 'years');
        var next1 = moment(nextyear).date(1).add((moment(nextyear).date() > 1 ? 1 : 0), "months").add(0, "days");
        var next15 = moment(nextyear).date(1).add((moment(nextyear).date() > 15 ? 1 : 0), "months").add(14, "days");

        if (next1.diff(next15, 'days') < 0) {


            arr[0] = moment(next1).format("DD/MM/YYYY");
            arr[1] = (annual_cost - nextyear.diff(next1, 'days') * (annual_cost / 365));
        }
        else {


            arr[0] = moment(next15).format("DD/MM/YYYY");
            arr[1] = (annual_cost - nextyear.diff(next15, 'days') * (annual_cost / 365));

        }
    }


    else {

        var nextdate = moment(theDate).add(months_to_buy, 'months');
        var next1 = moment(nextdate).date(1)
        var next15 = moment(nextdate).date(1).add((moment(nextdate).date() < 15 ? -1 : 0), "months").add(14, "days");

        if (next1.diff(next15, 'days') > 0) {


            if (moment(nextdate).format("DD") == 1) {

                arr[0] = moment(next1).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * months_to_buy);
            }
            else {

                arr[0] = moment(next1).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * ((months_to_buy - 1)) + (30 - moment(nextdate).format("DD") + 1) * (monthly_cost / 30));
            }
        }
        else {
            if (moment(nextdate).format("DD") == 15) {

                arr[0] = moment(next15).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * months_to_buy);
            }
            else {

                arr[0] = moment(next15).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * ((months_to_buy - 1)) + (30 - moment(nextdate).format("DD") + 15) * (monthly_cost / 30));

            }
        }



    }
    return arr;
}
//insert arguments in next line.
var all = calculate_subscription("2/06/2018", 1, 1000, 8000)
console.log('("' + all[0] + '",' + all[1] + ')');
