

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
}