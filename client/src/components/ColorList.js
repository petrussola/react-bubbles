import React, { useState } from "react";
import axios from "axios";
import withAuth from "../axios/axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const colorsEndPoint = "http://localhost:5000/api/colors";

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    withAuth()
      .put(`${colorsEndPoint}/${colorToEdit.id}`, colorToEdit)
      .then(resp => {
        updateColors(
          colors.map(item => {
            if (item.id === resp.data.id) {
              return resp.data;
            }
            return item;
          })
        );
      })
      .catch(error => {
        debugger;
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    withAuth()
      .delete(`${colorsEndPoint}/${color.id}`)
      .then(resp => {
        updateColors(
          colors.filter(item => {
            return item.id !== resp.data;
          })
        );
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
