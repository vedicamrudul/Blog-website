// real time editor
// explained a lil more in the end
import React from 'react';
import {Editor } from '@tinymce/tinymce-react';

import { Controller } from 'react-hook-form';
// see its sort of like react hook form manages the state of components but tiny mce editor manages its own state. so we need to use controller to connect the two whereas in the case of normal input fields we dont need to do that because react hook form manages the state of the input fields directly using the register hook

export default function RTE({ name, control, label, defaultValue = "", ...props }) {
   console.log("RTE component called") //  name is the name of the field, control is the control object that we get from the useForm hook, label is the label of the field, defaultValue is the default value of the field
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"

                        }}
                        onEditorChange={onChange}
                        {...props}
                        apiKey='pbbr9b8moku4zmoi9b30djhlz2xq7aaaqthrmusxf7fp2wh6' 
                    />
                )}
            />

        </div>
    )
}

// The onChange function mentioned in the onEditorChange prop of the Editor component is actually provided by the Controller component from react-hook-form. The Controller component is used to wrap external controlled components like Editor from tinymce that do not natively integrate with react-hook-form. The Controller handles the integration by providing an onChange method (among others) through its render prop's argument. This method is specifically designed to be used as a callback for change events, allowing the external controlled component to communicate its changes back to react-hook-form.

// Here's a simplified explanation of how it works:

// The Controller component takes a name and control prop. The control object is provided by the useForm hook from react-hook-form and is used to manage the form's state and registration of its fields.
// The Controller's render prop is a function that returns the component you want to control (in this case, the Editor from tinymce). This function receives an object containing several properties and methods, including the onChange method.
// The onChange method provided by the Controller should be passed to the controlled component's event handler that listens for changes. For the Editor component, this is done through the onEditorChange prop.
// When the Editor's content changes, it triggers the onEditorChange event, which calls the onChange method provided by the Controller. This method updates the form's state in react-hook-form with the new content.
// In summary, the onChange function doesn't need to be explicitly defined in your component because it's provided by the Controller component from react-hook-form to facilitate the integration with the Editor component.