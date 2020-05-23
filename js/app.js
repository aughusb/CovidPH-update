// ********************************************
// Set date
// ********************************************
function load_datetime() {
    var l_d = new Date
    , view_d = months(l_d.getMonth() + 1) + " " + l_d.getDate() + ", " + l_d.getFullYear() + " @ " + l_d.getHours() + ":" + l_d.getMinutes();
    document.querySelector('.date-time').innerHTML = view_d;
}
function months(t=null) {
    var mos = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return t ? mos[t] : mos
}

setInterval(()=>{
    load_datetime();
},1000);

// ********************************************
//APIs
// ********************************************
function breakpoints(b=null) {
    var api = {
        flags: "https://www.countryflags.io/",
        covid: "https://coronavirus-ph-api.herokuapp.com/"
    };
    return b ? api[b] : api
}

function nationality(b=null){
    var nation = {
        Filipino: "PH",
        American: "US",
        Thai: "TH",
        Chinese: "CN",
        Taiwanese: "TW",
        Philippines: "PH"
    };
    
    return b ? nation[b] : ""
}

function init(){
    $(document).ready(function(){

        var total = breakpoints("covid")+"total",
            cases = breakpoints("covid")+"cases",
            cases_outside_ph = breakpoints("covid")+"cases-outside-ph";
        
        $.ajax({
            url: total,
            method: "GET",
            data: {},
            success: function(a) {
                $('#total-fcases').html(a.data.cases);
                $('#admitted').html(a.data.admitted);
            
                $('#total-fdied').html(a.data.deaths);
                $('#d_today').html(a.data.deaths_today);
            
                $('#total-frecovered').html(a.data.recoveries);
                $('#r_today').html(a.data.recoveries_today);
            }
        }),
        $.ajax({
            url: cases,
            method: "GET",
            data: {},
            success: function(a){
                var el = "";
                $('.f-cases').html("");
                for(var i in a.data){
                    var z = a.data[i].case_no,
                        x = a.data[i].nationality,
                        c = a.data[i].age,
                        b = a.data[i].hospital_admitted_to,
                        v = a.data[i].sex == 'F' || a.data[i].sex == 'f' ? "Female" : (a.data[i].sex == 'M' || a.data[i].sex == 'm' ? "Male" : "TBA"),
                        n = a.data[i].health_status ,
                        flag = "";
                    if(nationality(x)){
                        flag = `<img src="${breakpoints("flags")+nationality(x)}/flat/32.png">`;
                    }
                    var new_n = n == "Recovered" ? "<span class='s-success' style='padding:3px 5px;'>Recovered</span>" : (n == "Died" ? "<span class='d-danger' style='padding:3px 5px;'>Died</span>" : "<span class='w-warning' style='padding:3px 5px;'>For Validation</span>" );
                    el=`<tr><td>${z}</td>\n<td>${flag}&nbsp;${x}</td>\n<td>${c}</td>\n<td>${v}</td>\n<td>${b}</td>\n<td>${new_n}</td></tr>`;
                    $('.f-cases').append(el);
                }
                // console.log(a);
                $('.overlay').css("display","flex");
            }
        }),
        $.ajax({
            url: cases_outside_ph,
            method: "GET",
            data: {},
            success: function(a) {
                var el = "";
                $('.out-cases').html("");
                for(var i in a.data){
                    var z = a.data[i].country_territory_place,
                        x = a.data[i].confirmed,
                        c = a.data[i].recovered,
                        v = a.data[i].died;

                    el = `<tr>\n<td>${z}</td>\<td style='text-align:center;'>${x}</td>\<td style='text-align:center;'>${c}</td>\<td style='text-align:center;'>${v}</td>\</tr>`;
                    $('.out-cases').append(el);
                }
                // console.log(a);
            }
        })

    });
}
init();
document.addEventListener('swup:contentReplaced', init);