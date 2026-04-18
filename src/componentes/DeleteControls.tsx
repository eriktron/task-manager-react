type DeleteControlProps = {
    deleteMode: boolean;
    selected: number[];
    onToggleDeleteMode: () => void;
    onDeleteSelected: () => void;
    onDeleteAll: () => void;
}

function DeleteControls({deleteMode, selected, onToggleDeleteMode, onDeleteSelected, onDeleteAll}: DeleteControlProps ) {
    return(
        <div className="delete-controls">
            <button
                className={deleteMode?"btn-cancel":"btn-delete-mode"} 
                onClick={onToggleDeleteMode}>
                {deleteMode ? "Cancelar" : "Eliminar Tarea"}
            </button>

            {deleteMode && (
                <div>
                    <button
                        className="btn-delete-selected" 
                        onClick={onDeleteSelected} disabled={selected.length === 0}>
                        Eliminar Seleccionado
                    </button>
                    <button 
                        className="btn-delete-all"
                        onClick={onDeleteAll}>
                        Eliminar Todo
                    </button>
                </div>
            )}
        </div>
    );    
}

export default DeleteControls;