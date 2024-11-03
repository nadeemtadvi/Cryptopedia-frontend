import React, { useRef } from 'react'
import BundleEditor from './BundleEditor'


const EditorTiny = ({ value, onEditorChange }) => {
  const editorRef = useRef(null);

  return (
    <div>
        
        <BundleEditor
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={value}
        init={{
       
            menubar: false,
            plugins: [
              'advlist', 'anchor', 'autolink', 'link', 'lists',
              'searchreplace', 'table', 'wordcount', 'code' , 'directionality', 'media' , 'preview', 'image' , 'emoticons'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic underline backcolor forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'code directionality media table preview image emoticons',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  
          }}
  
          onEditorChange={(content) => onEditorChange(content)} // Correctly call onEditorChange here
    
        />
    </div>
  )
}

export default EditorTiny