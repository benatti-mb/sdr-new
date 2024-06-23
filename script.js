$(document).ready(function() {
    // URL para buscar os dados da planilha em formato JSON
    var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8LgysYF-xRZwk2Udo38o72T4RAgSKWzpD2p1t0q-3mufv44uLDFTUZ9jVZNiCktmE89TtwP2UoaB9/pubhtml';

    $.getJSON(url, function(data) {
        // Tratando os dados recebidos
        var rows = data.table.rows;
        var headers = rows[0].c.map(function(cell) {
            return cell.v;
        });

        // Preenchendo os cabeçalhos da tabela
        var headerRow = '<tr>';
        headers.forEach(function(header) {
            headerRow += '<th>' + header + '</th>';
        });
        headerRow += '</tr>';
        $('#table-head').append(headerRow);

        // Preenchendo os dados da tabela
        for (var i = 1; i < rows.length; i++) {
            var rowData = rows[i].c.map(function(cell) {
                return '<td>' + cell.v + '</td>';
            });
            $('#table-body').append('<tr>' + rowData.join('') + '</tr>');
        }

        // Inicialize o DataTable
        $('#spreadsheet').DataTable();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Erro ao carregar os dados da planilha:', textStatus, errorThrown);
    });
});
