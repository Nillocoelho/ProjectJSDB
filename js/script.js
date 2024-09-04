document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const cidade = document.getElementById('cidade').value;

        function mostrarAlerta() {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Seu registro foi concluído com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf, email, cidade })
        })
        .then(response => response.text())
        .then(data => {
            mostrarAlerta(); // Chama a função de alerta ao concluir o registro com sucesso
        })
        .catch(error => {
            console.error('Erro:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um problema durante o registro.',
                icon: 'error',
                confirmButtonText: 'Tentar Novamente'
            });
        });
    });
});
