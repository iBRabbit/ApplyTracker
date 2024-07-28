import React from "react";
import { Form, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DynamicForm({ title, listForm = [], onSubmit, onStatusChange }) {
  const [statusFieldList, setstatusFieldList] = React.useState([]);

  React.useEffect(() => {
    const statusField = listForm.find((form) => form.type === "textlist");
    if (statusField) {
      setstatusFieldList(statusField.defaultValue || []);
    }
  }, [listForm]);

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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(statusFieldList);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setstatusFieldList(newItems);
    onStatusChange(newItems);
  };

  return (
    <div>
      <Form onSubmit={onSubmit} className="dark text-light">
        {listForm.map((form) => (
          <React.Fragment key={form.id}>
            {form.type !== "hidden" && (
              <Form.Group controlId={form.id} className="p-2">
                <Form.Label>{form.label}</Form.Label>

                {form.type === "select" ? (
                  <Form.Control as="select" required={form.required} defaultValue={form.defaultValue} className="bg-dark text-light">
                    {form.options.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Control>
                ) : form.type === "textarea" ? (
                  <Form.Control as="textarea" rows={form.rows || 3} placeholder={form.placeholder} required={form.required} defaultValue={form.defaultValue} className="bg-dark text-light" />
                ) : form.type === "textlist" ? (
                  <>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable" type="group">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {statusFieldList.map((status, index) => (
                              <Draggable key={status} draggableId={status} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      margin: '8px 0',
                                      padding: '8px',
                                      backgroundColor: '#212529',
                                      border: '1px solid #555',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      color: 'white',
                                    }}
                                  >
                                    {status}
                                    <Button variant="danger" size="sm" onClick={() => removeStatus(index)}>
                                      &times;
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <Form.Control type="text" list="status" placeholder={form.placeholder} required={form.required} onKeyDown={onFormChange} className="bg-dark text-light" />
                  </>
                ) : form.type === "checkbox" ? (
                  <Form.Check type="checkbox" label={form.label} required={form.required} className="text-light" />
                ) : form.type === "radio" ? (
                  form.options.map((option, index) => <Form.Check key={index} type="radio" label={option} value={option} name={form.id} required={form.required} className="text-light" />)
                ) : (
                  <Form.Control type={form.type} placeholder={form.placeholder} required={form.required} defaultValue={form.defaultValue} pattern={form.pattern} className="bg-dark text-light" />
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
