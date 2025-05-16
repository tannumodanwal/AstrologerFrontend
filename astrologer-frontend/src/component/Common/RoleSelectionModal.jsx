// src/component/RoleSelectionModal.jsx
import React from 'react';

const RoleSelectionModal = ({ onSelectRole, onClose, actionType }) => {
  return (
    <div className="bg-white border shadow-lg rounded-md w-56 py-2 absolute top-full mt-2 right-0 z-50">
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelectRole('user')}
      >
        {actionType === 'login' ? 'Login as User' : 'Signup as User'}
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => onSelectRole('astrologer')}
      >
        {actionType === 'login' ? 'Login as Astrologer' : 'Signup as Astrologer'}
      </button>
      <button
        className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default RoleSelectionModal;
