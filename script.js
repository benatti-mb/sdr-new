$(document).ready(function() {
    var spreadsheetID = '113tGC_wmr-qcU1PPTmAO7EvCGQcK3madpJvl6kBQetM';
    var url = `https://spreadsheets.google.com/feeds/list/${2PACX-1vT8LgysYF-xRZwk2Udo38o72T4RAgSKWzpD2p1t0q-3mufv44uLDFTUZ9jVZNiCktmE89TtwP2UoaB9}/1/public/values?alt=json`;

    $.getJSON(url, function(data) {
        var entry = data.feed.entry;
        var headers = Object.keys(entry[0]).filter(key => key.startsWith('gsx$')).map(key => key.substring(4));

        // Preenchendo os cabeçalhos da tabela
        var headerRow = '<tr>';
        headers.forEach(function(header) {
            headerRow += '<th>' + header + '</th>';
        });
        headerRow += '</tr>';
        $('#table-head').append(headerRow);

        // Preenchendo os dados da tabela
        entry.forEach(function(row) {
            var dataRow = '<tr>';
            headers.forEach(function(header) {
                dataRow += '<td>' + row['gsx$' + header]['$t'] + '</td>';
            });
            dataRow += '</tr>';
            $('#table-body').append(dataRow);
        });

        // Inicialize o DataTable
        $('#spreadsheet').DataTable();
    });
});
