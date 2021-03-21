

var myFunction = function() {

    if (document.getElementById('body').style.background === "#ccdbff") {
        bgColor = "#ffcce8";
    }
    else {
        bgColor = "#ccdbff";
    }
    document.getElementById('body').style.background = bgColor;
};

var timer = setInterval(myFunction, 1500); // call every 1000 milliseconds


function loadPageData() {
    $.getJSON('page_data.json', function(data) {
        let list = $('#list');

        for ( let site of data.en ) {
            if ( site.change_name === undefined ) { site.change_name = "N/A"; }
            if ( site.change_display_name === undefined ) { site.change_display_name = "N/A"; }

            if ( site.change_name ) { site.change_name = "Yes!"; } else { site.change_name = "no"; }
            if ( site.change_display_name ) { site.change_display_name = "Yes!"; } else { site.change_display_name = "no"; }
            if ( site.req_legal_name ) { site.req_legal_name = "yes"; } else { site.req_legal_name = "No!"; }

            list.append('<tr>' +
                '<td> <a href=info.html?site=' + site.name + '>' + site.name + '</td>' +
                '<td>' + site.grade + '</td>' +
                '<td>' + site.change_name + '</td>' +
                '<td>' + site.change_display_name + '</td>' +
                '<td>' + site.req_legal_name + '</td>' +
                '</tr>')

        }
    });
};

function loadSiteInfo() {
    let site = GetURLParameter("site");
    site = site.toLowerCase();
    $.getJSON('page_data.json', function(data) {
        for(let s of data.en) {
            if(s.name.toLowerCase() == site){
                updateSiteInfo(s);
                break;
            }
        }
    });
}

function updateSiteInfo(req) {
    document.title = `Change My Name | ${req.name}`;
    document.getElementById("site-name").innerHTML = `<a href=${req.url}>${req.name}</a>`;
    document.getElementById("change-name").innerHTML = `Can change name: ${req.change_name}`;
    document.getElementById("change-display").innerHTML = `Can change display name: ${req.change_display_name}`;
    document.getElementById("grade").innerHTML = `Grade: ${req.grade}`;
    if("support" in req){
        document.getElementById("process-link").innerHTML = `<a href=${req.process}>Support article</a>`;
        document.getElementById("process-link").hidden = false;
    }
    for(let c of req.criteria){
        document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + `<li>${c}</li>`;
    }
}

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }