import React from 'react'

import { EventsListRow } from './events-list-row'

import './../styles/events-list.css'

interface EventUI {
  id: number;
  nome_evento: string;
  local: string;
  dia_semana: string;
  horario: string;
}

interface EventsListUI {
  events: EventUI[];
  loading: boolean;
  handleEventRemove: (id: number, nome_evento: string) => void;
}

export const EventsList = (props: EventsListUI) => {

  if (props.loading) return <p>A tabela de eventos esta corregando...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Nome do Evento</th>

            <th className="table-head-item">Local</th>

            <th className="table-head-item">Dia da Semana</th>

            <th className="table-head-item">Horário</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.events.length > 0 ? (
            props.events.map((event: EventUI, idx) => (
              <EventsListRow
                key={event.id}
                event={event}
                position={idx + 1}
                handleEventRemove={props.handleEventRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>Nenhum evento para mostrar. Crie um!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}