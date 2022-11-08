import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { useTheme } from 'next-themes';

const EditorComponent = ({ placeholder, content, changeContent }) => {
    const editor = useRef(null);
    const { theme } = useTheme();
    const config = useMemo(() =>
    ({
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: placeholder || 'Start typings...',
        height: 600,
        width: '100%',
        theme: theme,
        spellcheck: true,
        language: "pt_br",
        toolbarButtonSize: "small",
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        style: {
            background: theme === 'light' ? '#F9FAFB' : '#374151',
            color: theme === 'light' ? '#374151' : '#F9FAFB',
        },
        uploader: {
            url: '/api/files/image',
            queryBuild: function (data) {
                return JSON.stringify(data);
            },
            contentType: function () {
                return 'application/json';
            },
            buildData: function (data) {
                return new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.readAsDataURL(data.getAll('files[0]')[0]);
                    reader.onload = function () {
                        return resolve({
                            image: reader.result
                        });
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                });
            },
            isSuccess: function (resp) {
                return resp;
            },
            process: function (resp) {
                return {
                    files: resp.files,
                    path: resp.path,
                    baseurl: resp.baseurl,
                    error: resp.error,
                    message: resp.message
                }
            },
            defaultHandlerSuccess: function (data) {
                this.selection.insertImage(data.baseurl);
            },
        }
    }),
        [placeholder, theme]
    );
    return (
        <JoditEditor
            ref={editor}
            id="editor"
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => changeContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => changeContent(newContent)}
        />
    );
};
export default EditorComponent;