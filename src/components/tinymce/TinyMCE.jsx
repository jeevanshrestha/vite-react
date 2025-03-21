import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form'

const TinyMCE = ({name, control, label, defaultValue='', ...props}) => {
  return (
 
    <div className='w-full'>

      {label && <label className='inline-block mb-1 pl-1'  >{label}</label>}
     <Controller  
     control = {control} 
     name= {name || "content"}
     render = {({field:{onChange}})=>(
    <Editor
      apiKey='mbvfponq53o2bqjg4hqyjhg2ym4bm7hpg7bysvlg63zjvbxp'
      init={{
        branding:false,
        height:500,
        menubar:true,
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'code', 'emoticons', 'fullscreen', 'help', 'image', 'insertdatetime', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Mar 31, 2025:
          'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue={defaultValue}
      {...props}
      ref={ref}
      onEditorChange={onChange}
    />
     )}
        />
 

      </div>

  );
}


export default React.forwardRef(TinyMCE)