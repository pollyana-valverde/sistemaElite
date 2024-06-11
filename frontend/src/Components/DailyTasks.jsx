import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Container, Row, Col } from 'react-bootstrap'

import '../css/dropTask.css';

export default function DailyTasks() {
    const [tasks, setTasks] = useState([
        {
            horario: '09:00',
            icone: 'pi pi-calendar-clock mr-3',
            titulo: 'Reunião diretoria',
            duracao: '9:00 - 10:00'
        },
        {
            horario: '11:00',
            icone: 'pi pi-copy mr-3',
            titulo: 'Acertar Papelada',
            duracao: '11:00 - 12:00'
        },
        {
            horario: '14:40',
            icone: 'pi pi-building mr-3',
            titulo: 'Apresentar escola novo aluno',
            duracao: '14:40 - 15:40'
        }
    ]);

    return (
        <div className="tasks">
            <h4>Tarefas do dia</h4>

            {tasks.map((task, indes) => (
                <>
                    <div className="tasksConteiner">
                        
                            <div className="taskTime">
                                <p>{task.horario}</p>
                            </div>
                            <div className="tasksContent">
                                <div className="taskHeader">
                                    <i className={task.icone}></i>
                                    <h5>{task.titulo}</h5>
                                </div>
                                <span>{task.duracao}</span>
                            </div>
                       
                    </div>
                </>
            ))}

        </div>
    )
}
