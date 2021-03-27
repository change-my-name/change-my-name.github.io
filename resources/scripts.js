// var colorChange = function() {
//
//     if (document.getElementById('body').style.background === "#ccdbff") {
//         bgColor = "#ffcce8";
//     }
//     else {
//         bgColor = "#ccdbff";
//     }
//     document.getElementById('body').style.background = bgColor;
// };

// var timer = setInterval(colorChange, 1500); // call every 1000 milliseconds


function loadPageData() {
    $.getJSON('page_data.json', function(data) {
        let list = $('#list');

        for ( let site of data.en ) {
            if (site.change_name === undefined) {
                site.change_name = "N/A";
            }
            if (site.change_display_name === undefined) {
                site.change_display_name = "N/A";
            }

            if (site.change_name) {
                site.change_name = "Yes!";
            } else {
                site.change_name = "no";
            }
            if (site.change_display_name) {
                site.change_display_name = "Yes!";
            } else {
                site.change_display_name = "no";
            }
            if (site.req_legal_name) {
                site.req_legal_name = "yes";
            } else {
                site.req_legal_name = "No!";
            }

            switch(site.grade){
                case "Good":
                    site.grade = "Good &#x2705;";
                    break;
                case "Mediocre":
                    site.grade = "Mediocre &#x26A0;";
                    break;
                case "Poor":
                    site.grade = "Poor &#x274C;";
                    break;
                case "Unchangeable":
                    site.grade = "Unchangeable &#x1F6AB;"
            }

            list.append(
                '<tr id=' + site.name + '>' +
                '<td>' + site.name + '</td>' +
                '<td>' + site.grade + '</td>' +
                '<td>' + site.change_name + '</td>' +
                '<td>' + site.change_display_name + '</td>' +
                '<td>' + site.req_legal_name + '</td>' +
                '</tr>'
            )

            var row = document.getElementById(site.name);

            row.addEventListener("click", () => {
                window.location.href = 'info.html?site=' + site.name
            });
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
    document.getElementById("change-name").innerHTML = `Can change name: <b>${req.change_name}</b>`;

    document.getElementById("change-display").innerHTML = `Can change display name: <b>${req.change_display_name}</b>`;
    document.getElementById("grade").innerHTML = `Grade: ${req.grade}`;
    if("support" in req){
        document.getElementById("process-link").innerHTML = `<a href=${req.support}>Support Article</a>`;
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

function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("theList");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}