const botaoNao = document.querySelector("#nao");
const botaoSim = document.querySelector("#sim");

const mensagem = document.querySelector("#mensagem");

const mensagens = [
  "Tem certeza? 😂",
  "Pensa melhor aí 👀",
  "Essa resposta não parece certa kkkkk",
  "Última chance hein 😏"
];

let tentativas = 0;
const limiteTentativas = 4;

botaoNao.addEventListener("mouseenter", () => {
  if (tentativas < limiteTentativas) {

    botaoNao.textContent = mensagens[tentativas];

    // Na primeira tentativa, tira o botão do card
    if (tentativas === 0) {
      document.body.appendChild(botaoNao);
    }

    botaoNao.style.position = "fixed";
    botaoNao.style.zIndex = "9999";

    const margem = 20;

    const larguraBotao = botaoNao.offsetWidth;
    const alturaBotao = botaoNao.offsetHeight;

    const maxX = Math.max(
      margem,
      window.innerWidth - larguraBotao - margem
    );

    const maxY = Math.max(
      margem,
      window.innerHeight - alturaBotao - margem
    );

    const novaPosicaoX =
      margem + Math.random() * (maxX - margem);

    const novaPosicaoY =
      margem + Math.random() * (maxY - margem);

    botaoNao.style.left = `${novaPosicaoX}px`;
    botaoNao.style.top = `${novaPosicaoY}px`;

    tentativas++;
  }
});


botaoSim.addEventListener("click", () => {
  document.body.innerHTML = `
    <main>
      <section>
        <p>Sabia que você iria escolher certo 😎</p>
        <h1>Então temos um encontro 😏❤️</h1>
      </section>
    </main>
  `;

  criarCoracoes();
  tocarSomFeliz();
});


botaoNao.addEventListener("click", () => {
  document.body.classList.add("modo-triste");

  document.body.innerHTML = `
    <main>
      <section class="card-triste">
        <p class="coracao-partido">💔</p>

        <h1>Tudo bem... eu vou superar.</h1>

        <p>Talvez. 😔</p>

        <p class="drama">Foi bom enquanto durou...</p>
      </section>
    </main>
  `;
   criarCoracoesPartidos();
   tocarSomTriste();
});


function criarCoracoes() {
  console.log("criando corações ❤️");

 for (let i = 0; i < 80; i++) {
    const coracao = document.createElement("span");

    coracao.textContent = "❤️";
    coracao.classList.add("coracao");

    coracao.style.left = `${Math.random() * 100}vw`;
    coracao.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(coracao);
  }
}

function criarCoracoesPartidos() {
  for (let i = 0; i < 25; i++) {
    const coracao = document.createElement("span");

    coracao.textContent = "💔";
    coracao.classList.add("coracao-triste");

    coracao.style.left = `${Math.random() * 100}vw`;
    coracao.style.animationDelay = `${Math.random() * 0.7}s`;

    document.body.appendChild(coracao);
  }
}


function tocarSomTriste() {
  const contexto = new AudioContext();

  const notas = [
    349.23,
    293.66,
    261.63,
    220
  ];

  notas.forEach((frequencia, indice) => {
    const oscilador = contexto.createOscillator();
    const volume = contexto.createGain();

    oscilador.connect(volume);
    volume.connect(contexto.destination);

    oscilador.type = "sine";
    oscilador.frequency.value = frequencia;

    const inicio = contexto.currentTime + indice * 0.7;

    volume.gain.setValueAtTime(0.18, inicio);
    volume.gain.exponentialRampToValueAtTime(
      0.001,
      inicio + 0.65
    );

    oscilador.start(inicio);
    oscilador.stop(inicio + 0.7);
  });
}


function tocarSomFeliz() {
  const contexto = new AudioContext();

  const notas = [
    523.25,
    659.25,
    783.99,
    1046.5
  ];

  notas.forEach((frequencia, indice) => {
    const oscilador = contexto.createOscillator();
    const volume = contexto.createGain();

    oscilador.connect(volume);
    volume.connect(contexto.destination);

    oscilador.type = "triangle";
    oscilador.frequency.value = frequencia;

    const inicio = contexto.currentTime + indice * 0.18;

    volume.gain.setValueAtTime(0.15, inicio);
    volume.gain.exponentialRampToValueAtTime(
      0.001,
      inicio + 0.3
    );

    oscilador.start(inicio);
    oscilador.stop(inicio + 0.3);
  });
}