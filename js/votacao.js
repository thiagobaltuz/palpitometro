import { supabase } from './supabase.js'

const params = new URLSearchParams(window.location.search)
const jogoId = params.get('jogo_id')
const votedKey = jogoId ? `voto-${jogoId}` : null

document.addEventListener('DOMContentLoaded', async () => {
  const btnA = document.getElementById('btnA')
  const btnE = document.getElementById('btnE')
  const btnB = document.getElementById('btnB')
  const aviso = document.getElementById('aviso')

  const bars = {
    'Time A': document.getElementById('bar-Time-A'),
    'Empate': document.getElementById('bar-Empate'),
    'Time B': document.getElementById('bar-Time-B')
  }

  const disableButtons = () => {
    [btnA, btnE, btnB].forEach(btn => {
      btn.disabled = true
      btn.classList.add('opacity-50', 'cursor-not-allowed')
    })
  }

  const voteAndUpdate = async (opcao) => {
    await supabase.from('votos_palpitometro').insert([{ jogo_id: jogoId, opcao }])
    localStorage.setItem(votedKey, opcao)
    disableButtons()
    await updateBars()
  }

  const updateBars = async () => {
    if (!jogoId) return
    const { data } = await supabase
      .from('votos_palpitometro')
      .select('opcao')
      .eq('jogo_id', jogoId)

    const counts = { 'Time A': 0, 'Empate': 0, 'Time B': 0 }
    data?.forEach(v => counts[v.opcao] !== undefined && counts[v.opcao]++)
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    for (const opt in counts) {
      const percent = total ? (counts[opt] / total) * 100 : 0
      bars[opt].style.width = `${percent}%`
    }
  }

  if (!jogoId) {
    disableButtons()
    if (aviso) aviso.innerText = "⚠️ Jogo não identificado na URL. Adicione ?jogo_id=SEU_ID para votar."
  } else {
    if (localStorage.getItem(votedKey)) disableButtons()
    await updateBars()
    btnA.onclick = () => voteAndUpdate('Time A')
    btnE.onclick = () => voteAndUpdate('Empate')
    btnB.onclick = () => voteAndUpdate('Time B')
  }
})