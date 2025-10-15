$(document).ready(function () {
    // Guardar datos en tabla
    $('#guardar').click(function () {
        const nombre = $('#nombre').val().trim();
        const apellido = $('#apellido').val().trim();
        const edad = $('#edad').val().trim();

        if (!nombre || !apellido || !edad) {
            alert("⚠️ Todos los campos son obligatorios.");
            return;
        }

        const fila = `
            <tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${edad}</td>
            </tr>
        `;

        // Si es la primera fila, eliminar mensaje "Sin datos aún"
        if ($('#tabla tbody tr').length === 1 && $('#tabla tbody tr td').length === 1) {
            $('#tabla tbody').empty();
        }

        $('#tabla tbody').append(fila);
        $('#formulario')[0].reset();
    });

    // Borrar formulario
    $('#borrar').click(function () {
        $('#formulario')[0].reset();
    });

    // Toggle individual
    $('#toggle-formulario').click(function () {
        $('#formulario-container').slideToggle();
    });

    $('#toggle-tabla').click(function () {
        $('#tabla-container').slideToggle();
    });

    // Toggle todo
    $('#toggle-todo').click(function () {
        $('#formulario-container, #tabla-container').slideToggle();
    });

    // Focus ya está en CSS
});