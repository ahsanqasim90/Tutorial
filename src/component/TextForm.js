import React, { useState } from 'react';

function Alert(props) {
    return (
        props.alert && (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
              <strong>{(props.alert.type)}</strong>: {props.alert.msg}
              
            </div>
          )
          
    );
}

export default function TextForm(props) {
    const [alert, setAlert] = useState(null);
    
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const [text, setText] = useState('');

    const handleUpClick = () => {
        setText(text.toUpperCase());
        showAlert("Converted to uppercase!", "success");
    };

    const handleLoClick = () => {
        setText(text.toLowerCase());
        showAlert("Converted to lowercase!", "success");
    };

    const handleClearClick = () => {
        setText('');
        showAlert("Text cleared!", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const countWords = (text) => {
        return text.split(/\s+/).filter((element) => element.length !== 0).length;
    };

    const handleCamelCaseClick = () => {
        let newText = text
            .split(/\s+/)
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                } else {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
            })
            .join('');
        setText(newText);
        showAlert("Converted to camelCase!", "success");
    };

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading}</h1>
                <Alert alert={alert} /> {/* Render Alert component here */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                      style={{
                                backgroundColor: props.mode === 'dark' ? 'black' : 'white',
                                color: 
                                    props.mode === 'dark' ? 'white' : 
                                    (props.bgColor === 'green' ? 'white' : 
                                    (props.bgColor === 'red' ? 'black' : 'black')), // Dynamic text color based on background color
                            }}
                        id="myBox"
                        rows="8"
                    ></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-warning mx-3" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-danger mx-3" onClick={handleClearClick}>Clear</button>
                <button className="btn btn-success mx-3" onClick={handleCamelCaseClick}>Convert to camelCase</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h2>Your text summary</h2>
                <p>{countWords(text)} words and {text.length} characters</p>
                <p>In {0.008 * countWords(text)} minutes you can read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter your text to preview"}</p>
            </div>
        </>
    );
}