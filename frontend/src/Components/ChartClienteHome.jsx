import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Chart } from 'primereact/chart';
import { IconField } from 'primereact/iconfield';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import '../css/chartClienteHome.css';

const ChartClienteHome = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    label: '2022',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: '2023',
                    backgroundColor: documentStyle.getPropertyValue('--surface-300'),
                    borderColor: documentStyle.getPropertyValue('--surface-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data)
        setChartOptions(options);
    }, []);


    return (
        <Container>
            <Row>
                <Col>
                <Link className="link" to="/ListaClientes"> 
                <div className="graficoCliente">
                    <h5>Gráfico de clientes</h5>
                        <Chart  type="bar" data={chartData} options={chartOptions} />
                    </div>
                </Link>
                    
                </Col>
            </Row>
        </Container>
    )

};

export default ChartClienteHome;