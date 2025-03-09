import React from "react";

interface InformationsHeaderProps {
  title?: string;
}

const InformationsHeader: React.FC<InformationsHeaderProps> = ({ title }) => {
  if (!title) return null;

  return <h1 className="h1-b font-bold mb-8 ml-5">{title}</h1>;
};

export default InformationsHeader;
