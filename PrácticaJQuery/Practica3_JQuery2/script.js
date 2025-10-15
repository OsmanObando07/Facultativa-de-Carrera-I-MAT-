$(document).ready(function () {
    $('#enviar').click(function () {
        let errores = [];

        const nombre = $('#nombre').val().trim();
        const correo = $('#correo').val().trim();
        const fecha = $('#fecha').val().trim();
        const color = $('#color').val();
        const valor = $('#valor').val();

        const intereses = [];
        $('input[name="intereses"]:checked').each(function () {
            intereses.push($(this).val());
        });

        const preferencia = $('input[name="preferencia"]:checked').val();

        if (!nombre) errores.push("Nombre");
        if (!correo) errores.push("Correo");
        if (intereses.length === 0) errores.push("Intereses");
        if (!preferencia) errores.push("Preferencia");
        if (!fecha) errores.push("Fecha y hora");
        if (!color) errores.push("Color");
        if (!valor) errores.push("Valor");

        if (errores.length > 0) {
            $('#mensajeError').text("⚠️ Campos vacíos: " + errores.join(", "));
        } else {
            $('#mensajeError').text("");

            const nuevaFila = `<tr>
                <td>${nombre}</td>
                <td>${correo}</td>
                <td>${intereses.join(", ")}</td>
                <td>${preferencia}</td>
                <td>${fecha}</td>
                <td><span style="background-color:${color}; padding: 5px 10px; display:inline-block;"></span> ${color}</td>
                <td>${valor}</td>
            </tr>`;

            $('#tabla tbody').append(nuevaFila);

            // Limpiar formulario
            $('#formulario')[0].reset();
        }
    });
});
