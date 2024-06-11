import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Badge } from 'primereact/badge';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/Branco e Quadrado Preto Imobiliária Logotipo.png';

import '../css/dropProfile.css';


function DropProfile() {
    const { token } = useAuth();

    return (
        <div className='dropProfile d-flex flex-wrap  mb-4'>
            <div className="dropProfileIcons flex flex-wrap align-content-center gap-4">
                <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                    <Badge value="2"></Badge>
                </i>
                <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                    <Badge value="5+" severity="danger"></Badge>
                </i>
                <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                    <Badge severity="warning" value="6"></Badge>
                </i>
            </div>
            <div className=' dropProfileItem'>
                <Dropdown as={ButtonGroup}>
                    <Button  className='dropProfileHeader d-flex'>
                            <img src={PerfilFoto} alt='logo da GM' />
                            <div className='dropProfileInfo'>
                                <h5>{token}</h5>
                                <p>Administrador</p>
                            </div>
                    </Button>

                    <Dropdown.Toggle split  id="dropdown-split-basic"  className='dropProfileToggle' />

                    <Dropdown.Menu className='dropProfileContent'>
                        <Dropdown.Item href="#/action-1"> <i className='pi pi-cog mr-1'></i> Configurações</Dropdown.Item>
                        <Dropdown.Item href="/Logout"> <i className='pi pi-sign-out mr-1'></i> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default DropProfile;

