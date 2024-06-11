import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Badge } from 'primereact/badge';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/logoGeneralMotors.png';


function DropProfile() {
    const { token } = useAuth();

    return (
        <div className='d-flex flex-wrap  mb-4' style={{ justifyContent: 'space-between', margin: '0 10px' }}>
            <div className=" flex flex-wrap align-content-center gap-4">
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
            <div className='mr-2'>
                <Dropdown as={ButtonGroup}>
                    <Button variant='Secondary'>
                        <div className='navProfile d-flex'>
                            <img src={PerfilFoto} alt='logo da GM' />
                            <div className='navProfileInfo'>
                                <h5>{token}</h5>
                                <p>Administrador</p>
                            </div>
                        </div>
                    </Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1"> <i className='pi pi-cog mr-1'></i> Configurações</Dropdown.Item>
                        <Dropdown.Item href="/Logout"> <i className='pi pi-sign-out mr-1'></i> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default DropProfile;

