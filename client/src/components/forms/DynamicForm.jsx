import React from "react";
import { Form, Button } from "react-bootstrap";
import FieldList from "./FieldList";

function DynamicForm({ title, listForm, onSubmit, onStatusChange }) {
  const [statusFieldList, setstatusFieldList] = React.useState([]);

  const onFormChange = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        alert("Please enter a status");
        return;
      }

      if (statusFieldList.includes(e.target.value)) {
        alert("Status already exists");
        return;
      }

      e.preventDefault();
      const newStatusFieldList = [...statusFieldList, e.target.value];
      setstatusFieldList(newStatusFieldList);
      onStatusChange(newStatusFieldList); 
      e.target.value = "";
    }
  };

  const removeStatus = (index) => {
    const newstatusFieldList = [...statusFieldList];
    newstatusFieldList.splice(index, 1);
    setstatusFieldList(newstatusFieldList);
    onStatusChange(newstatusFieldList);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {listForm.map((form) => (
          <React.Fragment key={form.id}>
            {form.type !== "hidden" && (
              <Form.Group controlId={form.id} className="p-2">
                <Form.Label>{form.label}</Form.Label>
                
                {form.type === "select" ? (
                  <Form.Control as="select" required={form.required} defaultValue={form.defaultValue}>
                    {/* option must an object contains id and name. */}
                    {form.options.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Control>
                
                ) : form.type === "textarea" ? (
                  <Form.Control as="textarea" rows={form.rows || 3} placeholder={form.placeholder} required={form.required} defaultValue={form.defaultValue} />
                )
                  : form.type === "textlist" ? (
                  <>
                    <div>
                      <FieldList fieldList={statusFieldList} remove={removeStatus} />
                    </div>
                    <Form.Control type="text" list="status" placeholder={form.placeholder} required={form.required} onKeyDown={onFormChange} />
                  </>
                
                ) : form.type === "checkbox" ? (
                  <Form.Check type="checkbox" label={form.label} required={form.required} />
                  
                ) : form.type === "radio" ? (
                  form.options.map((option, index) => <Form.Check key={index} type="radio" label={option} value={option} name={form.id} required={form.required} />)
                
                ) : (
                  <Form.Control type={form.type} placeholder={form.placeholder} required={form.required} defaultValue={form.defaultValue} pattern={form.pattern} />
                )}
              </Form.Group>
            )}
            {form.type === "hidden" && <Form.Control type="hidden" id={form.id} defaultValue={form.defaultValue} />}
          </React.Fragment>
        ))}
        <Button variant="primary" type="submit" className="w-100 mt-3">
          {title}
        </Button>
      </Form>
    </div>
  );
}

export default DynamicForm;
