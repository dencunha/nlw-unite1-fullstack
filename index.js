let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 30),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 18, 45),
    dataCheckIn: new Date(2024, 0, 20, 19, 15)
  },
  {
    nome: "Pedro Silva",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 10),
    dataCheckIn: new Date(2024, 1, 15, 15, 30)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 11, 20),
    dataCheckIn: new Date(2024, 2, 8, 10, 0)
  },
  {
    nome: "Lucas Santos",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 8, 0),
    dataCheckIn: new Date(2024, 2, 18, 9, 45)
  },
  {
    nome: "Camila Lima",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 0, 25, 20, 30),
    dataCheckIn: new Date(2024, 1, 1, 21, 15)
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 1, 18, 16, 20),
    dataCheckIn: new Date(2024, 1, 23, 17, 10)
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 0, 8, 10, 0),
    dataCheckIn: new Date(2024, 0, 10, 9, 30)
  },
  {
    nome: "Marina Rocha",
    email: "marina@gmail.com",
    dataInscricao: new Date(2024, 0, 1, 14, 45),
    dataCheckIn: new Date(2024, 0, 5, 15, 20)
  }
];

console.log(participantes);

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

//condicional
 if(participante.dataCheckIn == null) {
  dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
  `
 }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
         </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td> ${dataInscricao} </td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}


const atualizarLista = (participantes) => {
  //pegar informação do HTML
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

//verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  if(confirm(mensagemConfirmacao) == false) {
    return
  }
 
  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  )

  // atualizar o check-in do participante
  participante.dataCheckIn = new Date ()

  //atualizar a lista de participantes
  atualizarLista(participantes)


}
