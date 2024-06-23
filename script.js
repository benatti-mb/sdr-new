$(document).ready(function() {
    // URL para buscar os dados da planilha em formato JSON
    var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8LgysYF-xRZwk2Udo38o72T4RAgSKWzpD2p1t0q-3mufv44uLDFTUZ9jVZNiCktmE89TtwP2UoaB9/pubhtml?gid=307821144&single=true';

    $.getJSON(url, function(data) {
        var headers = [];
        var rows = [];

        // Obtendo os cabeçalhos da planilha
        data.query.tables.table.rows[0].c.forEach(function(cell) {
            headers.push(cell.v);
        });

        // Obtendo os dados da planilha
        for (var i = 1; i < data.query.tables.table.rows.length; i++) {
            var row = data.query.tables.table.rows[i];
            var rowData = [];
            row.c.forEach(function(cell) {
                rowData.push(cell.v);
            });
            rows.push(rowData);
        });

        // Preenchendo os cabeçalhos da tabela
        var headerRow = '<tr>';
        headers.forEach(function(header) {
            headerRow += '<th>' + header + '</th>';
        });
        headerRow += '</tr>';
        $('#table-head').append(headerRow);

        // Preenchendo os dados da tabela
        rows.forEach(function(rowData) {
            var dataRow = '<tr>';
            rowData.forEach(function(cellData) {
                dataRow += '<td>' + cellData + '</td>';
            });
            dataRow += '</tr>';
            $('#table-body').append(dataRow);
        });

        // Inicialize o DataTable
        $('#spreadsheet').DataTable();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Erro ao carregar os dados da planilha:', textStatus, errorThrown);
    });
});
