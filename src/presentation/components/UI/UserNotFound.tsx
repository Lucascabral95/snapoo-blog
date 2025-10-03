import React from "react";

import "./UserNotFound.scss";

const UserNotFound: React.FC = () => {
  return (
    <div className="user-not-found">
      <div className="contenedor-user-not-found">
        <div className="descripcionn">
          <h2> Usuario no encontrado </h2>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
