// Variable global para almacenar el tipo de usuario actual
        let currentUserType = 'paciente';
        const slider = document.getElementById('type-slider');
        
        // Función para cambiar el tipo de usuario
        function changeUserType(type) {
            const pacienteBtn = document.getElementById('paciente-btn');
            const evaluadorBtn = document.getElementById('evaluador-btn');
            const subtitle = document.getElementById('login-subtitle');
            
            if (type === 'paciente') {
                pacienteBtn.classList.add('active');
                evaluadorBtn.classList.remove('active');
                subtitle.textContent = 'Acceso para Pacientes';
                slider.style.transform = 'translateX(0)';
                currentUserType = 'paciente';
                console.log('Modo cambiado a: Paciente');
            } else if (type === 'evaluador') {
                evaluadorBtn.classList.add('active');
                pacienteBtn.classList.remove('active');
                subtitle.textContent = 'Acceso para Evaluadores';
                slider.style.transform = 'translateX(100%)';
                currentUserType = 'evaluador';
                console.log('Modo cambiado a: Evaluador');
            }
        }
        
        // Manejar el envío del formulario
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorAlert = document.getElementById('errorAlert');
            const loading = document.getElementById('loading');
            
            // Validación básica
            if (username === '' || password === '') {
                errorAlert.style.display = 'block';
                errorAlert.textContent = 'Por favor, complete todos los campos.';
                return;
            }
            
            // Ocultar alerta de error si estaba visible
            errorAlert.style.display = 'none';
            
            // Mostrar loading
            loading.style.display = 'block';
            
            // Simular proceso de login (1.5 segundos)
            setTimeout(() => {
                // Ocultar loading
                loading.style.display = 'none';
                
                // Simular redirección según el tipo de usuario
                if (currentUserType === 'paciente') {
                    alert('Redirigiendo a la página de paciente...');
                    window.location.href = 'Paciente.html';
                } else {
                    alert('Redirigiendo a la página de evaluador...');
                    // window.location.href = 'Evaluador1.html';
                }
            }, 1500);
        });
        
        // Ocultar la alerta de error al cambiar los campos
        document.getElementById('username').addEventListener('input', function() {
            document.getElementById('errorAlert').style.display = 'none';
        });
        
        document.getElementById('password').addEventListener('input', function() {
            document.getElementById('errorAlert').style.display = 'none';
        });