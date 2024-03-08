import React from "react";
import "./PanelDrawers.css"; // Import the CSS file

export const PanelDrawers = ({ title, data, onMouseEnter, onMouseLeave }) => {
  return (
    <>
      <h2 className="drawer-title">{title}</h2>
      {data.map((section, index) => (
        <div key={index}>
          <div className="drawer-section">{section.title}</div>
          {section.children.map((child) => (
            <div
              key={child.label}
              className="drawer-item"
              onMouseEnter={(e) => {
                onMouseEnter(child);
                e.currentTarget.classList.add("drawer-item-hover");
              }}
              onMouseLeave={(e) => {
                onMouseLeave(child);
                e.currentTarget.classList.remove("drawer-item-hover");
              }}
            >
              {child.label}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
