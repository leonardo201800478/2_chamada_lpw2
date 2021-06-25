import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { EventsList } from './events-list'

import './../styles/events.css'

export const Events = () => {
  const [nome_evento, setNomeEvento] = useState('')
  const [local, setLocal] = useState('')
  const [dia_semana, setDiaSemana] = useState('')
  const [horario, setHorario] = useState('')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    axios
      .get('http://localhost:4001/books/all')
      .then(response => {
        setEvents(response.data)

          setLoading(false)
      })
      .catch(error => console.error(`Erro ao gerar a lista de eventos: ${error}`))
  }

  const handleInputsReset = () => {
    setNomeEvento('')
    setLocal('')
    setDiaSemana('')
    setHorario('')
  }

   const handleEventCreate = () => {
    axios
      .post('http://localhost:4001/books/create', {
        nome_evento: nome_evento,
        local: local,
        dia_semana: dia_semana,
        horario: horario
      })
      .then(res => {
        console.log(res.data)

        fetchEvents()
      })
      .catch(error => console.error(`Erro ao criar um local ${local}: ${error}`))
  }

  const handleEventSubmit = () => {

    if (nome_evento.length > 0 && local.length > 0 && dia_semana.length > 0 && horario.length > 0) {

      handleEventCreate()

      console.info(`O ${local} foi adicionado ao evento ${nome_evento}.`)

        handleInputsReset()
    }
  }


  const handleEventRemove = (id: number, local: string) => {
    axios
      .put('http://localhost:4001/books/delete', { id: id })
      .then(() => {
        console.log(`Local do evnto ${local} removido.`)

        fetchEvents()
      })
      .catch(error => console.error(`Erro ao remover o local do evento ${local}: ${error}`))
  }

  const handleListReset = () => {
    axios.put('http://localhost:4001/books/reset')
    .then(() => {
        fetchEvents()
    })
    .catch(error => console.error(`Erro ao resetar a lista de eventos: ${error}`))
  }

  return (
    <div className="event-list-wrapper">
      {/* Formulario para criar um novo evento */}
      <div className="event-list-form">
        <div className="form-wrapper" onSubmit={handleEventSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="local">Entre com um local:</label>
              <input className="form-input" type="text" id="local" name="local" value={local} onChange={(e) => setLocal(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="nome_evento">Entre com um Evento:</label>
              <input className="form-input" type="text" id="nome_evento" name="nome_evento" value={nome_evento} onChange={(e) => setNomeEvento(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="dia_semana">Entre com um dia da semana:</label>
              <input className="form-input" type="text" id="dia_semana" name="dia_semana" value={dia_semana} onChange={(e) => setDiaSemana(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="horario">Entre com o horário:</label>
              <input className="form-input" type="text" id="horario" name="horario" value={horario} onChange={(e) => setHorario(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleEventSubmit} className="btn btn-add">Adicionar um Evento</button>
      </div>

      {/* Render bookshelf list component */}
      <EventsList events={events} loading={loading} handleEventRemove={handleEventRemove} />

      {/* Show reset button if list contains at least one book */}
      {events.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Resetar lista de eventos.</button>
      )}
    </div>
  )
}