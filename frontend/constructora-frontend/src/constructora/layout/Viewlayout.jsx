import { Row, Col, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

export const ViewLayout = ({ title, data, columns, FormComponent, onSubmit, formInitialValues, showModal, handleCloseModal, handleShowModal }) => {

    if(!data) {
        return(
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', height: 'calc(100vh - 64px)' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>{title}</h1>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Cargando...</h2>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', height: 'calc(100vh - 64px)' }}>
            <Row>
                <Col>
                    <h1 style={
                        {
                            textAlign: 'center',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '2rem'
                        }
                    }>{title}</h1>
                </Col>
            </Row>
            <Row style={
                {
                    width: '100%',
                    overflowX: 'auto',
                }
            }>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                    
                />
            </Row>
            <Button onClick={handleShowModal} className='table-button'>Agregar</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormComponent onSubmit={onSubmit} formInitialValues={formInitialValues} />
                </Modal.Body>
            </Modal>
            <style>
                {
                    `
                    .table-button {
                        padding: 1rem 2rem;
                        font-size: 1.2rem;
                        font-weight: bold;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
            
                    @media (max-width: 500px) {
                        .table-button {
                            font-size: 1rem;
                        }
                    }
                    `
                }
            </style>
        </div>
    )
}