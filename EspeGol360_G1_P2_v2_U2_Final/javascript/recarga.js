let saldo = 0;

// Banco por prefijo
function actualizarBancoYColor(numero) {
    const tarjeta = document.getElementById('tarjeta3d');
    const banco = document.getElementById('banco3d');
    let color, nombreBanco;
    if (numero.startsWith('01')) {
        color = 'linear-gradient(135deg, #ffe066 60%, #ffd60a 100%)';
        nombreBanco = 'Banco de Pichincha';
    } else if (numero.startsWith('02')) {
        color = 'linear-gradient(135deg, #4e73df 60%, #1cc88a 100%)';
        nombreBanco = 'Banco del Pacífico';
    } else if (numero.startsWith('03')) {
        color = 'linear-gradient(135deg, #a259c6 60%, #6a0572 100%)';
        nombreBanco = 'Banco de Guayaquil';
    } else {
        color = 'linear-gradient(135deg, #4e73df 60%, #1cc88a 100%)';
        nombreBanco = 'Banco';
    }
    tarjeta.style.background = color;
    banco.textContent = nombreBanco;
}

// Efecto 3D al interactuar
['inputNumero','inputTitular','inputFecha','inputMonto'].forEach(id => {
    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById(id);
        input.addEventListener('focus', () => {
            document.getElementById('tarjeta3d').classList.add('input-activo');
        });
        input.addEventListener('blur', () => {
            document.getElementById('tarjeta3d').classList.remove('input-activo');
        });
    });
});

// Actualizar tarjeta en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const inputNumero = document.getElementById('inputNumero');
    const inputTitular = document.getElementById('inputTitular');
    const inputFecha = document.getElementById('inputFecha');
    inputNumero.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '').slice(0,16);
        e.target.value = val;
        let formateado = val.replace(/(.{4})/g, '$1 ').trim();
        document.getElementById('numero3d').textContent = formateado.padEnd(19, '•');
        actualizarBancoYColor(val);
    });
    inputTitular.addEventListener('input', e => {
        document.getElementById('titular3d').textContent = e.target.value.toUpperCase() || 'USUARIO';
    });
    inputFecha.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '').slice(0,4);
        if(val.length >= 3) val = val.slice(0,2) + '/' + val.slice(2);
        e.target.value = val;
        document.getElementById('fecha3d').textContent = val || 'MM/AA';
    });
    // Recarga de saldo
    document.getElementById('recargaForm').addEventListener('submit', function(ev){
        ev.preventDefault();
        const monto = parseFloat(document.getElementById('inputMonto').value);
        if(monto > 0) {
            saldo += monto;
            document.getElementById('saldoUsuario').textContent = saldo.toFixed(2);
            const saldoHeader = document.getElementById('saldoUsuarioHeader');
            if(saldoHeader) saldoHeader.textContent = saldo.toFixed(2);
            this.reset();
            document.getElementById('numero3d').textContent = '•••• •••• •••• ••••';
            document.getElementById('titular3d').textContent = 'USUARIO';
            document.getElementById('fecha3d').textContent = 'MM/AA';
            actualizarBancoYColor('');
            alert('¡Recarga exitosa!');
        }
    });
});