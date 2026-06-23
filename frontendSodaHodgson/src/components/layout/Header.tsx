import React from "react";

export interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-slate-500">
          Sistema Soda Hodgson
        </p>
      </div>

      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
        E
      </div>

    </div>
  )
}

export default Header;