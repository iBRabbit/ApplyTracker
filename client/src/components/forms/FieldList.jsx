import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FieldList({ fieldList, remove }) {
    const colors = [
        "salmon",
        "lightblue",
        "lightgreen",
        "lightcoral",
        "lightseagreen",
        "lightsteelblue",
        "lightsalmon",
        "lightyellow",
        "lightpink",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray"
    ];
    const [color, setColor] = useState('');
    const [count, setCount] = useState(0);

    const changeColor = () => {
        setColor(colors[count]);
        setCount(count + 1);
        if (count === colors.length - 1) {
            setCount(0);
        }
    }

    return (
        <div>
            {fieldList.map((field, index) => (
                <span
                    key={index}
                    className="badge badge-primary"
                    style={{
                        backgroundColor: "lightgray",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        color: "black",
                        margin: "0.5rem",
                        marginBottom: "1.5rem",
                        display: "inline-flex",
                        alignItems: "center"
                    }}
                >
                    {field}
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => remove(index)}
                        style={{
                            "fontSize": "0.5rem",
                            marginLeft: "0.5rem",
                            padding: "0.1rem 0.3rem",
                            borderRadius: "0.5rem"
                        }}
                    >
                        x
                    </Button>
                </span>
            ))}
        </div>
    );
}

export default FieldList;
