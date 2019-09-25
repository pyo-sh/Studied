import React from 'react';
import './ChangeNewFolder.css';

const ChangeNewFolder = ({value, onChange, onClickConfirm, closeNewFolder}) => {
    return(
        <div>
            <form className="Add-Folder">
                <input 
                    type="text" 
                    placeholder="폴더 이름 입력" 
                    className="New-Folder" 
                    value={value}
                    onChange={onChange}
                />
                <div className="Confirm-Area">
                    <button className="Cancel" onClick={closeNewFolder}>취소</button>
                    <button className="Confirm" onClick={onClickConfirm}>확인</button>
                </div>     
            </form>
        </div>
    )
} 

export default ChangeNewFolder;