
import { useRef, useState } from "react";
import { Form } from "../../../Components/FormElements/GeneralFormik";
import { SampleContent } from '../Components/SampleContent';

const divStyle = { background: "#ccc", marginTop: "2.5rem" };

const UserEdit = ({ }) => {

  const countryAutoCompleteCompo = [{ label: "india", code: "123" }, { label: "Aus", code: "123" }];
  const formValues = [
    // {
    //   type: "HTMLelement",
    //   HTMLelement: <SampleContent />
    // },
    {
      name: "email",
      type: "text",
      disabled: false,
      validationType: "string",
      validations: [{ type: "required", params: ["Email is required"] },],
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "country",
      type: "autoCompleteSelect",
      autoCompleteCompo: countryAutoCompleteCompo,
    },
    {
      name: "date",
      type: "date",
      minDate: new Date(),
      maxDate: new Date("08-08-2023"),
      validationType: "date",
      validations: [
        { type: "required", params: ["Date  is required"], },
        { type: "max", params: [new Date("08-08-2023"), "Date have limit "], },
      ],
      handleTextDisable: true, //disable handle change on typing
    },

  ];

  const initialValues = {
    email: "",
    name: "",
    country: "",
    date: new Date(),
  };
  const formikRef = useRef(null);
  const formikRef2 = useRef(null);

  const generalFormikRef = useRef(null);
  const generalFormikRef2 = useRef(null);

  const [firstForm, setFirstForm] = useState(null);
  const [secondForm, setSecondForm] = useState(null);


  const drop = (e) => {
    e.preventDefault();
    const div_id = e.dataTransfer.getData("div_id");
    const block = document.getElementById(div_id);
    e.target.appendChild(block);
  };
  const dragOver1 = (e) => {
    e.preventDefault();
  };

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("div_id", target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const submitAll = () => {
    let firstButton = document.getElementById("form-first");
    if (firstButton) {
      firstButton?.click();
      console.log(generalFormikRef.current.values, "formikRef");
    }
  }

  return (
    <div>
      <div id="draggable-first-form"
        onDrop={drop}
        onDragOver={dragOver1}
        style={{ padding: "8px" }}
      >
        <div
          id="draggable-first-form-element"
          style={divStyle}
          draggable
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          <Form
            formValues={formValues}
            initialValues={initialValues}
            formikRef={generalFormikRef}
            onSubmit={(data) => { console.log(data, "data1"); setFirstForm(data); }}
            ref={formikRef}
          />
          <button id="form-first" style={{ display: "none" }} onClick={() => { formikRef?.current?.onClick(); }}>First</button>
        </div>
      </div>
      <div id="draggable-second-form"
        onDrop={drop}
        onDragOver={dragOver1}
        style={{ padding: "8px" }}
      >
        <div id="draggable-second-form-element"
          style={divStyle}
          draggable
          onDragStart={dragStart}
          onDragOver={dragOver}
        >
          <Form
            formValues={formValues}
            initialValues={initialValues}
            formikRef={generalFormikRef2}
            onSubmit={(data) => { console.log(data, "data2"); setSecondForm(data); }}
            ref={formikRef2}
          />
          <button id="form-first" style={{ display: "none" }} onClick={() => { formikRef2?.current?.onClick(); }}>Second</button>
        </div>
      </div>
      <button onClick={submitAll}>SUBMIT</button>
    </div>




  );
};
export default UserEdit;


