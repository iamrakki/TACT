import React from 'react';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { EditorState, ContentState, convertToRaw, convertFromRaw, Modifier, SelectionState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';

const Test = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [toolbarVisible, setToolbarVisible] = useState(false);

    const toggleToolbar = () => {
        setToolbarVisible(!toolbarVisible);
    };

    const toolbar = (
        <div
            data-tip="Click to open the toolbar"
            data-for="toolbar-tooltip"
            // onClick={toggleToolbar}
            style={{
                position: 'absolute',
                bottom: '50px',
                right: '50px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px #888',
            }}
        >
            {/* Your toolbar JSX goes here */}
            <Editor
                editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName border mt-2 p-2"
                toolbarClassName="toolbarClassName text-black"
                toolbar={{
                    options: ['inline', 'fontFamily', 'colorPicker'],
                    inline: { options: ['bold', 'italic', 'underline'] },
                    fontFamily: {
                        options: [
                            'Arial',
                            'Georgia',
                            'Impact',
                            'Tahoma',
                            'Times New Roman',
                            'Verdana',
                            'Courier New',
                            'Playball',
                        ],
                    },
                    colorPicker: {
                        colors: [
                            'rgb(0, 0, 139)',
                            'rgb(97,189,109)',
                            'rgb(26,188,156)',
                            'rgb(84,172,210)',
                            'rgb(44,130,201)',
                            'rgb(147,101,184)',
                            'rgb(71,85,119)',
                            'rgb(204,204,204)',
                            'rgb(65,168,95)',
                            'rgb(0,168,133)',
                            'rgb(61,142,185)',
                            'rgb(41,105,176)',
                            'rgb(85,57,130)',
                            'rgb(40,50,78)',
                            'rgb(0,0,0)',
                            'rgb(247,218,100)',
                            'rgb(251,160,38)',
                            'rgb(235,107,86)',
                            'rgb(226,80,65)',
                            'rgb(163,143,132)',
                            'rgb(239,239,239)',
                            'rgb(255,255,255)',
                            'rgb(250,197,28)',
                            'rgb(243,121,52)',
                            'rgb(209,72,65)',
                            'rgb(184,49,47)',
                            'rgb(124,112,107)',
                            'rgb(209,213,216)',
                        ],
                    },
                }}
            />
        </div>
    );

    return (
        <div>
            <div
                style={{
                    position: 'relative',
                    minHeight: '300px',
                }}
                onMouseEnter={() => setToolbarVisible(true)}
                onMouseLeave={() => setToolbarVisible(false)}
            >
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName border mt-2 p-2"
                    toolbarClassName="toolbarClassName text-black"
                    toolbarHidden
                />
            </div>
            {toolbarVisible && toolbar}
            <Tooltip
                id="toolbar-tooltip"
                place="top"
                effect="solid"
                delayShow={1000}
            />
        </div>
    );
}


export default Test;