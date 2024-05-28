import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import '../css/contaPagarHome.css';

export default function ContaPagarHome() {
    const [contasPagar, setContasPagar] = useState([]);
    const toast = useRef(null);
    const [statuses] = useState(['Baixado', 'Pendente']);

    const getStatus = (status) => {
        switch (status) {
            case 'Baixado':
                return 'success';

            case 'Pendente':
                return 'danger';
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getStatus(rowData.status)} />;
    };


    useEffect(() => {
        axios.get("http://localhost:3001/contasPagar")
            .then((res) => setContasPagar(res.data))
            .catch(err => (err))
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="contaPagarHome">
                        <div className='pagarHomeHeader'><h5>Contas a pagar </h5><a className="link" href="/ContasPagar"> <i className='pi pi-external-link'></i> </a></div>
                        <DataTable
                            size='small'
                            value={contasPagar}
                            dataKey="idcontaPagar"
                            rows={7}
                            stripedRows
                            paginator
                            paginatorClassName='paginacaoContaPagar border-round-lg'
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink  NextPageLink LastPageLink"
                            currentPageReportTemplate=""
                            tableStyle={{ width: '100%' }}
                        >
                            <Column field="valorPagar" sortable header="Valor a pagar" style={{ width: 'auto' }}></Column>
                            <Column field="status" body={statusBodyTemplate} sortable header="Status" style={{ width: 'auto' }}></Column>
                        </DataTable>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
