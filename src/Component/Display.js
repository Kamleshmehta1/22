import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";

const Display = () => {
  const dataArr = useSelector((state) => state.reducer.TODO_DATA);
  const dispatch = useDispatch();
  const [id, setID] = useState("");

  const handleEdit = (id) => {
    dispatch({
      type: "EDIT_TODO",
      payload: id,
    });

    dispatch({
      type: "TOGGLE",
      payload: true,
    });
    setID("");
  };
  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const checkText = (id, status) => {
    dispatch({
      type: "CHECK",
      payload: { id: id, status: !status },
    });
  };

  const renderElements = (arr) => {
    return (
      <ul className="renderCont">
        {arr.map((ele, idx) => (
          <div key={idx}>
            <div className="renderSubContainer">
              <input
                type="checkbox"
                defaultChecked={ele.check}
                // checked={ele.check}
                onClick={() => checkText(ele.id, ele.check)}
                className="checkTodo"
              />
              <li className={ele.check ? "checkLi" : "unCheckLi"}>
                {ele.data || ele}
              </li>
              <div className="actionContainer">
                <button
                  style={{
                    fontSize: "36px",
                    borderRadius: "50%",
                    padding: "5px 8px 5px 8px",
                    backgroundColor: "#ccc",
                  }}
                  title="ADD SUBTASK"
                  onClick={() => setID(ele.id)}
                >
                  +
                </button>
                <i
                  className="fa fa-edit"
                  style={{ fontSize: "36px" }}
                  title="EDIT"
                  onClick={() => handleEdit(ele.id)}
                ></i>
                <i
                  className="fa fa-trash"
                  style={{ fontSize: "36px" }}
                  title={ele.id}
                  onClick={() => handleDelete(ele.id)}
                ></i>
              </div>
            </div>
            <div>
              {ele.id === id ? <Form id={ele.id} action="SUBTASK" /> : null}
              {ele.subTask !== undefined && ele.subTask.length !== 0 ? (
                <ul className="childUl">{renderElements(ele.subTask)}</ul>
              ) : null}
            </div>
          </div>
        ))}
      </ul>
    );
  };

  return <div className="renderContainer">{renderElements(dataArr)}</div>;
};
export default Display;
