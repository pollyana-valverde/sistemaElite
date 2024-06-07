import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function PositionDemo() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap justify-content-center gap-2 mb-2">
        <Button
          label="Top"
          icon="pi pi-arrow-down"
          onClick={() => show('top')}
          className="p-button-warning"
          style={{ minWidth: '10rem' }}
        />
      </div>

      <Dialog
        header="Cadastrar fornecedor"
        visible={visible}
        position={position}
        style={{ width: '70vw' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">
          <Form onSubmit={handleSubmit} className='formsSistema'>
            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridTelefone">
                <Form.Label>Telefone</Form.Label>
                <InputMask className='form-control' type="text" name="telefone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} ></InputMask>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCpf">
                <Form.Label>CPF</Form.Label>
                <InputMask className='form-control' type="text" name="cpf" mask="999.999.999-99" placeholder="999.999.999-99" value={formData.cpf} onChange={handleChange} ></InputMask>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDataNascimento">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" name="dataNascimento" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridMatricula">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control type="text" name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAnoLetivo">
                <Form.Label>Ano Letivo</Form.Label>
                <Form.Control type="text" name="anoLetivo" placeholder="Ano Letivo" value={formData.anoLetivo} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridPeriodo">
              <Form.Label>Período</Form.Label>
              <Form.Control type="text" name="periodo" placeholder="Período" value={formData.periodo} onChange={handleChange} />
            </Form.Group>

            <button className='btnFormSistema' type="submit">Salvar</button>
          </Form>
        </p>
      </Dialog>
    </div>
  );
}
