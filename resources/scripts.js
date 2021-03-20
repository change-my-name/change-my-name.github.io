
function load() {
    $.getJSON('page_data.json', function(data) {
        let list = $('#list');

        for ( let site of data.en ) {
            if ( site.change_name === undefined ) { site.change_name = "N/A"; }
            if ( site.change_display_name === undefined ) { site.change_display_name = "N/A"; }
            if ( site.change_display_name === "true" ) { site.change_display_name = "N/A"; }
            if ( site.change_name === "true" ) { site.change_name = "N/A"; }

            list.append("<tr class=\'tr\'>")
            list.append('<td class=\'td\'>' + site.name + '</td>');
            list.append('<td class=\'td\'>' + site.url + '</td>');
            list.append('<td class=\'td\'>' + site.change_name + '</td>');
            list.append('<td class=\'td\'>' + site.change_display_name + '</td>');
            list.append("</tr>")
        }
        list.append('</tbody>')
    });
};

