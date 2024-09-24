// VALIDAR UN FORMAURIO Y SIMULAR ENVIAR UN EMAIL

document.addEventListener('DOMContentLoaded', function() {
    const email = {
        email:'',
        asunto:'',
        mensaje:''
    }

    //SELECCIONAR LEMENTOS DE LA INTERFAZ
    const inputEemail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');


    //Agregando eventos a los campos de texto
    inputEemail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);  
    inputMensaje.addEventListener('input', validar);    

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('Click', function(e){
        e.preventDefault();

        reiniciarFormulario();
    })

    function validar(e){
        if (e.target.value.trim() === '') {
            console.log();
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
           return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);
            // console.log('Campo válido')

        //asignar las valiadcions
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        // comprobar email
        comprobarEmail()
        
    }

    function mostrarAlerta(mensaje, referencia){
        // comprobar si ya existe una alerta
        limpiarAlerta(referencia);
        // Generar alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formualrio
        // console.log('hubo un error')
        referencia.appendChild(error);        
    }

    function limpiarAlerta(referencia){
        // comprobar si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        // console.log(alerta);
        if (alerta){
            alerta.remove();
        }
        // console.log('limpiarAlerta');
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado

    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false;

    }

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            reiniciarFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center',
                'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'El mensaje ha sido enviado correctamente';
            formulario.appendChild(alertaExito);   

            setTimeout(()=>{
                alertaExito.remove();
            }, 3000);
        }, 3000)
    }


    function reiniciarFormulario(){
        email.email=''
            email.asunto=''
            email.mensaje=''
            
            formulario.reset();
            comprobarEmail();
    }

    
})