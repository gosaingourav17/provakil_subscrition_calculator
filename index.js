var moment = require('moment');


function calculate_subscription(expiry_date, months_to_buy, monthly_cost, annual_cost) {

    var theDate = moment(expiry_date, "DD/MM/YYYY");
    var arr = [];
    //yearly subscription
    if (months_to_buy == 12) {

        var nextyear = moment(theDate).add(1, 'years');
        //next coming 1
        var next1 = moment(nextyear).date(1).add((moment(nextyear).date() > 1 ? 1 : 0), "months").add(0, "days");
        //next coming 15
        var next15 = moment(nextyear).date(1).add((moment(nextyear).date() > 15 ? 1 : 0), "months").add(14, "days");
        //if next coming 1 is closer than 15
        if (next1.diff(next15, 'days') < 0) {

            //date
            arr[0] = moment(next1).format("DD/MM/YYYY");
            //cost            
            arr[1] = (annual_cost - nextyear.diff(next1, 'days') * (annual_cost / 365));
        }
        //if coming 15 is closer
        else {

            //date
            arr[0] = moment(next15).format("DD/MM/YYYY");
            //cost
            arr[1] = (annual_cost - nextyear.diff(next15, 'days') * (annual_cost / 365));

        }
    }

    //monthly subscription
    else {

        var nextdate = moment(theDate).add(months_to_buy, 'months');
        var next1 = moment(nextdate).date(1)
        var next15 = moment(nextdate).date(1).add((moment(nextdate).date() < 15 ? -1 : 0), "months").add(14, "days");
        //case date 1 is closer
        if (next1.diff(next15, 'days') > 0) {


            if (moment(nextdate).format("DD") == 1) {
                //difference of exact month and no extra days
                arr[0] = moment(next1).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * months_to_buy);
            }
            else {
                //assuming all months of 30 days,as per example,cost of n-1 months and extra days.
                arr[0] = moment(next1).format("DD/MM/YYYY");
                arr[1] = (monthly_cost * ((months_to_buy - 1)) + (30 - moment(nextdate).format("DD") + 1) * (monthly_cost / 30));
            }
        }
        //case date 15 is closer.
        else {
            if (moment(nextdate).format("DD") == 15) {
                //no extra days
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
var all = calculate_subscription("19/06/2018", 12, 400, 3650);
console.log('("' + all[0] + '",' + all[1] + ')');
