import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import '../css/contaReceberHome.css';

export default function ContaReceberHome() {
    const [contasReceber, setContasReceber] = useState([]);
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
        axios.get("http://localhost:3001/contasReceber")
        .then((res) => setContasReceber(res.data))
        .catch(err => (err))
      }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="contaReceberHome">
                    <div className='receberHomeHeader'><h5>Contas a receber </h5><a className="link" href="/ContasReceber"> <i className='pi pi-external-link'></i> </a></div>
                        <DataTable
                            size='small'
                            value={contasReceber}
                            dataKey="idcontaReceber" 
                            rows={7}
                            stripedRows
                            paginator
                            paginatorClassName='paginacaoContaReceber border-round-lg'
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink  NextPageLink LastPageLink"
                            currentPageReportTemplate=""
                            tableStyle={{ width: '100%'}}
                        >
                            <Column field="valorReceber" sortable  header="Valor a receber"  style={{ width: 'auto' }}></Column>
                            <Column field="status" body={statusBodyTemplate}  sortable  header="Status" style={{ width: 'auto' }}></Column>
                        </DataTable>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
