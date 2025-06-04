export function setupRegisterForm() {
  const form = document.getElementById('register-form');
  const btn = document.getElementById('btn-registrar');

  btn.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const cSenha = document.getElementById('c-senha').value.trim();
    const cpf_cnpj = document.getElementById('cnpj-cpf').value.trim();

    if (senha !== cSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const dados = {
      nome,
      telefone,
      email,
      senha,
      cpf_cnpj,
      login: cpf_cnpj
    };

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.mensagem);
        window.location.href = '../../../index.html';
      } else {
        alert(result.mensagem || result.erro || 'Erro ao cadastrar');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  });
}