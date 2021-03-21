

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
            if ( site.change_display_name === "true" ) { site.change_display_name = "N/A"; }
            if ( site.change_name === "true" ) { site.change_name = "N/A"; }

            list.append("<tr>")
            list.append(`<td class='td'> <a href=info.html?site=${site.name}>${site.name} </td>`);
            list.append('<td class=\'td\'>' + site.url + '</td>');
            list.append('<td class=\'td\'>' + site.change_name + '</td>');
            list.append('<td class=\'td\'>' + site.change_display_name + '</td>');
            list.append('<td class=\'td\'>' + site.req_legal_name + '</td>');
            list.append("</tr>")
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