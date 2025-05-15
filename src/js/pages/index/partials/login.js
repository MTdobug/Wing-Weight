
//função de validação do login

export function validateLogin() {

    //pega os valores dos campos de entrada
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    //dados de registro para validar se está certo
    const validUsuario = 'usuario123';
    const validSenha = 'senha123'; 

    let isValid = true;

    //valida o campo usuario
    if (usuario === validUsuario) {
        document.getElementById('usuario').classList.add('input-success');
        document.getElementById('error-usuario').style.display = "none";
    }else {
        document.getElementById('usuario').classList.add('input-error');
        document.getElementById('error-usuario').innerHTML = 'Usuário Inválido';
        document.getElementById('error-usuario').style.display = "block";
        document.getElementById('error-usuario').style.color = "var(--red)";
        
        isValid = false;
    }

    if (senha === validSenha) {
        document.getElementById('senha').classList.add('input-success');
        document.getElementById('error-senha').style.display = "none";
    }else {
        document.getElementById('senha').classList.add('input-error');
        document.getElementById('error-senha').innerHTML = 'Senha Inválida';
        document.getElementById('error-senha').style.display = "block";
        document.getElementById('error-senha').style.color = "var(--red)";

        isValid = false;
    }

    return isValid;

}

// função para adicionar o evento ao formulario

export function setupLoginValidation() {

    const form = document.getElementById('login-form');

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        const isValid = validateLogin();

        if (isValid) {

            console.log('Login bem sucedido');
            window.location.href = 'home.html';

        }else {

            console.log('Erro na validação');

        }


    });

}