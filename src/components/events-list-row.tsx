import React from 'react'

interface EventsListRowUI {
  position: number;
  event: {
    id: number;
    nome_evento: string;
    local: string;
    dia_semana: string;
    horario: string;
  }
  handleEventRemove: (id: number, nome_evento: string) => void;
}

export const EventsListRow = (props: EventsListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.event.nome_evento}
    </td>

    <td className="table-item">
      {props.event.local}
    </td>

    <td className="table-item">
      {props.event.dia_semana}
    </td>

    <td className="table-item">
      {props.event.horario}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleEventRemove(props.event.id, props.event.nome_evento)}>
        Deletar Evento
      </button>
    </td>
  </tr>
)